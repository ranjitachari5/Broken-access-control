import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Activity,
  AlertOctagon,
  FileSpreadsheet,
  BarChart3,
  ShieldCheck,
  Lock,
  Terminal,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    {
      name: 'ADMIN_DASHBOARD',
      path: '/admin-dashboard',
      icon: LayoutDashboard,
      roles: ['Admin'],
    },
    {
      name: 'USER_INTERFACE',
      path: '/user-dashboard',
      icon: ShieldCheck,
      roles: ['Admin', 'Manager', 'User'],
    },
    {
      name: 'ACCESS_CONTROL',
      path: '/users',
      icon: Users,
      roles: ['Admin', 'Manager'],
      badge: 'RBAC',
    },
    {
      name: 'LIVE_TELEMETRY',
      path: '/monitoring',
      icon: Activity,
      roles: ['Admin', 'Manager', 'User'],
      badge: 'STREAM',
    },
    {
      name: 'AI_ANOMALIES',
      path: '/threats',
      icon: AlertOctagon,
      roles: ['Admin', 'Manager'],
      badge: 'ML_NET',
    },
    {
      name: 'AUDIT_LEDGER',
      path: '/audit-logs',
      icon: FileSpreadsheet,
      roles: ['Admin', 'Manager', 'User'],
    },
    {
      name: 'DATA_ANALYTICS',
      path: '/analytics',
      icon: BarChart3,
      roles: ['Admin', 'Manager', 'User'],
    },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 shrink-0 hidden md:flex flex-col min-h-[calc(100vh-65px)] font-mono">
      <div className="p-4 space-y-6 flex-1">
        {/* Role Badge Indicator */}
        <div className="p-3.5 bg-black border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#CCFF00] flex items-center justify-center text-black font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest">ACCESS_TIER</p>
            <p className="text-xs font-bold text-white tracking-wider">{user?.role || 'USER'} // ROOT</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-[#CCFF00]" /> SYSTEM_MODULES
          </p>
          <nav className="space-y-1">
            {navItems
              .filter((item) => item.roles.includes(user?.role || 'User'))
              .map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#CCFF00] text-black shadow-[3px_3px_0px_#FF007F] border border-black'
                          : 'text-zinc-400 hover:text-[#CCFF00] hover:bg-zinc-900 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className="text-[9px] px-1.5 py-0.2 font-mono font-bold bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]"
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 text-[10px] text-zinc-500 bg-black">
        <p className="font-bold text-[#CCFF00]">POLICY_ENGINE // ONLINE</p>
        <p className="text-zinc-600 mt-0.5">ENCRYPTED_SHA256_ACTIVE</p>
      </div>
    </aside>
  );
};

export default Sidebar;
