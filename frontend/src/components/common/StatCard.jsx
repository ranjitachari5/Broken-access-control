import React from 'react';

const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon, glowColor = 'blue' }) => {
  const glowClasses = {
    blue: 'border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-500/10',
    red: 'border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    amber: 'border-amber-500/30 hover:border-amber-500/50 hover:shadow-amber-500/10',
    purple: 'border-purple-500/30 hover:border-purple-500/50 hover:shadow-purple-500/10',
  };

  const iconBgClasses = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className={`glass-panel p-5 rounded-2xl border transition-all duration-300 shadow-xl ${glowClasses[glowColor]}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${iconBgClasses[glowColor]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{value}</h3>
        {change && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === 'positive'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
