import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LiveMonitoringProvider } from './context/LiveMonitoringContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import MonitoringPage from './pages/MonitoringPage';
import ThreatAlertsPage from './pages/ThreatAlertsPage';
import AuditLogsPage from './pages/AuditLogsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import StellarCorpPage from './pages/StellarCorpPage';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <LiveMonitoringProvider>
            <Routes>
              {/* Public Authentication Routes */}
              <Route path="/stellarcorp" element={<StellarCorpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Routes Wrapper */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
                <Route path="/user-dashboard" element={<UserDashboardPage />} />
                <Route path="/monitoring" element={<MonitoringPage />} />
                <Route path="/audit-logs" element={<AuditLogsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Route>

              {/* Admin & Manager Only Routes */}
              <Route element={<ProtectedRoute allowedRoles={['Admin', 'Manager']} />}>
                <Route path="/users" element={<UserManagementPage />} />
                <Route path="/threats" element={<ThreatAlertsPage />} />
              </Route>

              {/* Root & Catch-all Redirect */}
              <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
              <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
            </Routes>
          </LiveMonitoringProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
