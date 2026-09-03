import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#CCFF00]/20 border-t-[#CCFF00] animate-spin shadow-[0_0_20px_rgba(204,255,0,0.5)]"></div>
          <p className="text-xs uppercase tracking-widest text-[#CCFF00]">AUTHENTICATING_JWT_SCOPE...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col font-mono selection:bg-[#CCFF00] selection:text-black">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 flex items-center justify-center">
            <div className="glass-panel p-8 rounded-none border border-[#FF007F] shadow-[0_0_35px_rgba(255,0,127,0.3)] max-w-md w-full text-center space-y-4">
              <div className="w-14 h-14 bg-[#FF007F]/20 border border-[#FF007F] flex items-center justify-center mx-auto text-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.5)]">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-clash text-white font-black">403_ACCESS_DENIED</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                BROKEN ACCESS CONTROL EXCEPTION INTERCEPTED. USER ROLE{' '}
                <span className="text-[#FF007F] font-bold">[{user?.role}]</span> LACKS RBAC/ABAC CLEARANCE FOR THIS RESOURCE.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-mono selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
