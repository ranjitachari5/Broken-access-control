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
      return 'bg-red-500/10 text-red-400 border-red-500/30 glow-red';
    case 'MEDIUM':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'LOW':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
  }
};

export const getStatusBadgeStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'resolved':
    case 'success':
    case '200':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'investigating':
    case 'pending':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'flagged':
    case 'blocked':
    case '403':
    case '401':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    default:
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  }
};
