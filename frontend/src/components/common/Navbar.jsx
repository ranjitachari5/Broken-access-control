import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLiveMonitoring } from '../../context/LiveMonitoringContext';
import { Shield, Bell, LogOut, Radio, User as UserIcon, Lock, Zap, Terminal } from 'lucide-react';
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
    <nav className="glass-panel sticky top-0 z-40 border-b border-white/10 px-6 py-3 flex items-center justify-between">
      {/* Left: Branding & Tech-wear Tag */}
      <div className="flex items-center gap-6">
        <Link to="/admin-dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#CCFF00] flex items-center justify-center text-black font-black border border-black shadow-[2px_2px_0px_#FF007F] group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(204,255,0,0.8)] transition-all">
            <Zap className="w-5 h-5 fill-black" />
          </div>
          <div>
            <h1 className="font-clash text-xl text-white tracking-wide flex items-center gap-2">
              SACP <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F] font-bold">V.2000_GEN_Z</span>
            </h1>
            <p className="text-[11px] text-zinc-500 font-mono hidden sm:flex items-center gap-1">
              <Terminal className="w-3 h-3 text-[#CCFF00]" /> ZERO_TRUST_ENGINE // ACTIVE
            </p>
          </div>
        </Link>
      </div>

      {/* Right: Live Stream Toggle, Alerts & Profile */}
      <div className="flex items-center gap-4">
        {/* Live Engine Stream Toggle */}
        <button
          onClick={toggleLive}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold border transition-all ${
            isLive
              ? 'bg-[#CCFF00] text-black border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.6)]'
              : 'bg-zinc-900 text-zinc-400 border-zinc-700'
          }`}
          title="Toggle live simulated API request feed"
        >
          <Radio className={`w-3.5 h-3.5 ${isLive ? 'animate-pulse text-black' : 'text-zinc-500'}`} />
          <span>{isLive ? 'STREAM_ONLINE' : 'STREAM_PAUSED'}</span>
        </button>

        {/* Threat Alert Notification Bell */}
        <Link
          to="/threats"
          className="relative p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-[#FF007F] border border-white/10 hover:border-[#FF007F] transition-all"
          title="Security Threat Alerts"
        >
          <Bell className="w-4 h-4" />
          {activeAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF007F] text-white font-mono font-bold text-[10px] flex items-center justify-center animate-bounce shadow-[0_0_10px_rgba(255,0,127,0.8)]">
              {activeAlertsCount}
            </span>
          )}
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-1.5 hover:bg-zinc-900 border border-transparent hover:border-[#CCFF00] transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user?.name || 'User'}
              className="w-8 h-8 object-cover border-2 border-[#CCFF00]"
            />
            <div className="text-left hidden md:block">
              <p className="text-xs font-mono font-bold text-white leading-tight">{user?.name || 'Chandan K N'}</p>
              <p className="text-[10px] font-mono text-[#CCFF00] leading-tight flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> {user?.role || 'Admin'}
              </p>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 glass-panel border border-[#CCFF00] shadow-[0_0_25px_rgba(204,255,0,0.3)] py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2.5 border-b border-white/10">
                <p className="text-xs font-mono font-bold text-white">{user?.name}</p>
                <p className="text-xs font-mono text-zinc-400 truncate">{user?.email}</p>
                <div className="mt-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40">
                    DEPT: {user?.department || 'Cybersecurity'}
                  </span>
                </div>
              </div>

              <div className="py-1 font-mono">
                <Link
                  to="/user-dashboard"
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-[#CCFF00]/20 hover:text-[#CCFF00] flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-[#CCFF00]" /> MY_PROFILE
                </Link>
              </div>

              <div className="border-t border-white/10 pt-1 font-mono">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs text-[#FF007F] hover:bg-[#FF007F]/20 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> DISCONNECT
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
