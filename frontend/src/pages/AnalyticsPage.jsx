import React, { useState } from 'react';
import { useLiveMonitoring } from '../context/LiveMonitoringContext';
import { exportToPDF } from '../utils/exportUtils';
import { useNotification } from '../context/NotificationContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  Cpu,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AnalyticsPage = () => {
  const { showSuccess } = useNotification();
  const [reportPeriod, setReportPeriod] = useState('September 2026');

  // Chart datasets
  const userActivityData = [
    { day: 'Mon', logins: 120, activeUsers: 45, violations: 4 },
    { day: 'Tue', logins: 190, activeUsers: 62, violations: 8 },
    { day: 'Wed', logins: 240, activeUsers: 85, violations: 3 },
    { day: 'Thu', logins: 310, activeUsers: 98, violations: 12 },
    { day: 'Fri', logins: 280, activeUsers: 90, violations: 6 },
    { day: 'Sat', logins: 140, activeUsers: 35, violations: 2 },
    { day: 'Sun', logins: 95, activeUsers: 22, violations: 1 },
  ];

  const apiEndpointUsage = [
    { endpoint: '/api/v1/auth/login', requests: 4200, status: '200 OK' },
    { endpoint: '/api/v1/users', requests: 2850, status: '200 OK' },
    { endpoint: '/api/v1/roles/assign', requests: 1420, status: '200 OK' },
    { endpoint: '/api/v1/users/usr-1/payroll', requests: 380, status: '403 BOLA Blocked' },
    { endpoint: '/api/v1/documents/confidential', requests: 190, status: '403 Intercepted' },
  ];

  const threatDetectionStats = [
    { name: 'Critical BOLA Blocks', count: 48, fill: '#E11D48' },
    { name: 'Function Escalations', count: 24, fill: '#D97706' },
    { name: 'Brute Force Attempts', count: 18, fill: '#002147' },
    { name: 'AI Anomaly Vectors', count: 12, fill: '#00D084' },
  ];

  const handleGenerateMonthlyReport = () => {
    const columns = [
      { header: 'Endpoint', key: 'endpoint' },
      { header: 'Request Volume', key: 'requests' },
      { header: 'Enforcement Status', key: 'status' },
    ];
    exportToPDF(
      `SACP Empirical Security Report - ${reportPeriod}`,
      columns,
      apiEndpointUsage,
      `empirical_security_report_${reportPeriod.replace(' ', '_')}.pdf`
    );
    showSuccess(`Compiled and generated research report for ${reportPeriod}.`, 'Empirical Report Ready');
  };

  return (
    <div className="space-y-8 p-2">
      {/* Top Banner with Generous Whitespace */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 glass-panel p-8">
        <div>
          <h1 className="text-2xl font-bold font-academic text-[#002147] flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-[#00D084]" /> Empirical Research & Anomaly Analytics
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Data visualizations for user activity, API usage trends, threat vector statistics, & compliance reporting.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="bg-white/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#00D084]"
          >
            <option value="September 2026">September 2026</option>
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
          </select>

          <button
            onClick={handleGenerateMonthlyReport}
            className="px-5 py-2.5 rounded-xl btn-mint text-[#002147] text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0"
          >
            <Download className="w-4 h-4" /> Download Empirical PDF
          </button>
        </div>
      </div>

      {/* Row 1 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activity Chart */}
        <div className="glass-panel p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-academic text-[#002147] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00D084]" /> Temporal User Sessions & Auth Frequency
              </h2>
              <p className="text-xs text-slate-500 font-sans">Total authorizations vs Active sessions across 7 days</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 33, 71, 0.06)" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#002147',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="logins" fill="#00D084" radius={[6, 6, 0, 0]} />
                <Bar dataKey="activeUsers" fill="#002147" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Usage Breakdown Chart */}
        <div className="glass-panel p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-academic text-[#002147] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#002147]" /> Evaluated Endpoint Distribution
              </h2>
              <p className="text-xs text-slate-500 font-sans">API request volume categorized by service interface</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={apiEndpointUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 33, 71, 0.06)" />
                <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis dataKey="endpoint" type="category" stroke="#64748B" fontSize={10} width={150} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#002147',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="requests" fill="#00D084" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Threat Detection Statistics */}
      <div className="glass-panel p-8 space-y-5">
        <h2 className="text-lg font-bold font-academic text-[#002147] flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#00D084]" /> Empirical Anomaly Vector Breakdown
        </h2>
        <p className="text-xs text-slate-500 font-sans">Total threat incidents intercepted categorized by attack vector</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {threatDetectionStats.map((stat) => (
            <div key={stat.name} className="p-5 rounded-2xl bg-white/70 border border-slate-200/80 space-y-2.5 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 font-sans">{stat.name}</span>
              <p className="text-2xl font-bold font-academic text-[#002147]">{stat.count} Incidents</p>
              <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${stat.count * 2}%`, backgroundColor: stat.fill }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
