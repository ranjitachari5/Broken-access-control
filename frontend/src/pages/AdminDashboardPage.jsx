import React, { useState } from 'react';
import { useLiveMonitoring } from '../context/LiveMonitoringContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import { auditService } from '../services/auditService';
import {
  Users,
  Activity,
  AlertOctagon,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  FileCheck,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { stats, logs, alerts, isLive, toggleLive, refreshData } = useLiveMonitoring();
  const { showSuccess, showInfo } = useNotification();
  const [verifyingBlockchain, setVerifyingBlockchain] = useState(false);

  // Chart dataset for live request traffic over past 12 hours
  const trafficData = [
    { time: '08:00', totalRequests: 420, bolaIntercepted: 12 },
    { time: '10:00', totalRequests: 890, bolaIntercepted: 8 },
    { time: '12:00', totalRequests: 1450, bolaIntercepted: 45 },
    { time: '14:00', totalRequests: 1200, bolaIntercepted: 18 },
    { time: '16:00', totalRequests: 1850, bolaIntercepted: 62 },
    { time: '18:00', totalRequests: 2100, bolaIntercepted: 29 },
    { time: '20:00', totalRequests: logs.length * 150 + 900, bolaIntercepted: alerts.length * 4 },
  ];

  const threatDistribution = [
    { name: 'BOLA (Object Access)', value: 45, color: '#ef4444' },
    { name: 'BFLA (Function Level)', value: 25, color: '#f59e0b' },
    { name: 'Brute Force / Auth', value: 18, color: '#3b82f6' },
    { name: 'AI Anomaly', value: 12, color: '#8b5cf6' },
  ];

  const handleVerifyBlockchain = async () => {
    setVerifyingBlockchain(true);
    const result = await auditService.verifyIntegrity();
    setVerifyingBlockchain(false);
    showSuccess(
      `${result.tamperCheckStatus} across ${result.totalBlocksVerified} verified blocks on ${result.blockchainNetwork}.`,
      'Blockchain Ledger Verified'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Authorization Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> POLICY ENGINE ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Broken Access Control monitoring, object-level ABAC validation, & AI anomaly score tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleVerifyBlockchain}
            disabled={verifyingBlockchain}
            className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-2 transition-all"
          >
            {verifyingBlockchain ? (
              <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
            ) : (
              <FileCheck className="w-4 h-4 text-purple-400" />
            )}
            <span>Verify Blockchain Audit Ledger</span>
          </button>

          <button
            onClick={refreshData}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-white/5"
            title="Refresh statistics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Primary Security Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Platform Users"
          value={stats?.totalUsers || 6}
          change="+12% this week"
          changeType="positive"
          icon={Users}
          glowColor="blue"
        />
        <StatCard
          title="Total API Requests"
          value={(stats?.totalApiRequests || 94250).toLocaleString()}
          change="+34.2 req/s"
          changeType="positive"
          icon={Activity}
          glowColor="purple"
        />
        <StatCard
          title="Suspicious Activities"
          value={alerts.filter((a) => a.riskLevel === 'High' || a.severity === 'CRITICAL').length}
          change="Critical BOLA Intercepts"
          changeType="negative"
          icon={AlertOctagon}
          glowColor="red"
        />
        <StatCard
          title="Active User Sessions"
          value={stats?.activeSessions || 5}
          change="100% Protected"
          changeType="positive"
          icon={ShieldCheck}
          glowColor="emerald"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live API Request Traffic & BOLA Intercepts */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" /> Live API Request Volume & Interception Stream
              </h2>
              <p className="text-xs text-slate-400">Total requests processed vs Broken Access Control blocks</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span> Total Requests
              </span>
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> BOLA Intercepted
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="totalReqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="bolaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="totalRequests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#totalReqGrad)" />
                <Area type="monotone" dataKey="bolaIntercepted" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#bolaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Threat Classification Distribution */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" /> Threat Vector Distribution
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Classification by Policy Engine & AI Model</p>

            <div className="h-52 w-full mt-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={threatDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={5} dataKey="value">
                    {threatDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
            {threatDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Live Interception Stream & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Real-time Live Log Feed */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" /> Real-Time Interception Feed
            </h2>
            <span className="text-xs text-slate-400 font-mono">Top 5 Recent Intercepted Calls</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-semibold text-slate-400 uppercase">
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Endpoint API</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Target User</th>
                  <th className="py-2.5 px-3">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-mono">
                {logs.slice(0, 5).map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3 text-slate-200">{log.endpoint}</td>
                    <td className="py-3 px-3">
                      <Badge variant={String(log.status)}>{log.status}</Badge>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{log.user}</td>
                    <td className="py-3 px-3">
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
        </div>

        {/* Right Col: System Security Controls */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" /> Framework Architecture
            </h2>
            <p className="text-xs text-slate-400 mt-1">Core Modules & Sub-systems Status</p>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Centralized Policy Engine</p>
                  <p className="text-[11px] text-slate-400">ABAC Object-Level Verification</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ENFORCING
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">API Gateway Middleware</p>
                  <p className="text-[11px] text-slate-400">Token Interception & Validation</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">AI Threat Detection</p>
                  <p className="text-[11px] text-slate-400">Isolation Forest Anomaly Model</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Blockchain Audit Ledger</p>
                  <p className="text-[11px] text-slate-400">Solidity Smart Contract Logs</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  SYNCHRONIZED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
