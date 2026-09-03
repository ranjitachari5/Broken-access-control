import api from './api';
import { getStoredData, setStoredData, STORAGE_KEYS } from './mockEngine';

export const threatService = {
  getAlerts: async (filters = {}) => {
    try {
      const response = await api.get('/monitoring/alerts', { params: filters });
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    let alerts = getStoredData(STORAGE_KEYS.ALERTS);
    const { riskLevel, status, search } = filters;

    if (riskLevel && riskLevel !== 'All') {
      alerts = alerts.filter((a) => a.riskLevel === riskLevel);
    }

    if (status && status !== 'All') {
      alerts = alerts.filter((a) => a.status === status);
    }

    if (search) {
      const term = search.toLowerCase();
      alerts = alerts.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.userEmail.toLowerCase().includes(term) ||
          a.details.toLowerCase().includes(term) ||
          a.endpoint.toLowerCase().includes(term)
      );
    }

    return alerts;
  },

  updateAlertStatus: async (alertId, newStatus) => {
    try {
      const response = await api.put(`/monitoring/alerts/${alertId}`, { status: newStatus });
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    const alerts = getStoredData(STORAGE_KEYS.ALERTS);
    const index = alerts.findIndex((a) => a.id === alertId);
    if (index !== -1) {
      alerts[index].status = newStatus;
      setStoredData(STORAGE_KEYS.ALERTS, alerts);
      return alerts[index];
    }
    throw new Error('Alert not found');
  },

  triggerSimulatedThreat: () => {
    const threatsPool = [
      {
        title: 'Broken Object Level Access Interception',
        category: 'BOLA Vulnerability',
        riskLevel: 'High',
        severity: 'CRITICAL',
        userEmail: 'attacker_bot@darknet.io',
        ipAddress: '185.220.101.99',
        endpoint: '/api/v1/users/usr-1/sensitive-documents',
        details: 'Attacker attempted parameter pollution & IDOR manipulation on user endpoint.',
        actionTaken: 'API Gateway Policy Engine Blocked Request (403 Forbidden)',
      },
      {
        title: 'Function Level Privilege Escalation Request',
        category: 'BFLA Vulnerability',
        riskLevel: 'High',
        severity: 'HIGH',
        userEmail: 'guest_user@company.com',
        ipAddress: '194.26.29.112',
        endpoint: '/api/v1/permissions/grant-all',
        details: 'Unauthorized API route invocation attempted without required Admin scope.',
        actionTaken: 'RBAC Authorization Engine Intercepted Request',
      },
      {
        title: 'AI Anomaly: Anomalous Geo-Location Access',
        category: 'AI Threat Detector',
        riskLevel: 'Medium',
        severity: 'MEDIUM',
        userEmail: 'ranjith@secure.io',
        ipAddress: '190.14.88.2',
        endpoint: '/api/v1/monitoring/logs',
        details: 'Simultaneous login detected from Bangalore, IN and Bogota, CO within 3 minutes.',
        actionTaken: 'Session Temporarily Suspended for 2FA Verification',
      },
    ];

    const randomThreat = threatsPool[Math.floor(Math.random() * threatsPool.length)];
    const newAlert = {
      id: `alt-${Date.now()}`,
      ...randomThreat,
      timestamp: new Date().toISOString(),
      status: 'Active',
    };

    const alerts = getStoredData(STORAGE_KEYS.ALERTS);
    alerts.unshift(newAlert);
    setStoredData(STORAGE_KEYS.ALERTS, alerts);

    return newAlert;
  },
};
