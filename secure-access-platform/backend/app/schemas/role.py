"""
backend/app/schemas/role.py
----------------------------
Pydantic schemas for Role — request input and API response shapes.
"""

import uuid
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class RoleCreate(BaseModel):
    """Body for POST /api/v1/roles — admin only."""
    name: str = Field(..., min_length=2, max_length=50, examples=["admin"])
    description: Optional[str] = Field(None, max_length=500)
    permissions: Optional[List[str]] = Field(
        default=None,
        examples=[["users:read", "users:write"]],
    )


class RoleUpdate(BaseModel):
    """Body for PATCH /api/v1/roles/{id} — partial update."""
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    description: Optional[str] = None
    permissions: Optional[List[str]] = None


class RoleRead(BaseModel):
    """Response shape — safe to return to any authenticated client."""
    id: uuid.UUID
    name: str
    description: Optional[str]
    permissions: Optional[List[str]]
    created_at: datetime

    model_config = {"from_attributes": True}

