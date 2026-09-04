# -*- coding: utf-8 -*-
from __future__ import annotations
import uuid
from datetime import datetime, timezone
from typing import List, Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User


class Role(SQLModel, table=True):
    __tablename__ = 'roles'

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True, nullable=False)
    name: str = Field(index=True, max_length=50)
    description: Optional[str] = Field(default=None, max_length=500)
    permissions: Optional[str] = Field(default=None)
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))

    users: List[User] = Relationship(back_populates='role')
