from datetime import timedelta
from typing import Dict, Any

# All numbers here are easily configurable later or moved to DB/admin panel
PRODUCT_CONFIG: Dict[str, Dict[str, Any]] = {
    "custom_cake": {
        "display_name": "Custom Iced Cake",
        "daily_capacity": 10,          # icing capacity
        "storage_capacity": 100,
        "wait_time_hours": 48,
        "per_order_max": None,
    },
    "sheet_cake": {
        "display_name": "Sheet Cake",
        "daily_capacity": 20,
        "storage_capacity": 100,
        "wait_time_hours": 24,
        "per_order_max": None,
    },
    "muffin": {
        "display_name": "Muffin",
        "daily_capacity": 100,         # base capacity; bulk logic later
        "bulk_daily_capacity": 600,    # potentially used later
        "storage_capacity": 0,
        "wait_time_hours": 2,
        "per_order_max": 60,
    },
    "cookie": {
        "display_name": "Cookie",
        "daily_capacity": 1000,
        "storage_capacity": 0,
        "wait_time_hours": 2,
        "per_order_max": 60,
    },
    "brownie": {
        "display_name": "Brownie",
        "daily_capacity": 1000,
        "storage_capacity": 0,
        "wait_time_hours": 2,
        "per_order_max": 60,
    },
    "donut": {
        "display_name": "Doughnut",
        "daily_capacity": 240,
        "storage_capacity": 0,
        "wait_time_hours": 48,
        "per_order_max": 60,
    },
}


def get_product_config():
    # In future: fetch from DB instead of static dict
    return PRODUCT_CONFIG
