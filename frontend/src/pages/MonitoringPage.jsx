import React, { useState, useEffect } from 'react';
import { useLiveMonitoring } from '../context/LiveMonitoringContext';
import { monitoringService } from '../services/monitoringService';
import { useNotification } from '../context/NotificationContext';
import LiveApiTable from '../components/monitoring/LiveApiTable';
import ActiveSessionsList from '../components/monitoring/ActiveSessionsList';
import { Activity, Radio, Monitor, AlertOctagon, ShieldAlert, Play, Pause } from 'lucide-react';

const MonitoringPage = () => {
  const { logs, isLive, toggleLive } = useLiveMonitoring();
  const [activeTab, setActiveTab] = useState('live-logs');
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const { showSuccess, showError } = useNotification();

  const fetchSessions = async () => {
    setLoadingSessions(true);
    const data = await monitoringService.getActiveSessions();
    setSessions(data);
    setLoadingSessions(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevokeSession = async (sessionId) => {
    await monitoringService.revokeSession(sessionId);
    showSuccess(`Session token ${sessionId} revoked and invalidated.`, 'Session Terminated');
    fetchSessions();
  };

  const violationsCount = logs.filter((l) => l.status === 403 || l.status === 401).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" /> Live API Request & Session Monitoring
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time request interception, active JWT sessions, and broken access violation stream.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLive}
            className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
              isLive
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 glow-emerald'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
            }`}
          >
            {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isLive ? 'STREAMING ACTIVE' : 'STREAM PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('live-logs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'live-logs'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 glow-blue'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Radio className="w-4 h-4 text-blue-400" />
          <span>Live API Request Stream</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
            {logs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active-sessions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'active-sessions'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 glow-blue'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Monitor className="w-4 h-4 text-purple-400" />
          <span>Active User Sessions</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
            {sessions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('violations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'violations'
              ? 'bg-red-600/20 text-red-400 border border-red-500/40 glow-red'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Access Violation Logs</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono">
            {violationsCount}
          </span>
        </button>
      </div>

      {/* Main Tab Content Container */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        {activeTab === 'live-logs' && <LiveApiTable logs={logs} />}

        {activeTab === 'active-sessions' && (
          <div>
            {loadingSessions ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading active sessions...</div>
            ) : (
              <ActiveSessionsList sessions={sessions} onRevokeSession={handleRevokeSession} />
            )}
          </div>
        )}

        {activeTab === 'violations' && (
          <LiveApiTable logs={logs.filter((l) => l.status === 403 || l.status === 401)} />
        )}
      </div>
    </div>
  );
};

export default MonitoringPage;
