import React from 'react';
import { getRiskBadgeStyle, getStatusBadgeStyle } from '../../utils/formatters';

export const Badge = ({ children, type = 'status', variant }) => {
  let styleClass = '';
  if (type === 'risk') {
    styleClass = getRiskBadgeStyle(variant || children);
  } else {
    styleClass = getStatusBadgeStyle(variant || children);
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styleClass}`}>
      {children}
    </span>
  );
};

export default Badge;
