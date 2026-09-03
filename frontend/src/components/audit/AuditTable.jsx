import React from 'react';
import { formatDate } from '../../utils/formatters';
import { ShieldCheck, FileKey, Lock } from 'lucide-react';

const AuditTable = ({ logs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-[11px] font-semibold text-slate-400 uppercase">
            <th className="py-3 px-4">Timestamp</th>
            <th className="py-3 px-4">Security Action</th>
            <th className="py-3 px-4">Target Resource</th>
            <th className="py-3 px-4">Actor Email</th>
            <th className="py-3 px-4">IP Address</th>
            <th className="py-3 px-4">Cryptographic Hash</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-xs font-mono">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-white/5 transition-colors">
              <td className="py-3.5 px-4 text-slate-400 text-[11px]">{formatDate(log.timestamp)}</td>
              <td className="py-3.5 px-4">
                <span
                  className={`font-bold px-2.5 py-1 rounded-full text-[10px] border ${
                    log.status === 'BLOCKED'
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {log.action}
                </span>
              </td>
              <td className="py-3.5 px-4 text-white font-sans font-semibold">{log.resource}</td>
              <td className="py-3.5 px-4 text-slate-300 font-sans">{log.actor}</td>
              <td className="py-3.5 px-4 text-slate-400">{log.ipAddress}</td>
              <td className="py-3.5 px-4 text-[10px] text-purple-400 truncate max-w-[140px]" title={log.hash}>
                {log.hash}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTable;
