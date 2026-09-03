import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound, Zap } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('chandan@secure.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      showSuccess(`Welcome back, ${data.user.name}!`, 'JWT Authenticated');
      if (data.user.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      showError(err.message || 'Login authentication failed', 'Access Control Interception');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('demoPass123');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* Background Cyber Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF007F]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#CCFF00] text-black flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[4px_4px_0px_#FF007F]">
            <Zap className="w-8 h-8 fill-black" />
          </div>
          <h2 className="text-3xl font-clash text-white tracking-wider">SACP // PORTAL</h2>
          <p className="text-[11px] text-[#CCFF00] mt-1 font-mono tracking-widest uppercase">
            [POLICY_ENGINE // ZERO_TRUST_SYS]
          </p>
        </div>

        {/* Login Form Panel */}
        <div className="glass-panel p-8 space-y-6 border border-white/15 hover:border-[#CCFF00] transition-all">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-clash text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#CCFF00]" /> SYSTEM_LOGIN
            </h3>
            <p className="text-xs text-zinc-400 mt-1">SUBMIT AUTHORIZATION TO RECEIVE BEARER TOKEN.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5">
                IDENTIFIER // EMAIL
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
                  SECRET_KEY
                </label>
                <Link to="/forgot-password" className="text-xs text-[#FF007F] hover:underline font-bold">
                  RESET?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black border border-white/20 pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] focus:shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 btn-acid text-black text-xs font-black tracking-widest shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>VALIDATING_JWT...</span>
                </>
              ) : (
                <>
                  <span>AUTHENTICATE // VERIFY</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials selector */}
          <div className="border-t border-white/10 pt-4 space-y-2">
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#CCFF00]" /> PRE-LOADED_OPERATOR_TEST:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('chandan@secure.io')}
                className="p-2 bg-zinc-900 border border-white/15 text-[10px] text-white font-bold hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors text-center"
              >
                ADMIN
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('ranjith@secure.io')}
                className="p-2 bg-zinc-900 border border-white/15 text-[10px] text-white font-bold hover:border-[#FF007F] hover:text-[#FF007F] transition-colors text-center"
              >
                MANAGER
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('nandan@secure.io')}
                className="p-2 bg-zinc-900 border border-white/15 text-[10px] text-white font-bold hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors text-center"
              >
                USER
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          UNREGISTERED ACCESS VECTOR?{' '}
          <Link to="/register" className="text-[#CCFF00] hover:underline font-bold">
            REQUEST_CREDENTIALS
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
