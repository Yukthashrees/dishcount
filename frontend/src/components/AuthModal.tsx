import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon, CheckCircle, LogOut } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('dishcount_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('dishcount_jwt', data.token);
        const userObj = { name: data.user?.name || name || 'User', email: data.user?.email || email };
        localStorage.setItem('dishcount_user', JSON.stringify(userObj));
        setCurrentUser(userObj);
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      // Fallback demo login if backend is unreachable
      const userObj = { name: name || 'Yuktha Shree', email: email || 'demo@dishcount.com' };
      localStorage.setItem('dishcount_jwt', 'demo_jwt_token_2026');
      localStorage.setItem('dishcount_user', JSON.stringify(userObj));
      setCurrentUser(userObj);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@dishcount.com');
    setPassword('password123');
    const userObj = { name: 'Yuktha Shree', email: 'demo@dishcount.com' };
    localStorage.setItem('dishcount_jwt', 'demo_jwt_token_2026');
    localStorage.setItem('dishcount_user', JSON.stringify(userObj));
    setCurrentUser(userObj);
  };

  const handleLogout = () => {
    localStorage.removeItem('dishcount_jwt');
    localStorage.removeItem('dishcount_user');
    setCurrentUser(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-2xl bg-[#15100E] border border-[#C8A96B]/40 p-8 shadow-2xl overflow-hidden"
        >
          {/* Subtle Ambient Light */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#C8A96B]/10 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-1 text-[#8A7E76] hover:text-[#F4EBDD] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {currentUser ? (
            /* Authenticated User View */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#C8A96B]/20 border border-[#C8A96B] flex items-center justify-center mx-auto mb-4 text-[#C8A96B]">
                <UserIcon className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-sans tracking-[0.25em] text-[#C8A96B] uppercase block font-semibold mb-1">
                AUTHENTICATED MEMBER
              </span>
              <h3 className="font-serif text-2xl text-[#F4EBDD] uppercase font-light">
                {currentUser.name}
              </h3>
              <p className="text-xs text-[#8A7E76] font-light mt-1 mb-6">
                {currentUser.email}
              </p>

              <div className="p-4 rounded-xl bg-[#0D0B0A] border border-white/05 text-left text-xs space-y-2 mb-6">
                <div className="flex items-center gap-2 text-[#4F8A70]">
                  <CheckCircle className="w-4 h-4" />
                  <span>JWT Token Active (Stateless Session)</span>
                </div>
                <div className="text-[#8A7E76]">Role: <strong className="text-[#F4EBDD]">ROLE_USER</strong></div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-semibold uppercase tracking-wider hover:bg-red-900/60 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>SIGN OUT</span>
              </button>
            </div>
          ) : (
            /* Login / Register Form */
            <div>
              <div className="text-center mb-6">
                <span className="text-[10px] font-sans tracking-[0.25em] text-[#C8A96B] uppercase block font-semibold mb-1">
                  ROYAL DIGITAL DINING
                </span>
                <h3 className="font-serif text-2xl text-[#F4EBDD] uppercase font-light">
                  {isRegister ? 'JOIN DISHCOUNT' : 'MEMBER SIGN IN'}
                </h3>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-light">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                {isRegister && (
                  <div>
                    <label className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">FULL NAME</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 absolute left-3 top-3 text-[#8A7E76]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Yuktha Shree"
                        className="w-full bg-[#0D0B0A] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-[#F4EBDD] focus:border-[#C8A96B] outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#8A7E76]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="demo@dishcount.com"
                      className="w-full bg-[#0D0B0A] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-[#F4EBDD] focus:border-[#C8A96B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">PASSWORD</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-[#8A7E76]" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#0D0B0A] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-[#F4EBDD] focus:border-[#C8A96B] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-[#C8A96B] text-[#080706] text-xs font-semibold uppercase tracking-wider hover:bg-[#b59557] transition-colors shadow-lg mt-2"
                >
                  {loading ? 'AUTHENTICATING...' : isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'}
                </button>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                  <span className="relative bg-[#15100E] px-3 text-[10px] text-[#8A7E76] uppercase tracking-wider">OR</span>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 rounded-lg bg-[#0D0B0A] border border-[#C8A96B]/40 text-[#C8A96B] text-xs font-medium uppercase tracking-wider hover:bg-[#C8A96B]/10 transition-colors"
                >
                  ⚡ DEMO 1-CLICK LOGIN (Yuktha Shree)
                </button>
              </form>

              <div className="text-center mt-6 text-xs text-[#8A7E76]">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-[#C8A96B] underline uppercase tracking-wider font-semibold ml-1"
                >
                  {isRegister ? 'SIGN IN' : 'REGISTER'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
