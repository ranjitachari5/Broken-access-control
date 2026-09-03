import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Shield, Lock, Mail, ArrowRight, Eye, EyeOff, KeyRound } from 'lucide-react';

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

  const handleQuickDemo = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('demoPass123');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20 border border-blue-400/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">SACP Authorization Platform</h2>
          <p className="text-xs text-slate-400 mt-1.5">Centralized Policy-Driven API Access Control Framework</p>
        </div>

        {/* Login Form Panel */}
        <div className="glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" /> Sign In to Portal
            </h3>
            <p className="text-xs text-slate-400 mt-1">Enter your credentials to validate JWT bearer token.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.io"
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating JWT...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Verify Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials selector */}
          <div className="border-t border-white/10 pt-4 space-y-2">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Quick Demo Profiles:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('chandan@secure.io', 'Admin')}
                className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-300 font-bold hover:bg-blue-500/20 text-center"
              >
                Admin (Chandan)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('ranjith@secure.io', 'Manager')}
                className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[10px] text-purple-300 font-bold hover:bg-purple-500/20 text-center"
              >
                Manager (Ranjith)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('nandan@secure.io', 'User')}
                className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 font-bold hover:bg-emerald-500/20 text-center"
              >
                User (Nandan)
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an access account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4">
            Register Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
