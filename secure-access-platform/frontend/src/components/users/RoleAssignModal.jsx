import React, { useState } from 'react';
import Modal from '../common/Modal';
import { ShieldCheck, Lock } from 'lucide-react';

const RoleAssignModal = ({ isOpen, onClose, user, onAssignRole }) => {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'User');

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssignRole(user.id, selectedRole);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign RBAC Role to ${user.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-blue-500/40" />
          <div>
            <p className="text-xs font-bold text-white">{user.name}</p>
            <p className="text-[11px] text-slate-400">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Role Authorization Level
          </label>

          {[
            {
              name: 'Admin',
              desc: 'Full administrative access to policies, gateway rules, user accounts & audit logs.',
              color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
            },
            {
              name: 'Manager',
              desc: 'Department monitoring, user management, and threat investigation privileges.',
              color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
            },
            {
              name: 'User',
              desc: 'Standard object-level access restricted by ABAC attribute policies.',
              color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
            },
          ].map((r) => (
            <label
              key={r.name}
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedRole === r.name ? `${r.color} shadow-lg font-semibold` : 'border-white/10 bg-slate-900/40 text-slate-400 hover:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r.name}
                checked={selectedRole === r.name}
                onChange={() => setSelectedRole(r.name)}
                className="mt-1 accent-blue-500"
              />
              <div>
                <span className="text-xs font-bold block">{r.name} Scope</span>
                <span className="text-[11px] text-slate-400 leading-relaxed block mt-0.5">{r.desc}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-500/20"
          >
            Update Role Authorization
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoleAssignModal;
