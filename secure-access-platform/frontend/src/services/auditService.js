import api from './api';
import { getStoredData, setStoredData, STORAGE_KEYS } from './mockEngine';

export const auditService = {
  getAuditLogs: async (filters = {}) => {
    try {
      const response = await api.get('/audit-logs', { params: filters });
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    let logs = getStoredData(STORAGE_KEYS.AUDIT);
    const { search, user, startDate, endDate } = filters;

    if (search) {
      const term = search.toLowerCase();
      logs = logs.filter(
        (l) =>
          l.action.toLowerCase().includes(term) ||
          l.actor.toLowerCase().includes(term) ||
          l.resource.toLowerCase().includes(term) ||
          l.hash.toLowerCase().includes(term)
      );
    }

    if (user && user !== 'All') {
      logs = logs.filter((l) => l.actor.toLowerCase() === user.toLowerCase());
    }

    if (startDate) {
      logs = logs.filter((l) => new Date(l.timestamp) >= new Date(startDate));
    }

    if (endDate) {
      logs = logs.filter((l) => new Date(l.timestamp) <= new Date(endDate));
    }

    return logs;
  },

  addAuditLog: async (action, resource, status = 'SUCCESS', actor = 'CURRENT_USER') => {
    const logs = getStoredData(STORAGE_KEYS.AUDIT);
    const mockHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    const newLog = {
      id: `aud-${Date.now()}`,
      actor,
      action,
      resource,
      status,
      ipAddress: '106.51.88.1',
      hash: mockHash,
      timestamp: new Date().toISOString(),
    };

    logs.unshift(newLog);
    setStoredData(STORAGE_KEYS.AUDIT, logs);
    return newLog;
  },

  verifyIntegrity: async () => {
    // Simulates blockchain verification of audit trail logs
    await new Promise((res) => setTimeout(res, 800));
    return {
      isVerified: true,
      blockchainNetwork: 'Ganache Local Ethereum Testnet (Chain ID 1337)',
      contractAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      totalBlocksVerified: 148,
      tamperCheckStatus: 'PASSED (0 Integrity Violations)',
    };
  },
};
