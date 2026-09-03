# Broken-acccess-control
# 🛡️ Secure Access Platform

An AI-powered API security system designed to enforce zero-trust environments. The platform features strict role-based and attribute-based access control (RBAC/ABAC), real-time machine learning anomaly detection, and a decentralized blockchain layer for a tamper-proof audit trail[cite: 1].

---

## 🏗️ System Architecture & Modules

The project is structured as a microservices architecture divided into four distinct modules, each with its dedicated tech stack and ownership[cite: 1].

| Module | Core Responsibility | Tech Stack | Owner |
| :--- | :--- | :--- | :--- |
| **Backend (API Gateway)** | Handles authentication, enforces RBAC/ABAC rules, and bridges modules[cite: 1]. | FastAPI, PostgreSQL, WebSockets | Ranjit |
| **Frontend (Dashboard)** | Provides the visual UI, login portals, and real-time alerts[cite: 1]. | React.js, Tailwind, Socket.io-client | Chandan  |
| **AI Threat Detection** | Analyzes access logs and scores behavioral anomalies in near-live requests[cite: 1]. | Python, Scikit-learn, TensorFlow | AI Dev |
| **Blockchain (Audit Log)** | Secures critical system events in immutable smart contracts[cite: 1]. | Solidity, Ganache, Hardhat | Blockchain Dev |

*Note: Deployment and containerization (Docker, CI/CD) are handled as a shared team responsibility*[cite: 1].

---

## 🔌 Cross-Module Integrations

This architecture requires specific data bridges between the FastAPI backend and the other services:
*   **AI Data Polling:** The AI module will pull request logs via a dedicated `/api/v1/monitoring/logs` API endpoint exposed by the backend[cite: 1].
*   **Blockchain Bridging:** The backend uses `web3.py` (via background asynchronous tasks) to communicate with the local Ganache node and anchor audit events to the smart contract[cite: 1].
*   **Real-Time Alerts:** Because the React frontend utilizes `socket.io-client`, the backend mounts a `python-socketio` ASGI app to FastAPI to broadcast threat alerts seamlessly[cite: 1].

---

## 🚀 Quickstart (Backend Module)

The following setup is strictly for the **Backend API**. (Frontend, AI, and Blockchain engineers should refer to the docs inside their respective module folders).

### Prerequisites
*   **Python 3.10+**
*   **PostgreSQL** (Running locally or via Docker)
*   **Ganache / Hardhat node** (Running locally)

### 1. Installation
Clone the repository and jump into the backend directory:
```bash
git clone [https://github.com/ranjitachari5/Broken-acccess-control.git](https://github.com/ranjitachari5/Broken-acccess-control.git)
cd secure-access-platform/backend
