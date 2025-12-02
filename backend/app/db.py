import os
from datetime import datetime, timedelta
from typing import Generator

from sqlalchemy import Column, DateTime, Enum, ForeignKey, JSON, String, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker

from .models import OrderStatus

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class UserRecord(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    tokens = relationship("TokenRecord", back_populates="user", cascade="all, delete")
    orders = relationship("OrderRecord", back_populates="user")


class TokenRecord(Base):
    __tablename__ = "tokens"

    token = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)

    user = relationship("UserRecord", back_populates="tokens")


class OrderRecord(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True, index=True)
    customer_json = Column(JSON, nullable=False)
    items_json = Column(JSON, nullable=False)
    pickup_datetime = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum(OrderStatus), nullable=False)
    payment_reference = Column(String, nullable=True)

    user = relationship("UserRecord", back_populates="orders")


# Ensure tables exist in dev without migrations; production should use Alembic
Base.metadata.create_all(bind=engine)


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
