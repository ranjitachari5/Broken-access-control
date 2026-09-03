import api from './api';
import { getStoredData, setStoredData, STORAGE_KEYS } from './mockEngine';

export const authService = {
  login: async (email, password) => {
    try {
      // Try real backend first
      const response = await api.post('/auth/login', { email, password });
      if (response.data?.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(response.data.user));
        return response.data;
      }
    } catch (e) {
      console.log('Backend API offline or error. Using Mock Auth Engine fallback.');
    }

    // Mock Engine Fallback
    const users = getStoredData(STORAGE_KEYS.USERS);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.status === 'Flagged') {
      throw new Error('Account flagged due to suspicious broken access behavior. Contact Administrator.');
    }

    // Mock JWT Token generation
    const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({ id: user.id, email: user.email, role: user.role, exp: Date.now() + 3600000 })
    )}.mockSignature`;

    localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));

    // Update last login
    user.lastLogin = new Date().toISOString();
    setStoredData(STORAGE_KEYS.USERS, users);

    return { token: mockToken, user };
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (e) {
      console.log('Using Mock Auth Engine for registration.');
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    if (users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'User',
      department: userData.department || 'General',
      location: userData.location || 'Remote',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      riskScore: 0,
      failedLogins: 0,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250`,
    };

    users.push(newUser);
    setStoredData(STORAGE_KEYS.USERS, users);
    return { success: true, user: newUser };
  },

  forgotPassword: async (email) => {
    try {
      await api.post('/auth/forgot-password', { email });
      return { success: true, message: 'Reset link sent to your email.' };
    } catch (e) {
      console.log('Using Mock Engine for forgot password.');
    }

    const users = getStoredData(STORAGE_KEYS.USERS);
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      throw new Error('No account found with this email address.');
    }

    return { success: true, message: 'Password reset link has been dispatched to your email address.' };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  },

  getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
};
