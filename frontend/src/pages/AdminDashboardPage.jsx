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
  Terminal,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboardPage = () => {
  const { stats, logs, alerts, refreshData } = useLiveMonitoring();
  const { showSuccess } = useNotification();
  const [verifyingBlockchain, setVerifyingBlockchain] = useState(false);

  // Time-series dataset
  const trafficData = [
    { time: '08:00', totalRequests: 420, bolaIntercepted: 12 },
    { time: '10:00', totalRequests: 890, bolaIntercepted: 8 },
    { time: '12:00', totalRequests: 1450, bolaIntercepted: 45 },
    { time: '14:00', totalRequests: 1200, bolaIntercepted: 18 },
    { time: '16:00', totalRequests: 1850, bolaIntercepted: 62 },
    { time: '18:00', totalRequests: 2100, bolaIntercepted: 29 },
    { time: '20:00', totalRequests: logs.length * 150 + 900, bolaIntercepted: alerts.length * 4 },
  ];

  // Neon Threat Distribution
  const threatDistribution = [
    { name: 'BOLA_OBJECT_VIOLATION', value: 45, color: '#FF007F' },
    { name: 'BFLA_PRIVILEGE_ESCALATION', value: 25, color: '#FF8800' },
    { name: 'AUTH_BRUTE_FORCE', value: 18, color: '#3A86FF' },
    { name: 'ML_ANOMALY_SPIKE', value: 12, color: '#CCFF00' },
  ];

  const handleVerifyBlockchain = async () => {
    setVerifyingBlockchain(true);
    const result = await auditService.verifyIntegrity();
    setVerifyingBlockchain(false);
    showSuccess(
      `${result.tamperCheckStatus} across ${result.totalBlocksVerified} verified blocks on ${result.blockchainNetwork}.`,
      'Ledger Integrity Confirmed'
    );
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Top Welcome Header - Oversized bold Clash Display */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 border border-white/15">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-clash text-white tracking-wider">
              COMMAND_CENTER // ADMIN
            </h1>
            <span className="px-2.5 py-0.5 bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00] text-[10px] font-bold tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(204,255,0,0.4)]">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span> SYSTEM_LIVE
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            REAL-TIME BROKEN ACCESS CONTROL ENFORCEMENT // ML ANOMALY CLUSTERS // BLOCKCHAIN AUDIT
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleVerifyBlockchain}
            disabled={verifyingBlockchain}
            className="px-4 py-2.5 btn-cyber text-xs flex items-center gap-2"
          >
            {verifyingBlockchain ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <FileCheck className="w-4 h-4" />
            )}
            <span>VERIFY_BLOCKCHAIN</span>
          </button>

          <button
            onClick={refreshData}
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 hover:border-[#CCFF00] transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Primary Security Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="ACTIVE_USERS"
          value={stats?.totalUsers || 6}
          change="+12% weekly"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="TELEMETRY_REQS"
          value={(stats?.totalApiRequests || 94250).toLocaleString()}
          change="+34.2 req/s"
          changeType="positive"
          icon={Activity}
        />
        <StatCard
          title="INTERCEPTED_THREATS"
          value={alerts.filter((a) => a.riskLevel === 'High' || a.severity === 'CRITICAL').length}
          change="CRITICAL BOLA"
          changeType="negative"
          icon={AlertOctagon}
        />
        <StatCard
          title="SECURE_SESSIONS"
          value={stats?.activeSessions || 5}
          change="100% PROTECTED"
          changeType="positive"
          icon={ShieldCheck}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live API Request Traffic & BOLA Intercepts */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-4 border border-white/15">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-clash text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#CCFF00]" /> TRAFFIC_FLOW // INTERCEPTIONS
              </h2>
              <p className="text-xs text-zinc-400">Total API stream vs Zero-Trust policy rejections</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold font-mono">
              <span className="flex items-center gap-1.5 text-[#CCFF00]">
                <span className="w-2.5 h-2.5 bg-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.8)]"></span> REQS
              </span>
              <span className="flex items-center gap-1.5 text-[#FF007F]">
                <span className="w-2.5 h-2.5 bg-[#FF007F] shadow-[0_0_8px_rgba(255,0,127,0.8)]"></span> BOLA_BLOCKED
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="acidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF007F" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#FF007F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#050505',
                    borderColor: '#CCFF00',
                    boxShadow: '0 0 15px rgba(204,255,0,0.3)',
                    borderRadius: '0px',
                    fontSize: '11px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="totalRequests" stroke="#CCFF00" strokeWidth={2} fillOpacity={1} fill="url(#acidGrad)" />
                <Area type="monotone" dataKey="bolaIntercepted" stroke="#FF007F" strokeWidth={2} fillOpacity={1} fill="url(#pinkGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Threat Classification Distribution */}
        <div className="glass-panel p-6 flex flex-col justify-between border border-white/15">
          <div>
            <h2 className="text-xl font-clash text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#FF007F]" /> THREAT_MATRIX
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Automated ML classification breakdown</p>

            <div className="h-52 w-full mt-4 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={threatDistribution} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={4} dataKey="value">
                    {threatDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#050505" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#050505',
                      borderColor: '#FF007F',
                      boxShadow: '0 0 15px rgba(255,0,127,0.3)',
                      borderRadius: '0px',
                      fontSize: '11px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-4 text-[10px]">
            {threatDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-none" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Containers: API Gateway and Policy Engine with 1px glowing neon borders on hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Gateway Feature Container */}
        <div className="glass-panel p-6 border border-white/15 hover:border-[#CCFF00] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#CCFF00] text-black flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 fill-black" />
              </div>
              <div>
                <h3 className="text-lg font-clash text-white">API_GATEWAY // PROXY</h3>
                <p className="text-[11px] text-zinc-400">REQUEST_INTERCEPTION & TOKEN_SANITATION</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00] text-[10px] font-bold">
              ROUTING_ON
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono">
            Low-latency proxy verifying bearer JWT token cryptograms and discarding broken payload vectors before forwarding.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-300">
            <div className="p-2 bg-black border border-white/10">
              <span className="text-zinc-500 block">THROUGHPUT</span>
              <span className="font-bold text-[#CCFF00]">2.8k req/s</span>
            </div>
            <div className="p-2 bg-black border border-white/10">
              <span className="text-zinc-500 block">LATENCY</span>
              <span className="font-bold text-white">&lt;1.2ms</span>
            </div>
            <div className="p-2 bg-black border border-white/10">
              <span className="text-zinc-500 block">DROPPED</span>
              <span className="font-bold text-[#FF007F]">4.2% (BOLA)</span>
            </div>
          </div>
        </div>

        {/* Central Policy Engine Feature Container */}
        <div className="glass-panel p-6 border border-white/15 hover:border-[#FF007F] hover:shadow-[0_0_25px_rgba(255,0,127,0.4)] transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF007F] text-white flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-clash text-white">POLICY_ENGINE // ABAC</h3>
                <p className="text-[11px] text-zinc-400">OBJECT_LEVEL_OWNERSHIP_VALIDATION</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F] text-[10px] font-bold">
              ENFORCING
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono">
            Evaluates contextual RBAC attributes against requested database IDs, mitigating OWASP API1:2023 vulnerabilities.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-300">
            <div className="p-2 bg-black border border-white/10">
              <span className="text-zinc-500 block">RULES</span>
              <span className="font-bold text-white">64 Active</span>
            </div>
            <div className="p-2 bg-black border border-white/10">
              <span className="text-zinc-500 block">MODE</span>
              <span className="font-bold text-[#CCFF00]">STRICT_ZERO</span>
            </div>
            <div className="p-2 bg-black border border-white/10">
              <span className="text-zinc-500 block">OVERRIDE</span>
              <span className="font-bold text-zinc-400">DISABLED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
