import React, { useState, useEffect } from 'react';
import { useLiveMonitoring } from '../context/LiveMonitoringContext';
import { monitoringService } from '../services/monitoringService';
import { useNotification } from '../context/NotificationContext';
import LiveApiTable from '../components/monitoring/LiveApiTable';
import ActiveSessionsList from '../components/monitoring/ActiveSessionsList';
import { Activity, Radio, Monitor, ShieldAlert, Play, Pause } from 'lucide-react';

const MonitoringPage = () => {
  const { logs, isLive, toggleLive } = useLiveMonitoring();
  const [activeTab, setActiveTab] = useState('live-logs');
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const { showSuccess } = useNotification();

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
    showSuccess(`Session ${sessionId} terminated.`, 'REVOKE_SUCCESS');
    fetchSessions();
  };

  const violationsCount = logs.filter((l) => l.status === 403 || l.status === 401).length;

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 border border-white/15 hover:border-[#CCFF00] transition-all">
        <div>
          <h1 className="text-2xl font-clash text-white flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-[#CCFF00]" /> TELEMETRY_STREAM // LIVE_API
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Intercepted traffic stream, cryptographic JWT sessions, and broken access exceptions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLive}
            className={`px-4 py-2 text-xs font-bold border transition-all ${
              isLive
                ? 'bg-[#CCFF00] text-black border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.5)]'
                : 'bg-zinc-900 text-zinc-400 border-zinc-700'
            }`}
          >
            {isLive ? <Pause className="w-4 h-4 inline mr-1.5" /> : <Play className="w-4 h-4 inline mr-1.5" />}
            <span>{isLive ? 'STREAM_LIVE' : 'STREAM_PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('live-logs')}
          className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'live-logs'
              ? 'bg-[#CCFF00] text-black shadow-[3px_3px_0px_#FF007F] border border-black'
              : 'text-zinc-400 hover:text-[#CCFF00] hover:bg-zinc-900'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>REQUEST_STREAM</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-black/40 text-black font-bold">
            {logs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('active-sessions')}
          className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'active-sessions'
              ? 'bg-[#CCFF00] text-black shadow-[3px_3px_0px_#FF007F] border border-black'
              : 'text-zinc-400 hover:text-[#CCFF00] hover:bg-zinc-900'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>SESSIONS</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-black/40 text-black font-bold">
            {sessions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('violations')}
          className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'violations'
              ? 'bg-[#FF007F] text-white shadow-[3px_3px_0px_#CCFF00] border border-black'
              : 'text-zinc-400 hover:text-[#FF007F] hover:bg-zinc-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>VIOLATIONS</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-white/20 text-white font-bold">
            {violationsCount}
          </span>
        </button>
      </div>

      {/* Main Tab Content Container */}
      <div className="glass-panel p-6 border border-white/15">
        {activeTab === 'live-logs' && <LiveApiTable logs={logs} />}

        {activeTab === 'active-sessions' && (
          <div>
            {loadingSessions ? (
              <div className="py-12 text-center text-xs text-zinc-500">POLLING_ACTIVE_SESSIONS...</div>
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
