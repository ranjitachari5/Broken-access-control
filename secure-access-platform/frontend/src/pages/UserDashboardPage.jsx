import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import {
  ShieldCheck,
  Building,
  MapPin,
  CheckCircle2,
  XCircle,
  Play,
  Key,
  Lock,
  Zap,
  Terminal,
} from 'lucide-react';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [simulationResult, setSimulationResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const testableEndpoints = [
    {
      path: `/api/v1/users/${user?.id || 'usr-1'}/profile`,
      method: 'GET',
      description: 'REQUEST_OWN_METADATA_OBJECT',
      expectedResult: 'HTTP 200 // PERMITTED',
      isAllowed: true,
    },
    {
      path: '/api/v1/users/usr-1/payroll',
      method: 'GET',
      description: 'ATTEMPT_UNAUTHORIZED_RESOURCE_ACCESS (BOLA_TEST)',
      expectedResult: user?.role === 'Admin' ? 'HTTP 200 // PERMITTED' : 'HTTP 403 // INTERCEPTED',
      isAllowed: user?.role === 'Admin',
    },
    {
      path: '/api/v1/roles/assign',
      method: 'POST',
      description: 'ESCALATE_FUNCTION_LEVEL_RIGHTS (BFLA_TEST)',
      expectedResult: user?.role === 'Admin' ? 'HTTP 200 // PERMITTED' : 'HTTP 403 // INTERCEPTED',
      isAllowed: user?.role === 'Admin',
    },
    {
      path: '/api/v1/blockchain/audit-logs',
      method: 'GET',
      description: 'READ_CRYPTOGRAPHIC_PROVENANCE_LEDGER',
      expectedResult: 'HTTP 200 // PERMITTED',
      isAllowed: true,
    },
  ];

  const handleSimulateRequest = async (ep) => {
    setTesting(true);
    setSimulationResult(null);

    await new Promise((r) => setTimeout(r, 450));

    const isSuccess = ep.isAllowed;
    const result = {
      endpoint: ep.path,
      method: ep.method,
      status: isSuccess ? 200 : 403,
      policyResult: isSuccess
        ? 'AUTHORIZED // ZERO_TRUST_VERIFIED'
        : 'BLOCKED // BROKEN_ACCESS_CONTROL_PREVENTED',
      details: isSuccess
        ? 'TOKEN VALIDATED // ABAC OWNERSHIP CONFIRMED'
        : 'OWNERSHIP MISMATCH // REQUEST INTERCEPTED BEFORE DB ROUTE',
    };

    setSimulationResult(result);
    setTesting(false);

    if (isSuccess) {
      showSuccess(`Authorized on ${ep.path}`, 'POLICY CHECK 200');
    } else {
      showError(`Access violation blocked on ${ep.path}`, 'BOLA 403 INTERCEPT');
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="glass-panel p-6 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#CCFF00] transition-all">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
            alt={user?.name}
            className="w-16 h-16 object-cover border-2 border-[#CCFF00]"
          />
          <div>
            <h1 className="text-2xl font-clash text-white flex items-center gap-3">
              {user?.name || 'OPERATOR_01'}
              <span className="px-2.5 py-0.5 bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00] text-xs font-mono font-bold">
                TIER: {user?.role || 'USER'}
              </span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-zinc-500" /> {user?.department || 'Cybersecurity'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" /> {user?.location || 'Bangalore, IN'}
              </span>
            </p>
          </div>
        </div>

        <div className="text-right p-4 bg-black border border-white/10">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">INTEGRITY_INDEX</p>
          <p className="text-2xl font-clash text-[#CCFF00]">98 / 100</p>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="SCOPE_ROLE" value={user?.role || 'USER'} change="RBAC_ACTIVE" changeType="positive" icon={Lock} />
        <StatCard title="ABAC_RULES" value="5 ACTIVE" change="ENFORCED" changeType="positive" icon={Key} />
        <StatCard title="THREAT_FLAGS" value="0 INCIDENTS" change="CLEAN" changeType="positive" icon={ShieldCheck} />
      </div>

      {/* Interactive Policy Enforcement Simulator */}
      <div className="glass-panel p-6 border border-white/15 space-y-6 hover:border-[#CCFF00] transition-all">
        <div>
          <h2 className="text-xl font-clash text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#CCFF00] fill-[#CCFF00]" /> SIMULATE_ABAC_POLICY_PROBE
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Probe the policy engine against live mock endpoints to observe BOLA/BFLA prevention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testableEndpoints.map((ep, idx) => (
            <div
              key={idx}
              className="p-4 bg-black border border-white/10 hover:border-[#CCFF00] transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 ${
                      ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400 border border-blue-500' : 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-[10px] text-zinc-500">{ep.expectedResult}</span>
                </div>
                <p className="text-xs font-bold text-white">{ep.path}</p>
                <p className="text-[11px] text-zinc-400 mt-1">{ep.description}</p>
              </div>

              <button
                onClick={() => handleSimulateRequest(ep)}
                disabled={testing}
                className="w-full py-2 px-3 btn-dark text-xs flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-[#CCFF00]" /> EXECUTE_PROBE
              </button>
            </div>
          ))}
        </div>

        {/* Simulation Output Result Box */}
        {simulationResult && (
          <div
            className={`p-5 border transition-all ${
              simulationResult.status === 200
                ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-white shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                : 'bg-[#FF007F]/10 border-[#FF007F] text-white shadow-[0_0_20px_rgba(255,0,127,0.3)]'
            }`}
          >
            <div className="flex items-start gap-4">
              {simulationResult.status === 200 ? (
                <CheckCircle2 className="w-6 h-6 text-[#CCFF00] shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-[#FF007F] shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h4 className="text-sm font-clash tracking-wide flex items-center gap-2">
                  <span>{simulationResult.policyResult}</span>
                  <span className="text-xs px-2 py-0.5 bg-black border border-white/20">
                    HTTP_{simulationResult.status}
                  </span>
                </h4>
                <p className="text-xs text-zinc-400">ENDPOINT: {simulationResult.endpoint}</p>
                <p className="text-xs text-zinc-300">{simulationResult.details}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
