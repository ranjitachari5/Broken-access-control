export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const getRiskBadgeStyle = (riskLevel) => {
  switch (riskLevel?.toUpperCase()) {
    case 'HIGH':
    case 'CRITICAL':
      return 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F] shadow-[0_0_10px_rgba(255,0,127,0.4)] font-bold';
    case 'MEDIUM':
      return 'bg-amber-500/20 text-amber-400 border border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)] font-bold';
    case 'LOW':
      return 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.3)] font-bold';
    default:
      return 'bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold';
  }
};

export const getStatusBadgeStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'resolved':
    case 'success':
    case '200':
      return 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.3)] font-bold';
    case 'investigating':
    case 'pending':
      return 'bg-blue-500/20 text-blue-400 border border-blue-500 font-bold';
    case 'flagged':
    case 'blocked':
    case '403':
    case '401':
      return 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F] shadow-[0_0_10px_rgba(255,0,127,0.4)] font-bold';
    default:
      return 'bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold';
  }
};
