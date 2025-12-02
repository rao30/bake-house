import os
import uuid
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from sqlalchemy.orm import Session

from .models import (
    OrderCreate,
    OrderPreviewResult,
    Order,
    ProductConfigResponse,
    User,
    AuthTokenResponse,
    CheckoutResponse,
    PaymentSession,
    OrderStatus,
    CustomerInfo,
    OrderItem,
)
from .config import get_product_config
from .db import get_db, UserRecord, TokenRecord, OrderRecord


app = FastAPI(title="Bakery Ordering API")

# Allow your React dev server (e.g. localhost:5173 or 3000)
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    # add production frontend domain(s) here later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
auth_scheme = HTTPBearer(auto_error=False)

@app.get("/health")
def health_check():
    return {"status": "ok"}


def get_user_from_token(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(auth_scheme),
    db: Session = Depends(get_db),
) -> Optional[User]:
    if not credentials:
        return None
    token = credentials.credentials
    token_row: Optional[TokenRecord] = db.query(TokenRecord).filter(TokenRecord.token == token).first()
    if not token_row:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_row: Optional[UserRecord] = db.query(UserRecord).filter(UserRecord.id == token_row.user_id).first()
    if not user_row:
        raise HTTPException(status_code=401, detail="User not found")
    return User(
        id=user_row.id,
        email=user_row.email,
        name=user_row.name,
        avatar=user_row.avatar,
    )


@app.get("/config/products", response_model=List[ProductConfigResponse])
def get_products_config():
    config = get_product_config()
    result: List[ProductConfigResponse] = []
    for key, values in config.items():
        extra = {k: v for k, v in values.items()
                 if k not in ("display_name", "daily_capacity", "storage_capacity", "wait_time_hours", "per_order_max")}
        result.append(
            ProductConfigResponse(
                key=key,
                display_name=values["display_name"],
                daily_capacity=values["daily_capacity"],
                storage_capacity=values["storage_capacity"],
                wait_time_hours=values["wait_time_hours"],
                per_order_max=values.get("per_order_max"),
                extra=extra,
            )
        )
    return result


@app.post("/auth/google", response_model=AuthTokenResponse)
def google_auth(id_token_payload: Dict[str, str], db: Session = Depends(get_db)):
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="GOOGLE_CLIENT_ID not configured")

    token_str = id_token_payload.get("id_token")
    if not token_str:
        raise HTTPException(status_code=400, detail="id_token is required")

    try:
        idinfo = id_token.verify_oauth2_token(
            token_str, google_requests.Request(), GOOGLE_CLIENT_ID
        )
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    user_id = idinfo.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid Google token payload")

    user_row: Optional[UserRecord] = db.query(UserRecord).filter(UserRecord.id == user_id).first()
    if not user_row:
        user_row = UserRecord(
            id=user_id,
            email=idinfo.get("email"),
            name=idinfo.get("name"),
            avatar=idinfo.get("picture"),
        )
        db.add(user_row)
        db.commit()

    token_value = str(uuid.uuid4())
    token_row = TokenRecord(token=token_value, user_id=user_row.id)
    db.add(token_row)
    db.commit()

    return AuthTokenResponse(
        access_token=token_value,
        user=User(
            id=user_row.id,
            email=user_row.email,
            name=user_row.name,
            avatar=user_row.avatar,
        ),
    )


@app.get("/auth/me", response_model=User)
def get_me(current_user: User = Depends(get_user_from_token)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return current_user


def orm_to_order(record: OrderRecord) -> Order:
    return Order(
        id=record.id,
        customer=CustomerInfo.model_validate(record.customer_json),
        pickup_datetime=record.pickup_datetime,
        items=[OrderItem.model_validate(item) for item in record.items_json],
        created_at=record.created_at,
        status=record.status,
        user_id=record.user_id,
        payment_reference=record.payment_reference,
    )


@app.post("/orders/preview", response_model=OrderPreviewResult)
def preview_order(order: OrderCreate):
    """
    Very first pass validation:
    - per-order max constraints
    - min wait time per product
    - (Later) daily capacity and scheduling / storage logic
    """
    config = get_product_config()
    errors: List[str] = []

    now = datetime.utcnow()

    # Check wait time per item type
    for item in order.items:
        product_conf = config[item.product_type.value]
        wait_hours = product_conf["wait_time_hours"]
        min_pickup = now + timedelta(hours=wait_hours)
        if order.pickup_datetime < min_pickup:
            errors.append(
                f"{product_conf['display_name']}: earliest pickup is after {wait_hours} hours "
                f"(min {min_pickup.isoformat()} UTC)."
            )

        # Per-order max
        per_order_max = product_conf.get("per_order_max")
        if per_order_max is not None and item.quantity > per_order_max:
            errors.append(
                f"{product_conf['display_name']}: max {per_order_max} per order, requested {item.quantity}."
            )

    # TODO:
    # - Check aggregated daily capacity (by date)
    # - Check storage capacity
    # - Real scheduling logic around baking/icing days

    if errors:
        return OrderPreviewResult(is_valid=False, errors=errors)

    return OrderPreviewResult(is_valid=True, errors=[])


@app.post("/orders", response_model=Order)
def create_order(
    order: OrderCreate,
    current_user: Optional[User] = Depends(get_user_from_token),
    db: Session = Depends(get_db),
):
    # For now, re-use preview validation
    preview = preview_order(order)
    if not preview.is_valid:
        raise HTTPException(status_code=400, detail=preview.errors)

    order_id = str(uuid.uuid4())
    new_order = OrderRecord(
        id=order_id,
        customer_json=order.customer.model_dump(),
        pickup_datetime=order.pickup_datetime,
        items_json=[item.model_dump() for item in order.items],
        created_at=datetime.utcnow(),
        status=OrderStatus.confirmed,
        user_id=current_user.id if current_user else None,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return orm_to_order(new_order)


@app.post("/checkout", response_model=CheckoutResponse)
def checkout(
    order: OrderCreate,
    current_user: Optional[User] = Depends(get_user_from_token),
    db: Session = Depends(get_db),
):
    preview = preview_order(order)
    if not preview.is_valid:
        raise HTTPException(status_code=400, detail=preview.errors)

    order_id = str(uuid.uuid4())
    new_order = OrderRecord(
        id=order_id,
        customer_json=order.customer.model_dump(),
        pickup_datetime=order.pickup_datetime,
        items_json=[item.model_dump() for item in order.items],
        created_at=datetime.utcnow(),
        status=OrderStatus.pending_payment,
        user_id=current_user.id if current_user else None,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    payment = PaymentSession(session_id=str(uuid.uuid4()))
    return CheckoutResponse(order=orm_to_order(new_order), payment=payment)


@app.get("/orders/me", response_model=List[Order])
def get_my_orders(current_user: User = Depends(get_user_from_token), db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    orders = db.query(OrderRecord).filter(OrderRecord.user_id == current_user.id).order_by(OrderRecord.created_at.desc()).all()
    return [orm_to_order(order) for order in orders]


@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(OrderRecord).filter(OrderRecord.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return orm_to_order(order)


@app.post("/payments/{order_id}/confirm", response_model=Order)
def confirm_payment(
    order_id: str,
    current_user: Optional[User] = Depends(get_user_from_token),
    db: Session = Depends(get_db),
):
    order: Optional[OrderRecord] = db.query(OrderRecord).filter(OrderRecord.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if current_user and order.user_id and order.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Order does not belong to user")

    order.status = OrderStatus.paid
    order.payment_reference = order.payment_reference or str(uuid.uuid4())
    db.add(order)
    db.commit()
    db.refresh(order)
    return orm_to_order(order)
