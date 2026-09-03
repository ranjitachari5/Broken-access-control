import { useLiveMonitoring } from '../context/LiveMonitoringContext';

export const useLiveLogs = () => {
  const { logs, isLive, toggleLive, refreshData } = useLiveMonitoring();
  return { logs, isLive, toggleLive, refreshData };
};

export default useLiveLogs;
