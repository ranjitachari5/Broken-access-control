import React from 'react';
import Badge from '../common/Badge';

const LiveApiTable = ({ logs }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-[11px] font-semibold text-slate-400 uppercase">
            <th className="py-3 px-4">Timestamp</th>
            <th className="py-3 px-4">Method</th>
            <th className="py-3 px-4">Endpoint Path</th>
            <th className="py-3 px-4">HTTP Status</th>
            <th className="py-3 px-4">User Identity</th>
            <th className="py-3 px-4">IP Address</th>
            <th className="py-3 px-4">Latency</th>
            <th className="py-3 px-4">Risk Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-xs font-mono">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-white/5 transition-colors">
              <td className="py-3 px-4 text-slate-400 text-[11px]">
                {new Date(log.timestamp).toLocaleTimeString()}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    log.method === 'GET'
                      ? 'bg-blue-500/20 text-blue-400'
                      : log.method === 'POST'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : log.method === 'DELETE'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {log.method}
                </span>
              </td>
              <td className="py-3 px-4 text-slate-200 font-semibold">{log.endpoint}</td>
              <td className="py-3 px-4">
                <Badge variant={String(log.status)}>{log.status}</Badge>
              </td>
              <td className="py-3 px-4 text-slate-300 font-sans">{log.user}</td>
              <td className="py-3 px-4 text-slate-400">{log.ip}</td>
              <td className="py-3 px-4 text-slate-400">{log.timeMs} ms</td>
              <td className="py-3 px-4">
                <span
                  className={`font-bold ${
                    log.riskScore > 50 ? 'text-red-400 glow-red' : log.riskScore > 20 ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {log.riskScore} / 100
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveApiTable;
