import { useLiveMonitoring } from '../context/LiveMonitoringContext';

export const useThreatAlerts = () => {
  const { alerts, latestThreat, clearLatestThreat, refreshData } = useLiveMonitoring();
  return { alerts, latestThreat, clearLatestThreat, refreshData };
};

export default useThreatAlerts;
