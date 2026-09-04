"""
backend/app/schemas/token.py
------------------------------
JWT token schemas used by the auth endpoints (Phase 3).
Defined here in Phase 2 so models can reference them cleanly.
"""

import uuid
from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    """Response for POST /api/v1/auth/login."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int   # seconds until expiry


class TokenData(BaseModel):
    """Decoded payload stored inside a JWT (sub = user UUID)."""
    sub: Optional[uuid.UUID] = None   # user id
    role: Optional[str] = None        # role name for fast RBAC checks
    jti: Optional[str] = None         # unique token id (for revocation)

