import React, { createContext, useContext, useState } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', title = '') => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, title };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        showSuccess: (msg, title) => addToast(msg, 'success', title || 'Success'),
        showError: (msg, title) => addToast(msg, 'error', title || 'Security Alert'),
        showWarning: (msg, title) => addToast(msg, 'warning', title || 'Warning'),
        showInfo: (msg, title) => addToast(msg, 'info', title || 'Notice'),
      }}
    >
      {children}

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`glass-panel rounded-xl p-4 shadow-2xl border flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${
              toast.type === 'error'
                ? 'border-red-500/50 bg-red-950/40 text-red-200'
                : toast.type === 'success'
                ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
                : toast.type === 'warning'
                ? 'border-amber-500/50 bg-amber-950/40 text-amber-200'
                : 'border-blue-500/50 bg-slate-900/90 text-blue-200'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-400" />}
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
              <p className="text-xs mt-1 text-slate-300 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
