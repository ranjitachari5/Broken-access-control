"""
backend/app/schemas/audit_log.py
----------------------------------
Pydantic schema for AuditLog API responses.
AuditLogs are immutable — there is no Create/Update schema exposed via API.
Logs are written internally by the audit middleware (Phase 8).
"""

import uuid
from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel


class AuditLogRead(BaseModel):
    """Response schema for GET /api/v1/audit-logs — admin only."""
    id: uuid.UUID
    user_id: Optional[uuid.UUID]
    action: str
    resource: Optional[str]
    http_method: Optional[str]
    status_code: Optional[int]
    ip_address: Optional[str]
    user_agent: Optional[str]
    request_payload: Optional[Dict[str, Any]]
    risk_level: str
    blockchain_tx: Optional[str]
    timestamp: datetime

    model_config = {"from_attributes": True}


class AuditLogFilter(BaseModel):
    """Query-parameter filter model for the audit log list endpoint."""
    user_id: Optional[uuid.UUID] = None
    action: Optional[str] = None
    risk_level: Optional[str] = None
    from_ts: Optional[datetime] = None
    to_ts: Optional[datetime] = None
    page: int = 1
    page_size: int = 50

