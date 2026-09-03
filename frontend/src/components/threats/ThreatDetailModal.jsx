import React from 'react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';
import { AlertOctagon, Shield, User, Globe, FileText, CheckCircle2 } from 'lucide-react';

const ThreatDetailModal = ({ isOpen, onClose, alert, onResolve }) => {
  if (!alert) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Security Threat Incident Detail" maxWidth="max-w-2xl">
      <div className="space-y-5 text-xs">
        {/* Risk Banner */}
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3 text-red-200">
          <AlertOctagon className="w-6 h-6 text-red-400 shrink-0 mt-0.5 glow-red" />
          <div className="flex-1">
            <h4 className="text-sm font-bold">{alert.title}</h4>
            <p className="text-[11px] text-red-300 mt-1">{alert.details}</p>
          </div>
        </div>

        {/* Technical Attributes Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Risk Classification</span>
            <div>
              <Badge type="risk" variant={alert.riskLevel}>
                {alert.riskLevel} RISK ({alert.severity})
              </Badge>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Incident Category</span>
            <p className="font-bold text-white font-mono">{alert.category}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Target Endpoint</span>
            <p className="font-bold text-blue-400 font-mono">{alert.endpoint}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Attacker IP Address</span>
            <p className="font-bold text-slate-200 font-mono">{alert.ipAddress}</p>
          </div>
        </div>

        {/* Action Executed by Policy Gateway */}
        <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Enforcement Mitigation Taken</span>
          <p className="text-xs font-bold text-emerald-400 font-mono">{alert.actionTaken}</p>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 flex items-center justify-between border-t border-white/10">
          <span className="text-[11px] text-slate-400">Timestamp: {formatDate(alert.timestamp)}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Close
            </button>
            {alert.status !== 'Resolved' && (
              <button
                onClick={() => {
                  onResolve(alert.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark Incident Resolved
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ThreatDetailModal;
