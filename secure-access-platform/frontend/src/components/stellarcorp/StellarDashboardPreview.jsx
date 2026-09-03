import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Calendar,
  Settings,
  Search,
  Mail,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const StellarDashboardPreview = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [scheduleView, setScheduleView] = useState('Weekly');

  // Recruitment Analytics Data matching mockup
  const recruitmentData = [
    { month: 'Jan', placed: 160, pipeline: 80 },
    { month: 'Feb', placed: 260, pipeline: 110 },
    { month: 'Mar', placed: 320, pipeline: 90 },
    { month: 'Apr', placed: 380, pipeline: 130 },
    { month: 'May', placed: 440, pipeline: 140 },
  ];

  // EdTech User Engagement Data matching mockup
  const edTechEngagementData = [
    { month: 'Jan', users: 4000 },
    { month: 'Feb', users: 8200 },
    { month: 'Mar', users: 7100 },
    { month: 'Apr', users: 9500 },
    { month: 'May', users: 12400 },
  ];

  // Calendar Schedule Data
  const scheduleSlots = [
    {
      day: 'Mon',
      events: [
        { time: '9:00 AM', title: 'Global Interview', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { time: '11:00 AM', title: 'EdTech Sync', color: 'bg-rose-100 text-rose-700 border-rose-200' },
        { time: '1:00 PM', title: 'Client Review', color: 'bg-slate-100 text-slate-700 border-slate-200' },
      ],
    },
    {
      day: 'Tue',
      events: [
        { time: '8:30 AM', title: 'Client Interview', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
        { time: '10:30 AM', title: 'Product Sync', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { time: '12:00 PM', title: 'Product Review', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { time: '3:00 PM', title: 'Product Sync', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      ],
    },
    {
      day: 'Wed',
      events: [
        { time: '9:00 AM', title: 'Internal Sync', color: 'bg-rose-100 text-rose-700 border-rose-200' },
        { time: '11:30 AM', title: 'Direct Sync', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      ],
    },
    {
      day: 'Thu',
      events: [
        { time: '9:00 AM', title: 'Talent Sync', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { time: '11:00 AM', title: 'Product Sync', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { time: '1:30 PM', title: 'Product Sync', color: 'bg-rose-100 text-rose-700 border-rose-200' },
        { time: '2:45 PM', title: 'Product Sync', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      ],
    },
    {
      day: 'Fri',
      events: [
        { time: '9:00 AM', title: 'Partner Sync', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { time: '1:00 PM', title: 'Team Reflection', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      ],
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-200/80 overflow-hidden text-slate-800 font-sans">
      {/* Dashboard App Top Bar */}
      <div className="bg-[#FAFBFD] border-b border-slate-200/80 px-6 py-3 flex items-center justify-between">
        {/* Left: Brand within preview */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-[#0B192C]">StellarCorp</span>
          </div>

          {/* Search box */}
          <div className="relative w-64 hidden sm:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              placeholder="Search talent, courses, analytics..."
              className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Header items */}
        <div className="flex items-center gap-4">
          <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 relative">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
              alt="Alex Morgan"
              className="w-7 h-7 rounded-full object-cover border border-emerald-500"
            />
            <div className="text-left hidden md:block">
              <span className="text-xs font-semibold text-slate-800 block leading-tight">Alex Morgan</span>
              <span className="text-[10px] text-slate-400 block leading-tight">VP Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Main Body Layout */}
      <div className="flex flex-col lg:flex-row min-h-[580px]">
        {/* Left Mini Sidebar */}
        <aside className="w-full lg:w-48 bg-[#FAFBFD] border-r border-slate-200/80 p-4 space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Candidates', icon: Users },
            { name: 'Analytics', icon: BarChart3 },
            { name: 'Schedule', icon: Calendar },
            { name: 'Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-[#0B192C] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Dashboard Workspace */}
        <div className="flex-1 p-6 space-y-6 bg-white overflow-x-auto">
          {/* Dashboard Header Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-[#0B192C] font-heading">Executive Overview</h2>
              <p className="text-xs text-slate-500">Cross-enterprise talent acquisition and learning management</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live System
              </span>
              <button className="px-3 py-1.5 rounded-lg bg-[#0B192C] text-white text-xs font-semibold flex items-center gap-1">
                <span>Main dashboard</span> <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Grid Layout: Calendar Schedule & Analytics Column */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left 7 Columns: Smart Scheduling Calendar */}
            <div className="xl:col-span-7 bg-[#FAFBFD] rounded-2xl p-4 border border-slate-200/70 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Smart Scheduling</h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-white rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600">
                    <span>{scheduleView}</span>
                    <ChevronDown className="w-3 h-3 ml-1 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <button className="p-1 rounded bg-white border border-slate-200 text-slate-500 hover:text-slate-800">
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded bg-white border border-slate-200 text-slate-500 hover:text-slate-800">
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 5-Day Weekly Grid View */}
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {scheduleSlots.map((col) => (
                  <div key={col.day} className="space-y-2">
                    <div className="font-semibold text-slate-500 py-1 border-b border-slate-200 text-[11px]">
                      {col.day}
                    </div>
                    <div className="space-y-2 min-h-[260px] bg-white/70 p-1.5 rounded-xl border border-slate-100">
                      {col.events.map((evt, idx) => (
                        <div
                          key={idx}
                          className={`p-1.5 rounded-lg border text-left shadow-xs transition-transform hover:scale-[1.02] cursor-pointer ${evt.color}`}
                        >
                          <span className="text-[9px] font-bold block">{evt.time}</span>
                          <span className="text-[10px] font-medium leading-tight line-clamp-1">{evt.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Verified Recruitment & EdTech Analytics */}
            <div className="xl:col-span-5 space-y-4">
              {/* Verified Recruitment Analytics */}
              <div className="bg-[#FAFBFD] rounded-2xl p-4 border border-slate-200/70">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Verified Recruitment Analytics
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 mb-2 border-b border-slate-200/60 text-center">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Placed</span>
                    <span className="text-sm font-extrabold text-[#0B192C]">148</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Velocity</span>
                    <span className="text-sm font-extrabold text-emerald-600">24 days</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Satisfaction</span>
                    <span className="text-sm font-extrabold text-[#0B192C]">94%</span>
                  </div>
                </div>

                {/* Bar chart matching mockup */}
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={recruitmentData}>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0B192C',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '11px',
                        }}
                      />
                      <Bar dataKey="placed" fill="#10B981" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="pipeline" fill="#0B192C" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* EdTech Performance Analytics */}
              <div className="bg-[#FAFBFD] rounded-2xl p-4 border border-slate-200/70">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    EdTech Performance
                  </h3>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    +18.4%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2 text-center">
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Courses Completed</span>
                    <span className="text-sm font-extrabold text-[#0B192C]">12k+</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Completion Rate</span>
                    <span className="text-sm font-extrabold text-emerald-600">89%</span>
                  </div>
                </div>

                {/* Area chart matching mockup */}
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={edTechEngagementData}>
                      <defs>
                        <linearGradient id="edTechGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0B192C',
                          color: '#fff',
                          borderRadius: '8px',
                          fontSize: '11px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#10B981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#edTechGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StellarDashboardPreview;
