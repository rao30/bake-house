from datetime import datetime
from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field

class ProductType(str, Enum):
    custom_cake = "custom_cake"
    sheet_cake = "sheet_cake"
    muffin = "muffin"
    cookie = "cookie"
    brownie = "brownie"
    donut = "donut"


class CustomerInfo(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    notes: Optional[str] = None


class OrderItem(BaseModel):
    product_type: ProductType
    quantity: int = Field(gt=0)
    # options like flavors, messages on cakes, etc., later:
    options: Optional[Dict[str, Any]] = None


class OrderCreate(BaseModel):
    customer: CustomerInfo
    pickup_datetime: datetime
    items: List[OrderItem]


class OrderPreviewResult(BaseModel):
    is_valid: bool
    errors: List[str] = []
    # Optional recommendation for earliest valid time
    suggested_pickup_datetime: Optional[datetime] = None


class Order(BaseModel):
    id: str
    customer: CustomerInfo
    pickup_datetime: datetime
    items: List[OrderItem]
    created_at: datetime


class ProductConfigResponse(BaseModel):
    key: str
    display_name: str
    daily_capacity: int
    storage_capacity: int
    wait_time_hours: int
    per_order_max: Optional[int] = None
    extra: Dict[str, Any] = {}
