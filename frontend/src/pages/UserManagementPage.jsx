import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useNotification } from '../context/NotificationContext';
import UserTable from '../components/users/UserTable';
import UserFormModal from '../components/users/UserFormModal';
import RoleAssignModal from '../components/users/RoleAssignModal';
import { Users, UserPlus, Search, Filter, ShieldCheck } from 'lucide-react';

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
    } catch (e) {
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
      showSuccess(`User ${formData.name} added successfully!`, 'User Created');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  const handleUpdateUser = async (formData) => {
    if (!editingUser) return;
    try {
      await userService.updateUser(editingUser.id, formData);
      showSuccess(`User ${formData.name} details updated.`, 'User Updated');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to revoke and delete this user account?')) return;
    try {
      await userService.deleteUser(id);
      showSuccess('User account deleted.', 'Account Deleted');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  const handleAssignRole = async (userId, newRole) => {
    try {
      await userService.assignRole(userId, newRole);
      showSuccess(`Assigned role '${newRole}' to user.`, 'Role Updated');
      fetchUsers();
    } catch (e) {
      showError(e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" /> User & ABAC Permission Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage user accounts, assign RBAC roles (Admin/Manager/User), and configure attribute policies.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" /> Add New User
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, department..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
          </select>
        </div>
      </div>

      {/* User Table Container */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
            Loading user registry...
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
