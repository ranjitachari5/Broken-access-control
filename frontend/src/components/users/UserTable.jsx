import React from 'react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';
import { Shield, Edit2, Trash2, ShieldAlert, Key } from 'lucide-react';

const UserTable = ({ users, onEdit, onDelete, onAssignRole }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-[11px] font-semibold text-slate-400 uppercase">
            <th className="py-3 px-4">User</th>
            <th className="py-3 px-4">Role (RBAC)</th>
            <th className="py-3 px-4">Department & Location (ABAC)</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Risk Score</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-xs">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-white/5 transition-colors">
              {/* User Name & Email */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-9 h-9 rounded-full object-cover border border-blue-500/30 shrink-0"
                  />
                  <div>
                    <p className="font-bold text-white leading-tight">{u.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                  </div>
                </div>
              </td>

              {/* Role */}
              <td className="py-3.5 px-4">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    u.role === 'Admin'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      : u.role === 'Manager'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-slate-700/50 text-slate-300 border-slate-600'
                  }`}
                >
                  <Key className="w-3 h-3" /> {u.role}
                </span>
              </td>

              {/* Department & Location */}
              <td className="py-3.5 px-4 text-slate-300">
                <p className="font-semibold text-xs text-white">{u.department}</p>
                <p className="text-[11px] text-slate-400">{u.location}</p>
              </td>

              {/* Status */}
              <td className="py-3.5 px-4">
                <Badge variant={u.status}>{u.status}</Badge>
              </td>

              {/* Risk Score */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-bold text-xs ${
                      u.riskScore > 50 ? 'text-red-400 glow-red' : u.riskScore > 20 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {u.riskScore}
                  </span>
                  <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden hidden sm:block">
                    <div
                      className={`h-full rounded-full ${
                        u.riskScore > 50 ? 'bg-red-500' : u.riskScore > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(u.riskScore, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onAssignRole(u)}
                    className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors"
                    title="Change Role"
                  >
                    <Shield className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEdit(u)}
                    className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors"
                    title="Edit User Details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDelete(u.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
