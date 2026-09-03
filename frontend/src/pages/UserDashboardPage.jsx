import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import {
  ShieldCheck,
  User,
  Lock,
  Building,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  Key,
} from 'lucide-react';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/v1/users/own-profile');
  const [simulationResult, setSimulationResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const testableEndpoints = [
    {
      path: `/api/v1/users/${user?.id || 'usr-1'}/profile`,
      method: 'GET',
      description: 'View Own User Profile',
      expectedResult: 'PERMITTED (200 OK)',
      isAllowed: true,
    },
    {
      path: '/api/v1/users/usr-1/payroll',
      method: 'GET',
      description: 'Access Other User Confidential Payroll Data (BOLA Test)',
      expectedResult: user?.role === 'Admin' ? 'PERMITTED (200 OK)' : 'BLOCKED BY POLICY ENGINE (403 Forbidden)',
      isAllowed: user?.role === 'Admin',
    },
    {
      path: '/api/v1/roles/assign',
      method: 'POST',
      description: 'Assign System Roles (BFLA Function Test)',
      expectedResult: user?.role === 'Admin' ? 'PERMITTED (200 OK)' : 'BLOCKED BY RBAC (403 Forbidden)',
      isAllowed: user?.role === 'Admin',
    },
    {
      path: '/api/v1/blockchain/audit-logs',
      method: 'GET',
      description: 'View Audit Logs',
      expectedResult: 'PERMITTED (200 OK)',
      isAllowed: true,
    },
  ];

  const handleSimulateRequest = async (ep) => {
    setTesting(true);
    setSimulationResult(null);

    await new Promise((r) => setTimeout(r, 600));

    const isSuccess = ep.isAllowed;
    const result = {
      endpoint: ep.path,
      method: ep.method,
      status: isSuccess ? 200 : 403,
      policyResult: isSuccess
        ? 'AUTHORIZED BY CENTRALIZED POLICY ENGINE'
        : 'INTERCEPTED: BROKEN ACCESS CONTROL VULNERABILITY PREVENTED',
      details: isSuccess
        ? 'JWT Token signature valid. ABAC Object Ownership check passed.'
        : 'Object Ownership Mismatch! User ID in JWT does not match target object resource ID.',
    };

    setSimulationResult(result);
    setTesting(false);

    if (isSuccess) {
      showSuccess(`Access granted to ${ep.path}`, 'Policy Check Passed');
    } else {
      showError(`Access control violation prevented on ${ep.path}`, 'BOLA Intercepted (403)');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/40 shadow-xl"
          />
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {user?.name || 'Chandan K N'}
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                {user?.role || 'User'}
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" /> {user?.department || 'Cybersecurity'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user?.location || 'Bangalore, IN'}
              </span>
            </p>
          </div>
        </div>

        <div className="text-right glass-panel p-3 px-5 rounded-xl border border-white/5">
          <p className="text-[11px] text-slate-400 uppercase font-semibold">User Security Score</p>
          <p className="text-xl font-black text-emerald-400">98 / 100 (Optimal)</p>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Role Access Level" value={user?.role || 'User'} change="RBAC Validated" changeType="positive" icon={Lock} glowColor="blue" />
        <StatCard title="ABAC Attributes" value="5 Active Rules" change="Enforced" changeType="positive" icon={Key} glowColor="purple" />
        <StatCard title="Violation Alerts" value="0 Incidents" change="Clean Trail" changeType="positive" icon={ShieldCheck} glowColor="emerald" />
      </div>

      {/* Interactive Policy Enforcement Simulator */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" /> Interactive ABAC Policy Enforcement Test
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test how the Policy Engine intercepts unauthorized resource access (BOLA / BFLA) in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testableEndpoints.map((ep, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/90 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{ep.expectedResult}</span>
                </div>
                <p className="text-xs font-bold text-white font-mono">{ep.path}</p>
                <p className="text-[11px] text-slate-400 mt-1">{ep.description}</p>
              </div>

              <button
                onClick={() => handleSimulateRequest(ep)}
                disabled={testing}
                className="w-full py-2 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-blue-400" /> Simulate API Request
              </button>
            </div>
          ))}
        </div>

        {/* Simulation Output Result Box */}
        {simulationResult && (
          <div
            className={`p-5 rounded-xl border animate-in fade-in duration-200 ${
              simulationResult.status === 200
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-red-950/30 border-red-500/30 text-red-200 glow-red'
            }`}
          >
            <div className="flex items-start gap-3">
              {simulationResult.status === 200 ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="text-sm font-bold tracking-wide flex items-center gap-2">
                  <span>{simulationResult.policyResult}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-black/40 font-mono">
                    HTTP {simulationResult.status}
                  </span>
                </h4>
                <p className="text-xs font-mono text-slate-300">Endpoint: {simulationResult.endpoint}</p>
                <p className="text-xs text-slate-300 mt-1">{simulationResult.details}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
