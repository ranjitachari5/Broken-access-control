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
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const isManager = user?.role === 'Manager' || isAdmin;

  const navItems = [
    {
      name: 'Admin Dashboard',
      path: '/admin-dashboard',
      icon: LayoutDashboard,
      roles: ['Admin'],
    },
    {
      name: 'User Dashboard',
      path: '/user-dashboard',
      icon: ShieldCheck,
      roles: ['Admin', 'Manager', 'User'],
    },
    {
      name: 'User Management',
      path: '/users',
      icon: Users,
      roles: ['Admin', 'Manager'],
      badge: 'RBAC/ABAC',
    },
    {
      name: 'Live API Monitoring',
      path: '/monitoring',
      icon: Activity,
      roles: ['Admin', 'Manager', 'User'],
      badge: 'LIVE',
    },
    {
      name: 'Threat Alerts',
      path: '/threats',
      icon: AlertOctagon,
      roles: ['Admin', 'Manager'],
      badge: 'AI Model',
    },
    {
      name: 'Audit Logs',
      path: '/audit-logs',
      icon: FileSpreadsheet,
      roles: ['Admin', 'Manager', 'User'],
    },
    {
      name: 'Analytics & Reports',
      path: '/analytics',
      icon: BarChart3,
      roles: ['Admin', 'Manager', 'User'],
    },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-white/10 shrink-0 hidden md:flex flex-col min-h-[calc(100vh-65px)]">
      <div className="p-4 space-y-6 flex-1">
        {/* Role Badge Indicator */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Lock className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Access Scope</p>
            <p className="text-xs font-bold text-white">{user?.role || 'User'} Level</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Core Modules</p>
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
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 glow-blue font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.badge === 'LIVE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}
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
      <div className="p-4 border-t border-white/10 text-[11px] text-slate-400">
        <p className="font-medium text-slate-400">Policy Authorization Engine</p>
        <p className="text-[10px] text-slate-400 mt-0.5">Frontend Dev: Chandan K N</p>
      </div>
    </aside>
  );
};

export default Sidebar;
