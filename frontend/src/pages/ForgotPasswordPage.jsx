import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useNotification } from '../context/NotificationContext';
import { Shield, Mail, ArrowLeft, Send, Zap } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      showSuccess(res.message, 'Reset Link Dispatched');
      setSent(true);
    } catch (err) {
      showError(err.message, 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden font-mono">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#CCFF00] text-black flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[4px_4px_0px_#FF007F]">
            <Zap className="w-8 h-8 fill-black" />
          </div>
          <h2 className="text-3xl font-clash text-white tracking-wider">RESET_SECRET_KEY</h2>
          <p className="text-[11px] text-[#CCFF00] mt-1 font-mono tracking-widest uppercase">
            [DISPATCH AUTH TOKEN RECOVERY]
          </p>
        </div>

        <div className="glass-panel p-8 space-y-6 border border-white/15 hover:border-[#CCFF00] transition-all">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 bg-[#CCFF00]/20 text-[#CCFF00] flex items-center justify-center mx-auto border border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                <Send className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-clash text-white">RECOVERY_DISPATCHED</h3>
              <p className="text-xs text-zinc-400 font-mono">
                DISPATCHED ACCESS OVERRIDE INSTRUCTIONS TO <span className="text-[#CCFF00] font-bold">{email}</span>.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#CCFF00] hover:underline pt-2 font-mono"
              >
                <ArrowLeft className="w-4 h-4" /> BACK_TO_LOGIN
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-2 font-mono">
                  OPERATOR_EMAIL
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@system.io"
                    className="w-full bg-black border border-white/20 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 btn-acid text-black text-xs font-black tracking-widest shadow-md flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <span>DISPATCHING_RECOVERY...</span>
                ) : (
                  <>
                    <span>TRANSMIT_RESET_VECTOR</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 font-mono">
                <Link to="/login" className="text-xs text-zinc-500 hover:text-white inline-flex items-center gap-1.5 font-bold">
                  <ArrowLeft className="w-3.5 h-3.5" /> CANCEL // RETURN
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
