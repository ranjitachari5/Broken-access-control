import React, { useState, useEffect } from 'react';
import { useLiveMonitoring } from '../context/LiveMonitoringContext';
import { threatService } from '../services/threatService';
import { useNotification } from '../context/NotificationContext';
import ThreatCard from '../components/threats/ThreatCard';
import ThreatDetailModal from '../components/threats/ThreatDetailModal';
import { AlertOctagon, Search, ShieldAlert, Zap, Filter } from 'lucide-react';

const ThreatAlertsPage = () => {
  const { alerts, refreshData } = useLiveMonitoring();
  const [riskFilter, setRiskFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const { showSuccess, showError } = useNotification();

  const handleResolveAlert = async (alertId) => {
    try {
      await threatService.updateAlertStatus(alertId, 'Resolved');
      showSuccess('Threat incident status set to Resolved.', 'Incident Resolved');
      refreshData();
    } catch (e) {
      showError('Failed to update alert status.');
    }
  };

  const handleTriggerSimulatedThreat = () => {
    const newThreat = threatService.triggerSimulatedThreat();
    showError(`Simulated ${newThreat.riskLevel} Risk threat triggered!`, 'AI Threat Detector Alert');
    refreshData();
  };

  const filteredAlerts = alerts.filter((a) => {
    if (riskFilter !== 'All' && a.riskLevel !== riskFilter) return false;
    if (statusFilter !== 'All' && a.status !== statusFilter) return false;
    if (search) {
      const term = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(term) ||
        a.details.toLowerCase().includes(term) ||
        a.endpoint.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-red-400 glow-red" /> AI Threat Detection & Incident Alerts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time notifications for Broken Object Level Access (BOLA) & Privilege Escalation threats.
          </p>
        </div>

        <button
          onClick={handleTriggerSimulatedThreat}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg shadow-red-500/25 flex items-center gap-2 transition-all shrink-0"
        >
          <Zap className="w-4 h-4" /> Trigger Simulated Attack
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts by title or endpoint..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" /> Risk Filter:
          </div>

          {['All', 'High', 'Medium', 'Low'].map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                riskFilter === level
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 glow-blue font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {level} Risk
            </button>
          ))}
        </div>
      </div>

      {/* Threat Alert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAlerts.length === 0 ? (
          <div className="col-span-2 glass-panel p-12 text-center text-xs text-slate-400 rounded-2xl border border-white/10">
            No security threat alerts match the selected risk filters.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <ThreatCard
              key={alert.id}
              alert={alert}
              onViewDetails={(a) => setSelectedAlert(a)}
              onResolve={handleResolveAlert}
            />
          ))
        )}
      </div>

      {/* Incident Detail Modal */}
      <ThreatDetailModal
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        alert={selectedAlert}
        onResolve={handleResolveAlert}
      />
    </div>
  );
};

export default ThreatAlertsPage;
