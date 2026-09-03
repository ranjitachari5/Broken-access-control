# 🛡️ Secure Access Control Platform — Backend

> **FastAPI · PostgreSQL (asyncpg) · SQLModel · Web3 · Socket.IO**
>
> Phase 1: Core Setup & Configuration ✅

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Phase 1 Files](#phase-1-files)
- [Quick Start (venv)](#quick-start-venv)
- [Environment Variables](#environment-variables)
- [API Endpoints (Phase 1)](#api-endpoints-phase-1)
- [Frontend ↔ Backend Connection](#frontend--backend-connection)
- [Roadmap](#roadmap)

---

## Project Overview

The backend is the enforcement layer of the **Broken Access Control Prevention Platform**. It provides:

| Capability | Technology |
|---|---|
| REST API with role-based access control | FastAPI + JWT |
| Async relational database | PostgreSQL + asyncpg + SQLModel |
| Blockchain-backed immutable audit log | Web3 + Ganache (local Ethereum testnet) |
| Real-time API monitoring stream | python-socketio |
| Schema migrations | Alembic |

---

## Tech Stack

| Layer | Package | Version |
|---|---|---|
| Web Framework | `fastapi` | 0.111.1 |
| ASGI Server | `uvicorn[standard]` | 0.30.1 |
| ORM | `sqlmodel` | 0.0.19 |
| Async DB Driver | `asyncpg` | 0.29.0 |
| Migrations | `alembic` | 1.13.2 |
| JWT Auth | `python-jose[cryptography]` | 3.3.0 |
| Password Hashing | `passlib[bcrypt]` | 1.7.4 |
| Settings | `pydantic-settings` | 2.3.4 |
| Blockchain | `web3` | 6.20.1 |
| Real-time | `python-socketio` | 5.11.3 |

---

## Directory Structure

```
backend/
├── .env.example            # Environment variable template — copy to .env
├── requirements.txt        # All Python dependencies (pinned)
├── main.py                 # FastAPI app entry point (Phase 1)
│
└── app/
    ├── __init__.py
    ├── core/
    │   ├── __init__.py
    │   └── config.py       # Pydantic-settings configuration loader
    └── db/
        ├── __init__.py
        └── session.py      # Async engine + get_session() dependency
```

> **Upcoming phases** will add:
> `app/models/`, `app/api/v1/routers/`, `app/services/`, `app/middleware/`

---

## Phase 1 Files

### `requirements.txt`
Pinned dependencies for the entire project. Use pip inside a virtual environment to install.

### `app/core/config.py`
Loads all configuration from environment variables using `pydantic-settings.BaseSettings`.

Key settings:
- `DATABASE_URL` — must use `postgresql+asyncpg://` scheme
- `SECRET_KEY` / `ALGORITHM` — JWT signing config
- `WEB3_PROVIDER_URI` — Ganache RPC endpoint
- `ALLOWED_ORIGINS` — CORS origins for the Vite / CRA frontend

### `app/db/session.py`
Async database engine and session factory.

- `engine` — `AsyncEngine` created with `create_async_engine`
- `AsyncSessionLocal` — `sessionmaker` bound to `AsyncSession`
- `get_session()` — FastAPI dependency that yields a session, auto-commits on success, and rolls back on exception

### `main.py`
FastAPI application bootstrap.

- `lifespan` context manager — startup/shutdown hooks
- `CORSMiddleware` — allows `http://localhost:3000` and `http://localhost:5173`
- `GET /` — returns API version info
- `GET /health` — uptime health-check probe

---

## Quick Start (venv)

> **Prerequisites:** Python 3.11+, PostgreSQL 15+, Ganache (optional for Phase 1)

### ⚡ One-command setup (recommended)

**Windows (PowerShell):**
```powershell
cd secure-access-platform/backend
.\setup.ps1
```

**macOS / Linux:**
```bash
cd secure-access-platform/backend
chmod +x setup.sh && ./setup.sh
```

The script will: create the venv → install all dependencies → copy `.env.example` → `.env`.

---

### Manual setup (step by step)

```bash
# 1. Navigate to the backend directory
cd secure-access-platform/backend

# 2. Create a virtual environment
python -m venv venv          # Windows
python3 -m venv venv         # macOS / Linux

# 3. Activate it  ← IMPORTANT: must do this every terminal session
.\venv\Scripts\Activate.ps1  # Windows PowerShell
source venv/bin/activate     # macOS / Linux

# 4. Install ALL dependencies into the venv
pip install -r requirements.txt

# 5. Set up environment variables
copy .env.example .env       # Windows
cp .env.example .env         # macOS/Linux
# Edit .env and fill in DATABASE_URL, SECRET_KEY, etc.

# 6. Run the development server
uvicorn main:app --reload
```

> ⚠️ **Common mistake:** If you see `ModuleNotFoundError: No module named 'pydantic_settings'`
> (or any other missing module), your venv is not active. Run step 3 again before step 6.

> **VS Code users:** Press `Ctrl+Shift+P` → "Python: Select Interpreter" → choose the
> `venv/Scripts/python.exe` path to fix IDE false-positive errors.

The server will be available at:

| URL | Description |
|---|---|
| `http://localhost:8000/` | API root — version info |
| `http://localhost:8000/health` | Health-check probe |
| `http://localhost:8000/api/v1/docs` | Swagger UI (interactive API docs) |
| `http://localhost:8000/api/v1/redoc` | ReDoc documentation |

---

## Environment Variables

Copy `.env.example` → `.env` and update the values:

| Variable | Default | Description |
|---|---|---|
| `PROJECT_NAME` | `Secure Access Control Platform` | App display name |
| `DEBUG` | `False` | Enable SQL query logging |
| `DATABASE_URL` | `postgresql+asyncpg://...` | **Must** use `asyncpg` scheme |
| `SECRET_KEY` | *(must be changed)* | JWT signing secret (min 32 chars) |
| `ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `60` | JWT lifetime in minutes |
| `WEB3_PROVIDER_URI` | `http://127.0.0.1:7545` | Ganache RPC URL |
| `AUDIT_CONTRACT_ADDRESS` | `0x71C7...` | Deployed AuditLogger contract |
| `ALLOWED_ORIGINS` | `["http://localhost:3000","http://localhost:5173"]` | CORS origins |

> **Security:** Generate a strong `SECRET_KEY` with:
> ```bash
> openssl rand -hex 32
> ```

---

## API Endpoints (Phase 1)

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/` | ❌ Public | API version & project info |
| `GET` | `/health` | ❌ Public | Uptime health-check probe |

**Upcoming endpoints (Phase 2+):**

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | ❌ Public | JWT login |
| `POST` | `/api/v1/auth/register` | ❌ Public | User registration |
| `POST` | `/api/v1/auth/forgot-password` | ❌ Public | Password reset |
| `GET` | `/api/v1/users` | ✅ Admin/Manager | List users |
| `POST` | `/api/v1/users` | ✅ Admin | Create user |
| `PUT` | `/api/v1/users/{id}` | ✅ Admin | Update user |
| `DELETE` | `/api/v1/users/{id}` | ✅ Admin | Delete user |
| `GET` | `/api/v1/roles` | ✅ Admin | List roles |
| `POST` | `/api/v1/roles/assign` | ✅ Admin | Assign role to user |
| `GET` | `/api/v1/monitoring/logs` | ✅ Admin/Manager | Live API logs |
| `GET` | `/api/v1/monitoring/stats` | ✅ Admin/Manager | System stats |
| `GET` | `/api/v1/monitoring/alerts` | ✅ Admin/Manager | Threat alerts |
| `POST` | `/api/v1/monitoring/sessions/{id}/revoke` | ✅ Admin | Revoke session |
| `GET` | `/api/v1/audit-logs` | ✅ Admin | Blockchain audit trail |

---

## Frontend ↔ Backend Connection

The React/Vite frontend (`src/services/api.js`) connects to:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
```

To use the live backend instead of the mock engine, set in `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

The frontend will **automatically try the real backend first** and fall back to the localStorage mock engine if the backend is offline. This means Phase 1 is non-breaking — the frontend works with or without the backend running.

### Auth Token Flow

```
Frontend Login → POST /api/v1/auth/login
                ← { token: "eyJ...", user: { id, email, role, ... } }
                → localStorage.setItem("sacp_jwt_token", token)
                → All subsequent requests: Authorization: Bearer <token>
```

---

## Roadmap

| Phase | Description | Status |
|---|---|---|
| **Phase 1** | Core Setup & Configuration | ✅ **Complete** |
| Phase 2 | Database Models & Alembic Migrations | 🔜 Next |
| Phase 3 | Auth API — JWT Login / Register / Refresh | 🔜 |
| Phase 4 | Users & Roles REST API | 🔜 |
| Phase 5 | Monitoring & Threat Alerts API | 🔜 |
| Phase 6 | Blockchain Audit Logger (Web3 + Ganache) | 🔜 |
| Phase 7 | Real-time Socket.IO Streaming | 🔜 |
| Phase 8 | ABAC Policy Engine Middleware | 🔜 |

---

*Secure Access Control Platform — Built for OWASP Broken Access Control prevention research.*
