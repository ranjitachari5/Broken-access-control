import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLiveMonitoring } from '../../context/LiveMonitoringContext';
import { Shield, Bell, LogOut, Radio, User as UserIcon, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isLive, toggleLive, alerts } = useLiveMonitoring();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const activeAlertsCount = alerts.filter((a) => a.status === 'Active').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel sticky top-0 z-40 border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
      {/* Left: Branding & Tagline */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wide flex items-center gap-2">
              SACP <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">v2.4</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">Broken Access Control Protection Engine</p>
          </div>
        </Link>
      </div>

      {/* Right: Live Stream Toggle, Alerts & Profile */}
      <div className="flex items-center gap-4">
        {/* Live Engine Stream Toggle */}
        <button
          onClick={toggleLive}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isLive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 glow-emerald'
              : 'bg-slate-800/80 text-slate-400 border-slate-700'
          }`}
          title="Toggle live simulated API request feed"
        >
          <Radio className={`w-3.5 h-3.5 ${isLive ? 'animate-pulse text-emerald-400' : 'text-slate-400'}`} />
          <span>{isLive ? 'LIVE STREAMING' : 'PAUSED'}</span>
        </button>

        {/* Threat Alert Notification Bell */}
        <Link
          to="/threats"
          className="relative p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-colors"
          title="Security Threat Alerts"
        >
          <Bell className="w-5 h-5" />
          {activeAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center animate-bounce shadow-md shadow-red-500/50">
              {activeAlertsCount}
            </span>
          )}
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-full object-cover border-2 border-blue-500/40"
            />
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">{user?.name || 'Chandan K N'}</p>
              <p className="text-[11px] text-blue-400 font-medium leading-tight flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> {user?.role || 'Admin'}
              </p>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel border border-white/10 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-white/10">
                <p className="text-xs font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Dept: {user?.department || 'Cybersecurity'}
                  </span>
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/dashboard"
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-blue-400" /> My Dashboard
                </Link>
              </div>

              <div className="border-t border-white/10 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/20 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-red-400" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
