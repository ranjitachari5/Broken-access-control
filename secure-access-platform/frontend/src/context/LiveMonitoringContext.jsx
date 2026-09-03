import React, { createContext, useContext, useState, useEffect } from 'react';
import { monitoringService } from '../services/monitoringService';
import { threatService } from '../services/threatService';

const LiveMonitoringContext = createContext(null);

export const LiveMonitoringProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLive, setIsLive] = useState(true);
  const [latestThreat, setLatestThreat] = useState(null);

  const refreshData = async () => {
    const fetchedLogs = await monitoringService.getLiveLogs();
    const fetchedStats = await monitoringService.getSystemStats();
    const fetchedAlerts = await threatService.getAlerts();
    setLogs(fetchedLogs);
    setStats(fetchedStats);
    setAlerts(fetchedAlerts);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Real-time live log & threat generator ticker
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // 1. Generate live API log
      const newLog = monitoringService.generateLiveLogEvent();
      setLogs((prev) => [newLog, ...prev.slice(0, 49)]);

      // 2. Occasionally generate simulated security threat (1 in 5 ticks)
      if (Math.random() < 0.22) {
        const newThreat = threatService.triggerSimulatedThreat();
        setAlerts((prev) => [newThreat, ...prev]);
        setLatestThreat(newThreat);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <LiveMonitoringContext.Provider
      value={{
        logs,
        alerts,
        stats,
        isLive,
        latestThreat,
        toggleLive: () => setIsLive(!isLive),
        clearLatestThreat: () => setLatestThreat(null),
        refreshData,
      }}
    >
      {children}
    </LiveMonitoringContext.Provider>
  );
};

export const useLiveMonitoring = () => {
  const context = useContext(LiveMonitoringContext);
  if (!context) {
    throw new Error('useLiveMonitoring must be used within a LiveMonitoringProvider');
  }
  return context;
};
