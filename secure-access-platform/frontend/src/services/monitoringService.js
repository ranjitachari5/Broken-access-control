import api from './api';
import { getStoredData, setStoredData, STORAGE_KEYS } from './mockEngine';

export const monitoringService = {
  getLiveLogs: async () => {
    try {
      const response = await api.get('/monitoring/logs');
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }
    return getStoredData(STORAGE_KEYS.LOGS);
  },

  getSystemStats: async () => {
    try {
      const response = await api.get('/monitoring/stats');
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const alerts = getStoredData(STORAGE_KEYS.ALERTS);
    const logs = getStoredData(STORAGE_KEYS.LOGS);

    const totalUsers = users.length;
    const activeSessions = users.filter((u) => u.status === 'Active').length;
    const suspiciousActivities = alerts.filter((a) => a.riskLevel === 'High' || a.severity === 'CRITICAL').length;
    const totalApiRequests = logs.length * 1420 + 84200; // Realistic request volume

    return {
      totalUsers,
      activeSessions,
      suspiciousActivities,
      totalApiRequests,
      systemHealth: '99.98%',
      blockedAttemptsToday: 342,
      averageResponseTimeMs: 38,
      policyEngineStatus: 'ENFORCING',
      aiThreatModelStatus: 'ACTIVE',
    };
  },

  getActiveSessions: async () => {
    const users = getStoredData(STORAGE_KEYS.USERS);
    return users
      .filter((u) => u.status === 'Active')
      .map((u, i) => ({
        sessionId: `sess-${1000 + i}`,
        userId: u.id,
        userName: u.name,
        userEmail: u.email,
        role: u.role,
        ipAddress: i % 2 === 0 ? '106.51.88.1' : '49.207.55.8',
        device: i % 2 === 0 ? 'Chrome / Windows 11' : 'Safari / macOS Sonoma',
        location: u.location,
        loginTime: u.lastLogin,
        tokenExp: new Date(Date.now() + 3600000).toISOString(),
        isSuspicious: u.riskScore > 50,
      }));
  },

  revokeSession: async (sessionId) => {
    try {
      await api.post(`/monitoring/sessions/${sessionId}/revoke`);
      return true;
    } catch (e) {
      // Mock Fallback
    }
    return true;
  },

  // Generates a mock incoming API log for real-time live monitoring preview
  generateLiveLogEvent: () => {
    const endpoints = [
      { path: '/api/v1/users', method: 'GET', baseRisk: 2, status: 200 },
      { path: '/api/v1/users/usr-2/financials', method: 'GET', baseRisk: 88, status: 403 },
      { path: '/api/v1/roles/assign', method: 'POST', baseRisk: 6, status: 200 },
      { path: '/api/v1/auth/login', method: 'POST', baseRisk: 12, status: 200 },
      { path: '/api/v1/documents/confidential/90', method: 'DELETE', baseRisk: 95, status: 403 },
      { path: '/api/v1/monitoring/metrics', method: 'GET', baseRisk: 3, status: 200 },
    ];

    const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    const users = getStoredData(STORAGE_KEYS.USERS);
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const newLog = {
      id: `log-${Date.now()}`,
      method: randomEndpoint.method,
      endpoint: randomEndpoint.path,
      status: randomEndpoint.status,
      user: randomUser?.email || 'anonymous@client.org',
      ip: `${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 255)}.101.5`,
      timeMs: Math.floor(Math.random() * 60) + 15,
      riskScore: randomEndpoint.baseRisk,
      timestamp: new Date().toISOString(),
    };

    const logs = getStoredData(STORAGE_KEYS.LOGS);
    logs.unshift(newLog);
    if (logs.length > 50) logs.pop(); // keep last 50
    setStoredData(STORAGE_KEYS.LOGS, logs);

    return newLog;
  },
};
