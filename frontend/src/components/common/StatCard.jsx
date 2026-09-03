import React from 'react';

const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon }) => {
  return (
    <div className="glass-panel p-5 border border-white/10 hover:border-[#CCFF00] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-150">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">{title}</p>
        {Icon && (
          <div className="w-8 h-8 bg-zinc-900 border border-white/10 flex items-center justify-center text-[#CCFF00]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl md:text-4xl font-clash text-white tracking-tight font-black">{value}</h3>
        {change && (
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${
              changeType === 'positive'
                ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                : 'bg-[#FF007F]/15 text-[#FF007F] border-[#FF007F] shadow-[0_0_10px_rgba(255,0,127,0.3)]'
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
