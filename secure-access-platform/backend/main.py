"""
backend/main.py
───────────────
Entry point for the Secure Access Control Platform FastAPI backend.

Phase 1 — Core Setup & Configuration:
  ✓ FastAPI app with versioned API prefix
  ✓ CORS middleware configured for the Vite (5173) and React (3000) frontends
  ✓ GET /         → API version info
  ✓ GET /health   → Uptime / health-check endpoint
  ✓ Lifespan context manager (startup / shutdown events)

Frontend API base URL expected by src/services/api.js:
    http://localhost:8000/api/v1
"""

from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

# ── Lifespan (startup / shutdown) ──────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Async lifespan context manager.
    Add DB table creation / migration triggers and any startup tasks here in
    later phases. Runs once on server start, then yields to handle requests,
    then runs cleanup on shutdown.
    """
    # ── Startup ──────────────────────────────────────────────────────────────
    print(f"[STARTUP]  {settings.PROJECT_NAME} backend starting up...")
    print(f"[DB]       Async engine initialised for: {settings.DATABASE_URL[:40]}...")
    print(f"[WEB3]     Provider : {settings.WEB3_PROVIDER_URI}")
    print(f"[JWT]      Algorithm: {settings.ALGORITHM}")
    yield
    # ── Shutdown ─────────────────────────────────────────────────────────────
    print(f"[SHUTDOWN] {settings.PROJECT_NAME} shutting down gracefully.")


# ── FastAPI Application ─────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "Broken Access Control Prevention & Monitoring Platform — "
        "REST API with RBAC/ABAC enforcement, real-time Socket.IO streaming, "
        "and blockchain-backed audit logging."
    ),
    version="1.0.0",
    docs_url=f"{settings.API_V1_PREFIX}/docs",       # Swagger UI
    redoc_url=f"{settings.API_V1_PREFIX}/redoc",     # ReDoc
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    lifespan=lifespan,
)


# ── CORS Middleware ─────────────────────────────────────────────────────────────
# Matches the frontend origins used in src/services/api.js
# (VITE_API_BASE_URL=http://localhost:8000/api/v1)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,   # ["http://localhost:3000", "http://localhost:5173"]
    allow_credentials=True,                    # required for cookie-based auth (future phase)
    allow_methods=["*"],                       # GET, POST, PUT, DELETE, PATCH, OPTIONS
    allow_headers=["*"],                       # Authorization, Content-Type, X-Request-ID …
)


# ── Phase 2+ Router Imports (uncomment as each phase completes) ─────────────────
# from app.api.v1.routers import auth, users, roles, monitoring, audit_logs
# app.include_router(auth.router,         prefix=settings.API_V1_PREFIX, tags=["Auth"])
# app.include_router(users.router,        prefix=settings.API_V1_PREFIX, tags=["Users"])
# app.include_router(roles.router,        prefix=settings.API_V1_PREFIX, tags=["Roles"])
# app.include_router(monitoring.router,   prefix=settings.API_V1_PREFIX, tags=["Monitoring"])
# app.include_router(audit_logs.router,   prefix=settings.API_V1_PREFIX, tags=["Audit Logs"])


# ── Core Unauthenticated Routes ─────────────────────────────────────────────────

@app.get("/", tags=["Root"], summary="API root — version information")
async def root() -> dict:
    """
    Public root endpoint.
    Returns API identity, current version, and links to documentation.
    The frontend (src/services/api.js) uses base URL http://localhost:8000/api/v1,
    so this root is reachable at http://localhost:8000/.
    """
    return {
        "project": settings.PROJECT_NAME,
        "version": "1.0.0",
        "phase": "Phase 1 — Core Setup & Configuration",
        "api_prefix": settings.API_V1_PREFIX,
        "docs": f"{settings.API_V1_PREFIX}/docs",
        "redoc": f"{settings.API_V1_PREFIX}/redoc",
        "status": "operational",
    }


@app.get("/health", tags=["Health"], summary="Uptime / health-check probe")
async def health_check() -> dict:
    """
    Unauthenticated health-check endpoint for load balancers, Docker health
    probes, and CI readiness checks.

    Returns:
        - status: "healthy" | "degraded"
        - timestamp: current UTC ISO-8601 timestamp
        - service: human-readable service name
        - version: API version string
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "database": "postgresql+asyncpg (pending connection in Phase 2)",
        "blockchain": settings.WEB3_PROVIDER_URI,
        "uptime_check": "PASS",
    }
