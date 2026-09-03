"""
backend/app/core/config.py
──────────────────────────
Pydantic-settings configuration loader for the Secure Access Control Platform.
All settings are read from environment variables or a .env file at the
project root. Never hard-code secrets — use .env locally, and real env vars
in production/CI.
"""



from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application-wide configuration, sourced from environment variables."""

    # ── Project Metadata ──────────────────────────────────────────────────────
    PROJECT_NAME: str = "Secure Access Control Platform"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = False

    # ── Database ──────────────────────────────────────────────────────────────
    # Must use the async driver scheme:  postgresql+asyncpg://user:pass@host/db
    DATABASE_URL: str = (
        "postgresql+asyncpg://sacp_user:sacp_password@localhost:5432/sacp_db"
    )

    # ── JWT Authentication ─────────────────────────────────────────────────────
    # SECRET_KEY should be a cryptographically secure random string (min 32 chars).
    # Generate with:  openssl rand -hex 32
    SECRET_KEY: str = "CHANGE_ME_BEFORE_PRODUCTION_use_openssl_rand_hex_32"
    ALGORITHM: str = "HS256"
    # Token lifetime in minutes (default = 60 min)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ── Blockchain / Web3 ─────────────────────────────────────────────────────
    # Local Ganache node (default HTTP endpoint)
    WEB3_PROVIDER_URI: str = "http://127.0.0.1:7545"
    # Address of the deployed AuditLogger smart contract (set after deployment)
    AUDIT_CONTRACT_ADDRESS: str = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"

    # ── CORS ──────────────────────────────────────────────────────────────────
    # Comma-separated list of allowed frontend origins
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",   # Create-React-App / production preview
        "http://localhost:5173",   # Vite dev server
    ]

    # ── Socket.IO ─────────────────────────────────────────────────────────────
    SOCKETIO_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]

    # Pydantic-settings configuration
    model_config = SettingsConfigDict(
        env_file=".env",           # load from .env in the working directory
        env_file_encoding="utf-8",
        case_sensitive=True,       # env vars are case-sensitive by default
        extra="ignore",            # silently ignore unknown env vars
    )


# Singleton — import this instance everywhere instead of instantiating Settings()
settings = Settings()
