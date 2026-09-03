import React, { useState, useEffect } from 'react';
import { auditService } from '../services/auditService';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import { useNotification } from '../context/NotificationContext';
import AuditTable from '../components/audit/AuditTable';
import { FileSpreadsheet, Download, Search } from 'lucide-react';

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
    exportToCSV(logs, 'sacp_audit_ledger.csv');
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
    exportToPDF('SACP Provenance & Audit Research Report', columns, logs, 'sacp_provenance_audit.pdf');
    showSuccess('Audit report compiled and downloaded as PDF.', 'PDF Generated');
  };

  return (
    <div className="space-y-8 p-2">
      {/* Top Banner with Generous Whitespace */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 glass-panel p-8">
        <div>
          <h1 className="text-2xl font-bold font-academic text-[#002147] flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-[#002147]" /> Cryptographic Provenance & Audit Ledger
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Tamper-proof audit trails linked with Solidity Smart Contract hashes on local Ethereum network.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#002147] text-xs font-bold border border-slate-200 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-[#006e45]" /> Export CSV
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-xl btn-mint text-[#002147] text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Download Provenance PDF
          </button>
        </div>
      </div>

      {/* Search & Date/User Filters */}
      <div className="glass-panel p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by action, resource, hash..."
              className="w-full bg-white/80 border border-slate-200/90 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00D084]"
            />
          </div>

          {/* User Filter */}
          <div>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-white/80 border border-slate-200/90 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00D084]"
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
              className="w-full bg-white/80 border border-slate-200/90 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00D084]"
            />
          </div>

          {/* End Date */}
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-white/80 border border-slate-200/90 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#00D084]"
            />
          </div>
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="glass-panel p-8">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500 font-sans">Loading provenance records...</div>
        ) : (
          <AuditTable logs={logs} />
        )}
      </div>
    </div>
  );
};

export default AuditLogsPage;
