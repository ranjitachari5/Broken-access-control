"""
backend/app/schemas/user.py
----------------------------
Pydantic schemas for User.

IMPORTANT: hashed_password is NEVER included in any response schema.
Only UserCreate accepts a plain `password` field; the service layer
hashes it before passing it to the ORM.
"""

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, field_validator


class UserCreate(BaseModel):
    """Body for POST /api/v1/auth/register and POST /api/v1/users."""
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=100)
    password: str = Field(..., min_length=8, max_length=128)
    full_name: Optional[str] = Field(None, max_length=255)
    role_id: Optional[uuid.UUID] = None

    @field_validator("username")
    @classmethod
    def username_alphanumeric(cls, v: str) -> str:
        if not v.replace("_", "").replace("-", "").isalnum():
            raise ValueError("Username may only contain letters, numbers, _ and -")
        return v.lower()


class UserUpdate(BaseModel):
    """Body for PATCH /api/v1/users/{id} — all fields optional."""
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=100)
    full_name: Optional[str] = Field(None, max_length=255)
    role_id: Optional[uuid.UUID] = None
    is_active: Optional[bool] = None


class UserRead(BaseModel):
    """Safe public representation — never includes hashed_password."""
    id: uuid.UUID
    email: str
    username: str
    full_name: Optional[str]
    role_id: Optional[uuid.UUID]
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: datetime
    last_login: Optional[datetime]

    model_config = {"from_attributes": True}


class UserReadWithRole(UserRead):
    """Extended response that includes the nested role object."""
    from app.schemas.role import RoleRead
    role: Optional[RoleRead] = None

