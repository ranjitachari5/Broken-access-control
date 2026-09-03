import React, { useState } from 'react';
import { useLiveMonitoring } from '../context/LiveMonitoringContext';
import { threatService } from '../services/threatService';
import { useNotification } from '../context/NotificationContext';
import ThreatCard from '../components/threats/ThreatCard';
import ThreatDetailModal from '../components/threats/ThreatDetailModal';
import { AlertOctagon, Search, Zap, Filter } from 'lucide-react';

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
    <div className="space-y-8 p-2">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 glass-panel p-8">
        <div>
          <h1 className="text-2xl font-bold font-academic text-[#002147] flex items-center gap-2.5">
            <AlertOctagon className="w-6 h-6 text-rose-600" /> AI Threat Detection & Incident Alerts
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Real-time notifications for Broken Object Level Access (BOLA) & Privilege Escalation threats.
          </p>
        </div>

        <button
          onClick={handleTriggerSimulatedThreat}
          className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all shrink-0"
        >
          <Zap className="w-4 h-4" /> Trigger Simulated Attack
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anomalies by title, endpoint..."
            className="w-full bg-white/80 border border-slate-200/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00D084]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto font-sans">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" /> Severity Filter:
          </div>

          {['All', 'High', 'Medium', 'Low'].map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                riskFilter === level
                  ? 'bg-[#002147] text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {level} Risk
            </button>
          ))}
        </div>
      </div>

      {/* Threat Alert Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlerts.length === 0 ? (
          <div className="col-span-2 glass-panel p-12 text-center text-xs text-slate-500">
            No security threat anomalies match the selected filters.
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
