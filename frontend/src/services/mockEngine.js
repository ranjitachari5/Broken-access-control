// Mock Engine for Broken Access Control Prevention Platform
// Supports persistent localStorage simulation, real-time live event streaming, and fallback execution when backend API is offline

const STORAGE_KEYS = {
  USERS: 'sacp_users',
  LOGS: 'sacp_api_logs',
  ALERTS: 'sacp_threat_alerts',
  AUDIT: 'sacp_audit_logs',
  ROLES: 'sacp_roles',
  CURRENT_USER: 'sacp_current_user',
  TOKEN: 'sacp_jwt_token',
};

// Initial Seed Data
const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Chandan K N',
    email: 'chandan@secure.io',
    role: 'Admin',
    department: 'Cybersecurity Frontend',
    location: 'Bangalore, IN',
    status: 'Active',
    lastLogin: '2026-09-03T18:45:10Z',
    riskScore: 5,
    failedLogins: 0,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  },
  {
    id: 'usr-2',
    name: 'Dr. Ranjita Chari',
    email: 'ranjita@secure.io',
    role: 'Admin',
    department: 'Policy & Governance',
    location: 'Bangalore, IN',
    status: 'Active',
    lastLogin: '2026-09-03T19:12:00Z',
    riskScore: 2,
    failedLogins: 0,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  },
  {
    id: 'usr-3',
    name: 'Ranjith V',
    email: 'ranjith@secure.io',
    role: 'Manager',
    department: 'API Backend Services',
    location: 'Bangalore, IN',
    status: 'Active',
    lastLogin: '2026-09-03T17:30:22Z',
    riskScore: 12,
    failedLogins: 1,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  },
  {
    id: 'usr-4',
    name: 'Kudan S',
    email: 'kudan@secure.io',
    role: 'Manager',
    department: 'AI Threat Detection',
    location: 'Delhi, IN',
    status: 'Active',
    lastLogin: '2026-09-03T16:15:40Z',
    riskScore: 18,
    failedLogins: 0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
  },
  {
    id: 'usr-5',
    name: 'Nandan M',
    email: 'nandan@secure.io',
    role: 'User',
    department: 'Blockchain Audit',
    location: 'Mumbai, IN',
    status: 'Active',
    lastLogin: '2026-09-03T14:05:12Z',
    riskScore: 8,
    failedLogins: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
  },
  {
    id: 'usr-6',
    name: 'Suspicious Bot Account',
    email: 'attacker_x@darknet.org',
    role: 'User',
    department: 'External Vendor',
    location: 'Frankfurt, DE',
    status: 'Flagged',
    lastLogin: '2026-09-03T19:28:01Z',
    riskScore: 89,
    failedLogins: 8,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
  },
];

const INITIAL_ROLES = [
  {
    id: 'role-1',
    name: 'Admin',
    description: 'Full administrative access to all API gateways, policies, users, and audit logs.',
    usersCount: 2,
    permissions: ['all_access', 'manage_users', 'manage_roles', 'view_monitoring', 'export_audit', 'configure_ai'],
  },
  {
    id: 'role-2',
    name: 'Manager',
    description: 'Access to department monitoring, security alerts, and user management oversight.',
    usersCount: 2,
    permissions: ['manage_users', 'view_monitoring', 'view_threats', 'export_audit'],
  },
  {
    id: 'role-3',
    name: 'User',
    description: 'Standard end-user access restricted by Object-Level ABAC policies.',
    usersCount: 2,
    permissions: ['view_own_profile', 'access_permitted_apis'],
  },
];

const INITIAL_ALERTS = [
  {
    id: 'alt-101',
    title: 'Broken Object Level Authorization (BOLA) Intercepted',
    category: 'Object Access Violation',
    riskLevel: 'High',
    severity: 'CRITICAL',
    userEmail: 'attacker_x@darknet.org',
    ipAddress: '185.220.101.5',
    endpoint: '/api/v1/users/usr-1/payroll',
    details: 'User attempt to access resource /users/usr-1/payroll without valid object ownership. Policy Engine blocked response.',
    timestamp: '2026-09-03T19:28:01Z',
    status: 'Active',
    actionTaken: 'Request Intercepted & Blocked (403 Forbidden)',
  },
  {
    id: 'alt-102',
    title: 'Privilege Escalation Attempt via API Payload',
    category: 'Function Level Access Control',
    riskLevel: 'High',
    severity: 'HIGH',
    userEmail: 'attacker_x@darknet.org',
    ipAddress: '185.220.101.5',
    endpoint: '/api/v1/users/usr-6/role',
    details: 'Attempted to modify role body payload from "User" to "Admin" without superadmin session token.',
    timestamp: '2026-09-03T19:22:15Z',
    status: 'Active',
    actionTaken: 'Permission Denied & IP Logged',
  },
  {
    id: 'alt-103',
    title: 'Brute Force Login Anomaly Detected',
    category: 'Authentication Threat',
    riskLevel: 'Medium',
    severity: 'MEDIUM',
    userEmail: 'unknown@external.org',
    ipAddress: '194.26.29.112',
    endpoint: '/api/v1/auth/login',
    details: '8 failed authentication attempts within 60 seconds from isolated IP.',
    timestamp: '2026-09-03T19:15:30Z',
    status: 'Investigating',
    actionTaken: 'Rate Limiter Enforced (429 Too Many Requests)',
  },
  {
    id: 'alt-104',
    title: 'AI Anomaly: Off-Hours High Volume Request Surge',
    category: 'AI Threat Detector',
    riskLevel: 'Medium',
    severity: 'MEDIUM',
    userEmail: 'nandan@secure.io',
    ipAddress: '49.207.55.12',
    endpoint: '/api/v1/blockchain/logs',
    details: 'Request rate exceeded baseline by +420% for regular session window.',
    timestamp: '2026-09-03T18:50:00Z',
    status: 'Resolved',
    actionTaken: 'Session Challenge Issued (2FA Verified)',
  },
  {
    id: 'alt-105',
    title: 'Unauthorized ABAC Context (Time Restriction Failure)',
    category: 'Context Policy Violation',
    riskLevel: 'Low',
    severity: 'LOW',
    userEmail: 'kudan@secure.io',
    ipAddress: '106.51.88.4',
    endpoint: '/api/v1/monitoring/system-config',
    details: 'Access requested outside approved administrative time window (08:00 - 18:00 UTC).',
    timestamp: '2026-09-03T18:02:11Z',
    status: 'Resolved',
    actionTaken: 'ABAC Time Policy Blocked Access',
  },
];

