# -*- coding: utf-8 -*-
from __future__ import annotations
import uuid
from datetime import datetime, timezone
from typing import List, Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.role import Role
    from app.models.user_session import UserSession
    from app.models.audit_log import AuditLog


class User(SQLModel, table=True):
    __tablename__ = 'users'

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    email: str = Field(index=True, max_length=255)
    username: str = Field(index=True, max_length=100)
    hashed_password: str = Field()
    full_name: Optional[str] = Field(default=None, max_length=255)
    role_id: Optional[uuid.UUID] = Field(default=None, foreign_key='roles.id', index=True)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_login: Optional[datetime] = Field(default=None)

    role: Optional[Role] = Relationship(back_populates='users')
    sessions: List[UserSession] = Relationship(back_populates='user')
    audit_logs: List[AuditLog] = Relationship(back_populates='user')
