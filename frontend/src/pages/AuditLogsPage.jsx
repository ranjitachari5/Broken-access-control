import React, { useState, useEffect } from 'react';
import { auditService } from '../services/auditService';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import { useNotification } from '../context/NotificationContext';
import AuditTable from '../components/audit/AuditTable';
import { FileSpreadsheet, Download, Search, Filter, ShieldCheck, FileCheck, Calendar } from 'lucide-react';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { showSuccess } = useNotification();

  const fetchAuditLogs = async () => {
    setLoading(true);
    const data = await auditService.getAuditLogs({
      search,
      user: selectedUser,
      startDate,
      endDate,
    });
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [search, selectedUser, startDate, endDate]);

  const handleExportCSV = () => {
    exportToCSV(logs, 'sacp_audit_logs.csv');
    showSuccess('Audit log records exported to CSV format.', 'Export Complete');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'Action', key: 'action' },
      { header: 'Target Resource', key: 'resource' },
      { header: 'Actor', key: 'actor' },
      { header: 'IP Address', key: 'ipAddress' },
      { header: 'Cryptographic Hash', key: 'hash' },
      { header: 'Timestamp', key: 'timestamp' },
    ];
    exportToPDF('SACP Platform Security Audit Report', columns, logs, 'sacp_security_audit.pdf');
    showSuccess('Audit report compiled and downloaded as PDF.', 'PDF Generated');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-purple-400" /> Immutable Security Audit Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-proof audit trails linked with Solidity Smart Contract hashes on local Ethereum network.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-blue-400" /> Export CSV
          </button>

          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Search & Date/User Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by action, resource, hash..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* User Filter */}
          <div>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All User Actors</option>
              <option value="chandan@secure.io">chandan@secure.io</option>
              <option value="ranjita@secure.io">ranjita@secure.io</option>
              <option value="attacker_x@darknet.org">attacker_x@darknet.org</option>
              <option value="SYSTEM_POLICY_ENGINE">SYSTEM_POLICY_ENGINE</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Loading audit trail...</div>
        ) : (
          <AuditTable logs={logs} />
        )}
      </div>
    </div>
  );
};

export default AuditLogsPage;