const INITIAL_LOGS = [
  { id: 'log-1', method: 'GET', endpoint: '/api/v1/users', status: 200, user: 'chandan@secure.io', ip: '106.51.88.1', timeMs: 42, riskScore: 2, timestamp: new Date(Date.now() - 1000 * 30).toISOString() },
  { id: 'log-2', method: 'POST', endpoint: '/api/v1/auth/login', status: 200, user: 'ranjita@secure.io', ip: '49.207.55.8', timeMs: 110, riskScore: 1, timestamp: new Date(Date.now() - 1000 * 90).toISOString() },
  { id: 'log-3', method: 'GET', endpoint: '/api/v1/users/usr-1/payroll', status: 403, user: 'attacker_x@darknet.org', ip: '185.220.101.5', timeMs: 15, riskScore: 89, timestamp: new Date(Date.now() - 1000 * 180).toISOString() },
  { id: 'log-4', method: 'PUT', endpoint: '/api/v1/roles/role-2', status: 200, user: 'chandan@secure.io', ip: '106.51.88.1', timeMs: 65, riskScore: 4, timestamp: new Date(Date.now() - 1000 * 240).toISOString() },
  { id: 'log-5', method: 'DELETE', endpoint: '/api/v1/users/usr-99', status: 401, user: 'guest_temp@company.org', ip: '194.26.29.112', timeMs: 22, riskScore: 65, timestamp: new Date(Date.now() - 1000 * 320).toISOString() },
  { id: 'log-6', method: 'GET', endpoint: '/api/v1/monitoring/metrics', status: 200, user: 'ranjith@secure.io', ip: '106.51.88.1', timeMs: 38, riskScore: 3, timestamp: new Date(Date.now() - 1000 * 450).toISOString() },
  { id: 'log-7', method: 'POST', endpoint: '/api/v1/blockchain/audit-event', status: 200, user: 'nandan@secure.io', ip: '49.207.55.12', timeMs: 145, riskScore: 5, timestamp: new Date(Date.now() - 1000 * 600).toISOString() },
];

const INITIAL_AUDIT = [
  {
    id: 'aud-1001',
    actor: 'chandan@secure.io',
    action: 'USER_ROLE_UPDATED',
    resource: 'Role: Manager -> User (Target: usr-5)',
    status: 'SUCCESS',
    ipAddress: '106.51.88.1',
    hash: '0x8f3c7b2a9e1d4f6a8b0c2d4e6f8a0b2c4d6e8f0a',
    timestamp: '2026-09-03T17:40:00Z',
  },
  {
    id: 'aud-1002',
    actor: 'SYSTEM_POLICY_ENGINE',
    action: 'BROKEN_ACCESS_INTERCEPTED',
    resource: 'Endpoint /api/v1/users/usr-1/payroll',
    status: 'BLOCKED',
    ipAddress: '185.220.101.5',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    timestamp: '2026-09-03T19:28:01Z',
  },
  {
    id: 'aud-1003',
    actor: 'ranjita@secure.io',
    action: 'POLICY_RULE_CREATED',
    resource: 'ABAC Object Ownership Validation Rule #4',
    status: 'SUCCESS',
    ipAddress: '49.207.55.8',
    hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d',
    timestamp: '2026-09-03T16:10:22Z',
  },
  {
    id: 'aud-1004',
    actor: 'kudan@secure.io',
    action: 'AI_MODEL_RETRAINED',
    resource: 'Isolation Forest Anomaly Model v2.4',
    status: 'SUCCESS',
    ipAddress: '106.51.88.4',
    hash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    timestamp: '2026-09-03T15:20:15Z',
  },
];

// Helper to initialize local storage
export const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ROLES)) {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(INITIAL_ROLES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_ALERTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(INITIAL_LOGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT)) {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(INITIAL_AUDIT));
  }
};

// Execute initialization
initLocalStorage();

// Storage Getters / Setters
export const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse storage key:', key, e);
    return [];
  }
};

export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to set storage key:', key, e);
  }
};

export { STORAGE_KEYS };
