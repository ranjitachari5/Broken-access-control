import React from 'react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';
import { AlertOctagon, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';

const ThreatCard = ({ alert, onViewDetails, onResolve }) => {
  const isHighRisk = alert.riskLevel === 'High' || alert.severity === 'CRITICAL';

  return (
    <div
      className={`glass-panel p-5 rounded-2xl border transition-all space-y-3 ${
        isHighRisk
          ? 'border-red-500/40 bg-red-950/20 hover:border-red-500/60'
          : 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
              isHighRisk ? 'bg-red-500/20 border-red-500/40 text-red-400 glow-red' : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
            }`}
          >
            <AlertOctagon className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{alert.title}</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">{alert.endpoint}</p>
          </div>
        </div>

        <Badge type="risk" variant={alert.riskLevel}>
          {alert.riskLevel}
        </Badge>
      </div>

      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{alert.details}</p>

      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-mono">{formatDate(alert.timestamp)}</span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(alert)}
            className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Inspect Incident
          </button>

          {alert.status !== 'Resolved' && (
            <button
              onClick={() => onResolve(alert.id)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatCard;
