import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Shield, User, Mail, Lock, Building, ArrowRight, Zap } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Offensive Security',
    location: 'Bangalore, IN',
    role: 'User',
  });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      showSuccess('Account registered successfully! You can now log in.', 'User Created');
      navigate('/login');
    } catch (err) {
      showError(err.message || 'Registration failed', 'Error');
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
          <h2 className="text-3xl font-clash text-white tracking-wider">INITIALIZE_OPERATOR</h2>
          <p className="text-[11px] text-[#CCFF00] mt-1 font-mono tracking-widest uppercase">
            [CREATE CREDENTIAL SCOPE]
          </p>
        </div>

        <div className="glass-panel p-8 space-y-5 border border-white/15 hover:border-[#CCFF00] transition-all">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5">
                OPERATOR_NAME
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Chandan K N"
                  className="w-full bg-black border border-white/20 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5">
                OPERATOR_EMAIL
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="chandan@cyber.io"
                  className="w-full bg-black border border-white/20 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5">
                SECRET_KEY
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-black border border-white/20 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5">
                  DEPT_CLUSTER
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-black border border-white/20 pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-1.5">
                  TARGET_TIER
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-black border border-white/20 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 btn-acid text-black text-xs font-black tracking-widest shadow-md flex items-center justify-center gap-2 transition-all mt-4"
            >
              {loading ? (
                <span>REGISTERING_IDENTITY...</span>
              ) : (
                <>
                  <span>CONFIRM_OPERATOR</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">
          ALREADY ENROLLED?{' '}
          <Link to="/login" className="text-[#CCFF00] hover:underline font-bold">
            SIGN_IN_HERE
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
