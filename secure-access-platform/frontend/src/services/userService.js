import api from './api';
import { getStoredData, setStoredData, STORAGE_KEYS } from './mockEngine';

export const userService = {
  getUsers: async (filters = {}) => {
    try {
      const response = await api.get('/users', { params: filters });
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    let users = getStoredData(STORAGE_KEYS.USERS);
    const { search, role, status } = filters;

    if (search) {
      const term = search.toLowerCase();
      users = users.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.department.toLowerCase().includes(term)
      );
    }

    if (role && role !== 'All') {
      users = users.filter((u) => u.role === role);
    }

    if (status && status !== 'All') {
      users = users.filter((u) => u.status === status);
    }

    return users;
  },

  getRoles: async () => {
    try {
      const response = await api.get('/roles');
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }
    return getStoredData(STORAGE_KEYS.ROLES);
  },

  addUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'User',
      department: userData.department || 'Engineering',
      location: userData.location || 'Bangalore, IN',
      status: userData.status || 'Active',
      lastLogin: new Date().toISOString(),
      riskScore: userData.riskScore || 0,
      failedLogins: 0,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`,
    };

    users.unshift(newUser);
    setStoredData(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  updateUser: async (id, updatedData) => {
    try {
      const response = await api.put(`/users/${id}`, updatedData);
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      setStoredData(STORAGE_KEYS.USERS, users);
      return users[index];
    }
    throw new Error('User not found');
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (e) {
      // Mock Fallback
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const filtered = users.filter((u) => u.id !== id);
    setStoredData(STORAGE_KEYS.USERS, filtered);
    return true;
  },

  assignRole: async (userId, role) => {
    try {
      const response = await api.post(`/roles/assign`, { userId, role });
      if (response.data) return response.data;
    } catch (e) {
      // Mock Fallback
    }

    return userService.updateUser(userId, { role });
  },
};
