import React from 'react';
import Badge from '../common/Badge';
import { Monitor, Smartphone, ShieldAlert, LogOut, Lock } from 'lucide-react';

const ActiveSessionsList = ({ sessions, onRevokeSession }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sessions.map((sess) => (
        <div
          key={sess.sessionId}
          className={`p-4 rounded-xl border transition-all ${
            sess.isSuspicious
              ? 'bg-red-950/30 border-red-500/40 glow-red'
              : 'bg-slate-900/80 border-white/10 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  {sess.userName}
                  <span className="text-[10px] text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded font-mono">
                    {sess.role}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 font-mono">{sess.userEmail}</p>
              </div>
            </div>

            <button
              onClick={() => onRevokeSession(sess.sessionId)}
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors text-xs font-semibold flex items-center gap-1"
              title="Revoke Session Token"
            >
              <LogOut className="w-3.5 h-3.5" /> Revoke
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
            <div>
              <span className="text-slate-400 block text-[10px]">Client Device & Browser</span>
              <span className="text-slate-200 font-semibold">{sess.device}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">IP Address</span>
              <span className="text-slate-200 font-semibold">{sess.ipAddress}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Location</span>
              <span className="text-slate-200">{sess.location}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Session Status</span>
              {sess.isSuspicious ? (
                <span className="text-red-400 font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Flagged Session
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">Valid JWT Session</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveSessionsList;
