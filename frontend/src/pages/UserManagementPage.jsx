import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useNotification } from '../context/NotificationContext';
import UserTable from '../components/users/UserTable';
import UserFormModal from '../components/users/UserFormModal';
import RoleAssignModal from '../components/users/RoleAssignModal';
import { Users, UserPlus, Search, Filter } from 'lucide-react';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [roleUser, setRoleUser] = useState(null);

  const { showSuccess, showError } = useNotification();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers({
        search,
        role: roleFilter,
        status: statusFilter,
      });
      setUsers(data);
    } catch {
      showError('Failed to load user accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, statusFilter]);

  const handleAddUser = async (formData) => {
    try {
      await userService.addUser(formData);
      showSuccess(`Researcher ${formData.name} credentialed successfully!`, 'User Created');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  const handleUpdateUser = async (formData) => {
    if (!editingUser) return;
    try {
      await userService.updateUser(editingUser.id, formData);
      showSuccess(`Researcher ${formData.name} record updated.`, 'Record Updated');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to revoke and delete this researcher access token?')) return;
    try {
      await userService.deleteUser(id);
      showSuccess('Researcher access revoked.', 'Access Revoked');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  const handleAssignRole = async (userId, newRole) => {
    try {
      await userService.assignRole(userId, newRole);
      showSuccess(`Assigned authorization tier '${newRole}' to researcher.`, 'Tier Updated');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  return (
    <div className="space-y-8 p-2">
      {/* Header with Generous Whitespace */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 glass-panel p-8">
        <div>
          <h1 className="text-2xl font-bold font-academic text-[#002147] flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#00D084]" /> Researcher Registry & ABAC Access Matrix
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Configure access credentials, allocate role hierarchies (Admin/Lead/Researcher), and bind dynamic attribute policies.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setIsAddModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl btn-mint text-[#002147] text-xs font-bold shadow-xs flex items-center gap-2 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" /> Issue New Credentials
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by researcher name, email, lab..."
            className="w-full bg-white/80 border border-slate-200/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00D084] transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 w-full sm:w-auto font-sans">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" /> Filter Matrix:
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#00D084]"
          >
            <option value="All">All Tiers</option>
            <option value="Admin">System Administrator</option>
            <option value="Manager">Faculty Lead</option>
            <option value="User">Researcher</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#00D084]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* User Table Container */}
      <div className="glass-panel p-8 space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500 font-sans">
            <div className="w-8 h-8 border-2 border-[#002147]/20 border-t-[#00D084] rounded-full animate-spin mx-auto mb-2"></div>
            Loading researcher directory...
          </div>
        ) : (
          <UserTable
            users={users}
            onEdit={(user) => {
              setEditingUser(user);
              setIsAddModalOpen(true);
            }}
            onDelete={handleDeleteUser}
            onAssignRole={(user) => setRoleUser(user)}
          />
        )}
      </div>

      {/* Modals */}
      <UserFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
        initialUser={editingUser}
      />

      <RoleAssignModal
        isOpen={!!roleUser}
        onClose={() => setRoleUser(null)}
        user={roleUser}
        onAssignRole={handleAssignRole}
      />
    </div>
  );
};

export default UserManagementPage;
