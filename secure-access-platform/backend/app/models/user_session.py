# -*- coding: utf-8 -*-
from __future__ import annotations
import uuid
from datetime import datetime, timezone
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User


class UserSession(SQLModel, table=True):
    __tablename__ = 'user_sessions'

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    user_id: uuid.UUID = Field(foreign_key='users.id', index=True)
    token_hash: str = Field(index=True, max_length=64)
    ip_address: Optional[str] = Field(default=None, max_length=45)
    user_agent: Optional[str] = Field(default=None)
    is_revoked: bool = Field(default=False, index=True)
    expires_at: datetime = Field()
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    user: Optional[User] = Relationship(back_populates='sessions')
