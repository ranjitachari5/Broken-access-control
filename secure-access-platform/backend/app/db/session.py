"""
backend/app/db/session.py
─────────────────────────
Async SQLAlchemy engine + session factory for the Secure Access Control Platform.

Key design decisions:
  - Uses create_async_engine with the asyncpg driver (postgresql+asyncpg://)
  - AsyncSession is provided as a FastAPI dependency via get_session()
  - expire_on_commit=False prevents DetachedInstanceError in async context
  - Connection pool size is tuned for a typical single-server deployment;
    adjust POOL_SIZE / MAX_OVERFLOW via env vars in later phases if needed.
"""

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
from sqlalchemy.pool import NullPool
# pyrefly: ignore [missing-import]
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# ── Engine ─────────────────────────────────────────────────────────────────────
# echo=settings.DEBUG enables SQL query logging in debug mode only.
# NullPool is used to avoid connection pooling issues with asyncpg in dev;
# switch to AsyncAdaptedQueuePool and tune pool_size in production.
engine: AsyncEngine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
    # NullPool is safe for development; for production use:
    # pool_size=10, max_overflow=20, pool_pre_ping=True
    poolclass=NullPool,
)

# ── Session Factory ────────────────────────────────────────────────────────────
# expire_on_commit=False is critical for async: it allows accessing model
# attributes after commit without triggering a lazy-load (which would fail
# in async context).
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


# ── FastAPI Dependency ─────────────────────────────────────────────────────────
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Yield an AsyncSession per request and guarantee cleanup.

    Usage in a route:
        from app.db.session import get_session
        from sqlmodel.ext.asyncio.session import AsyncSession
        from fastapi import Depends

        @router.get("/example")
        async def example(session: AsyncSession = Depends(get_session)):
            ...
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
