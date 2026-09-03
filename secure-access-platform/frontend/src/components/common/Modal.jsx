import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150 font-mono">
      <div className={`glass-panel border-2 border-[#CCFF00] w-full ${maxWidth} overflow-hidden shadow-[0_0_40px_rgba(204,255,0,0.35)] animate-in zoom-in-95 duration-150`}>
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-white/10 flex items-center justify-between bg-black">
          <h3 className="text-base font-clash text-white tracking-wide">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-black hover:bg-[#CCFF00] hover:border-[#CCFF00] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto bg-black/80">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
