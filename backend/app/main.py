from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import uuid
from typing import List, Dict, Any

from .models import (
    OrderCreate,
    OrderPreviewResult,
    Order,
    ProductConfigResponse,
)
from .config import get_product_config

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

# TEMP: in-memory storage instead of DB
ORDERS: Dict[str, Order] = {}

@app.get("/health")
def health_check():
    return {"status": "ok"}


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
def create_order(order: OrderCreate):
    # For now, re-use preview validation
    preview = preview_order(order)
    if not preview.is_valid:
        raise HTTPException(status_code=400, detail=preview.errors)

    order_id = str(uuid.uuid4())
    new_order = Order(
        id=order_id,
        customer=order.customer,
        pickup_datetime=order.pickup_datetime,
        items=order.items,
        created_at=datetime.utcnow(),
    )

    # TODO: save to real DB and update capacity tables
    ORDERS[order_id] = new_order

    return new_order


@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: str):
    order = ORDERS.get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
