import React, { useState } from 'react';
import { useLiveMonitoring } from '../context/LiveMonitoringContext';
import { exportToPDF } from '../utils/exportUtils';
import { useNotification } from '../context/NotificationContext';
import {
  BarChart3,
  TrendingUp,
  Shield,
  Download,
  Users,
  Cpu,
  FileCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AnalyticsPage = () => {
  const { logs, alerts, stats } = useLiveMonitoring();
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
    { name: 'Critical BOLA Blocks', count: 48, fill: '#ef4444' },
    { name: 'Function Escalations', count: 24, fill: '#f59e0b' },
    { name: 'Brute Force Attempts', count: 18, fill: '#3b82f6' },
    { name: 'AI Off-Hours Anomaly', count: 12, fill: '#8b5cf6' },
  ];

  const handleGenerateMonthlyReport = () => {
    const columns = [
      { header: 'Endpoint', key: 'endpoint' },
      { header: 'Request Volume', key: 'requests' },
      { header: 'Enforcement Status', key: 'status' },
    ];
    exportToPDF(
      `SACP Executive Security Report - ${reportPeriod}`,
      columns,
      apiEndpointUsage,
      `monthly_security_report_${reportPeriod.replace(' ', '_')}.pdf`
    );
    showSuccess(`Compiled and generated PDF report for ${reportPeriod}.`, 'Monthly Report Ready');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" /> Security Analytics & Monthly Executive Reports
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Data visualizations for user activity, API usage trends, threat vector statistics, & compliance reporting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="September 2026">September 2026</option>
            <option value="August 2026">August 2026</option>
            <option value="July 2026">July 2026</option>
          </select>

          <button
            onClick={handleGenerateMonthlyReport}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all shrink-0"
          >
            <Download className="w-4 h-4" /> Download Monthly Security PDF
          </button>
        </div>
      </div>

      {/* Row 1 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" /> Weekly User Activity & Logins
              </h2>
              <p className="text-xs text-slate-400">Total logins vs Active sessions across 7 days</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="logins" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="activeUsers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Usage Breakdown Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" /> Most Requested API Endpoints
              </h2>
              <p className="text-xs text-slate-400">API request volume by endpoint contract</p>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={apiEndpointUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="endpoint" type="category" stroke="#64748b" fontSize={10} width={150} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="requests" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Threat Detection Statistics */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" /> Threat Detection Breakdown Statistics
        </h2>
        <p className="text-xs text-slate-400">Total threat incidents intercepted categorized by attack vector</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {threatDetectionStats.map((stat) => (
            <div key={stat.name} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
              <span className="text-xs font-semibold text-slate-400">{stat.name}</span>
              <p className="text-2xl font-black text-white">{stat.count} Incidents</p>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
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
