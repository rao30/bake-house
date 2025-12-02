import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import Session, sessionmaker

# Ensure the backend package is importable and GOOGLE_CLIENT_ID is set before importing the app module
ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT))
os.environ.setdefault("GOOGLE_CLIENT_ID", "test-client")

from app import main  # noqa: E402
from app.db import Base, get_db  # noqa: E402
from app.models import OrderStatus, ProductType


@pytest.fixture(scope="function")
def db_session(monkeypatch):
    """Create a fresh in-memory SQLite database per test."""

    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db: Session = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    main.app.dependency_overrides[get_db] = override_get_db
    monkeypatch.setenv("GOOGLE_CLIENT_ID", "test-client")
    main.GOOGLE_CLIENT_ID = "test-client"

    yield TestingSessionLocal

    TestingSessionLocal().close()
    Base.metadata.drop_all(bind=engine)
    main.app.dependency_overrides.clear()


def get_client():
    return TestClient(main.app)


def build_order_payload(hours_from_now: int = 3, quantity: int = 2):
    return {
        "customer": {
            "name": "Test User",
            "email": "user@example.com",
            "phone": "1234567890",
            "notes": "no nuts",
        },
        "pickup_datetime": (datetime.utcnow() + timedelta(hours=hours_from_now)).isoformat(),
        "items": [
            {
                "product_type": ProductType.muffin.value,
                "quantity": quantity,
            }
        ],
    }


def test_health_and_config(db_session):
    client = get_client()

    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "ok"

    config = client.get("/config/products")
    assert config.status_code == 200
    body = config.json()
    assert isinstance(body, list)
    muffin = next((item for item in body if item["key"] == ProductType.muffin.value), None)
    assert muffin is not None
    assert muffin["display_name"]
    assert muffin["wait_time_hours"] >= 2


def test_preview_respects_per_order_limit(db_session):
    client = get_client()
    payload = build_order_payload(quantity=100)

    preview = client.post("/orders/preview", json=payload)
    assert preview.status_code == 200
    data = preview.json()
    assert data["is_valid"] is False
    assert any("max" in msg.lower() for msg in data["errors"])


def test_checkout_and_payment_flow(monkeypatch, db_session):
    client = get_client()

    def fake_verify(token, request, client_id):
        assert client_id == "test-client"
        return {"sub": "user-123", "email": "user@example.com", "name": "User"}

    monkeypatch.setattr(main.id_token, "verify_oauth2_token", fake_verify)

    auth_resp = client.post("/auth/google", json={"id_token": "fake-token"})
    assert auth_resp.status_code == 200
    token = auth_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    checkout_resp = client.post("/checkout", json=build_order_payload(), headers=headers)
    assert checkout_resp.status_code == 200
    checkout_data = checkout_resp.json()
    order = checkout_data["order"]
    assert order["status"] == OrderStatus.pending_payment.value
    assert order["user_id"] == "user-123"
    assert checkout_data["payment"]["status"] == "pending"

    order_id = order["id"]
    confirm_resp = client.post(f"/payments/{order_id}/confirm", headers=headers)
    assert confirm_resp.status_code == 200
    confirmed_order = confirm_resp.json()
    assert confirmed_order["status"] == OrderStatus.paid.value
    assert confirmed_order["payment_reference"] is not None

    history = client.get("/orders/me", headers=headers)
    assert history.status_code == 200
    orders = history.json()
    assert len(orders) == 1
    assert orders[0]["id"] == order_id
    assert orders[0]["status"] == OrderStatus.paid.value

    # Validate persistence through the DB session
    with db_session() as db:
        from app.db import OrderRecord

        stored_orders = db.query(OrderRecord).all()
        assert len(stored_orders) == 1
        assert stored_orders[0].id == order_id


def test_orders_me_requires_auth(db_session):
    client = get_client()
    response = client.get("/orders/me")
    assert response.status_code == 401
