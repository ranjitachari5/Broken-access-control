# -*- coding: utf-8 -*-
from __future__ import annotations
import uuid
from datetime import datetime, timezone
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User


class AuditLog(SQLModel, table=True):
    __tablename__ = 'audit_logs'

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    user_id: Optional[uuid.UUID] = Field(default=None, foreign_key='users.id', index=True)
    action: str = Field(index=True, max_length=100)
    resource: Optional[str] = Field(default=None, max_length=255)
    http_method: Optional[str] = Field(default=None, max_length=10)
    status_code: Optional[int] = Field(default=None)
    ip_address: Optional[str] = Field(default=None, max_length=45)
    user_agent: Optional[str] = Field(default=None)
    request_payload: Optional[str] = Field(default=None)
    risk_level: str = Field(default='low', index=True, max_length=20)
    blockchain_tx: Optional[str] = Field(default=None, max_length=66)
    timestamp: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc), index=True)

    user: Optional[User] = Relationship(back_populates='audit_logs')
