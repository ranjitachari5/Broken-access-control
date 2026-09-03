# 🛡️ Secure Access Control Platform — Frontend

> **React 18 · Vite · Axios · Socket.IO Client**
>
> Broken Access Control Prevention & Real-Time Monitoring Dashboard

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Frontend ↔ Backend Connection](#frontend--backend-connection)
- [Pages & Features](#pages--features)
- [Mock Engine](#mock-engine)

---

## Overview

The frontend is the operator-facing dashboard for the Secure Access Control Platform. It provides:

- **Real-time API monitoring** with live log streams
- **Threat alert management** with BOLA/BFLA detection cards
- **User & Role administration** with RBAC enforcement
- **Blockchain audit trail** with integrity verification
- **StellarCorp simulated attack surface** for demonstration

---

## Tech Stack

| Package | Purpose |
|---|---|
| React 18 + Vite | UI framework & fast dev server |
| Axios | REST API client (`src/services/api.js`) |
| React Router v6 | Client-side routing |
| Recharts | Analytics charts |
| Lucide React | Icon set |
| Socket.IO Client | Real-time WebSocket streaming |

---

## Directory Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── audit/          # AuditTable
│   │   ├── common/         # Navbar, Sidebar, Modal, Badge, StatCard, ProtectedRoute
│   │   ├── monitoring/     # ActiveSessionsList, LiveApiTable
│   │   ├── stellarcorp/    # StellarDashboardPreview, StellarNavbar
│   │   ├── threats/        # ThreatCard, ThreatDetailModal
│   │   └── users/          # UserTable, UserFormModal, RoleAssignModal
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── LiveMonitoringContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useLiveLogs.js
│   │   ├── useThreatAlerts.js
│   │   └── useUsers.js
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   ├── UserDashboardPage.jsx
│   │   ├── UserManagementPage.jsx
│   │   ├── MonitoringPage.jsx
│   │   ├── ThreatAlertsPage.jsx
│   │   ├── AuditLogsPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   └── StellarCorpPage.jsx
│   ├── services/
│   │   ├── api.js              # Axios instance — connects to backend
│   │   ├── authService.js      # Login / Register / Forgot Password
│   │   ├── userService.js      # CRUD for users & roles
│   │   ├── auditService.js     # Audit log fetch & blockchain verify
│   │   ├── monitoringService.js # Live logs, stats, session mgmt
│   │   ├── threatService.js    # Alert management
│   │   └── mockEngine.js       # localStorage fallback when backend is offline
│   └── utils/
│       ├── exportUtils.js
│       └── formatters.js
└── vite.config.js
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Start Vite dev server (http://localhost:5173)
npm run dev
```

---

## Environment Variables

Create a `.env` file in the `frontend/` directory:

```bash
# Backend API base URL — defaults to http://localhost:8000/api/v1
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

If `VITE_API_BASE_URL` is not set, the frontend defaults to `http://localhost:8000/api/v1` and automatically falls back to the mock engine if the backend is unreachable.

---

## Frontend ↔ Backend Connection

All API calls go through `src/services/api.js`:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
```

**JWT token** is attached automatically via Axios request interceptor:
```
Authorization: Bearer <token stored in localStorage as "sacp_jwt_token">
```

Each service module tries the real backend first, then gracefully falls back to the mock engine:

| Service | Backend Endpoints Used |
|---|---|
| `authService` | `POST /auth/login`, `POST /auth/register`, `POST /auth/forgot-password` |
| `userService` | `GET/POST /users`, `PUT/DELETE /users/{id}`, `GET /roles`, `POST /roles/assign` |
| `auditService` | `GET /audit-logs` |
| `monitoringService` | `GET /monitoring/logs`, `GET /monitoring/stats`, `POST /monitoring/sessions/{id}/revoke` |
| `threatService` | `GET /monitoring/alerts`, `PUT /monitoring/alerts/{id}` |

---

## Pages & Features

| Page | Route | Access |
|---|---|---|
| Login | `/login` | Public |
| Register | `/register` | Public |
| Forgot Password | `/forgot-password` | Public |
| Admin Dashboard | `/admin/dashboard` | Admin only |
| User Dashboard | `/dashboard` | All authenticated |
| User Management | `/admin/users` | Admin / Manager |
| Live Monitoring | `/admin/monitoring` | Admin / Manager |
| Threat Alerts | `/admin/threats` | Admin / Manager |
| Audit Logs | `/admin/audit` | Admin |
| Analytics | `/admin/analytics` | Admin |
| StellarCorp (target) | `/stellarcorp/*` | Public (simulated attack surface) |

---

## Mock Engine

`src/services/mockEngine.js` provides a complete in-memory simulation using `localStorage`:

- Seed data for 6 users, 3 roles, 5 threat alerts, 7 API logs, 4 audit entries
- Auto-initialises on first load
- Each service method tries the real backend first; falls back silently on network error
- Enables full development/demo without a running backend

---

*Secure Access Control Platform — Built for OWASP Broken Access Control prevention research.*
