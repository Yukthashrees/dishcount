import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const OpeningExperience: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);

  const PLATFORMS_WITH_PRICES = [
    { name: 'MAGICPIN', logo: '🟣', price: '₹307', status: 'BEST DEAL', color: '#D800A6', best: true },
    { name: 'ZOMATO', logo: '🔴', price: '₹341', status: 'GOLD DEAL', color: '#E63946' },
    { name: 'SWISH', logo: '⚡', price: '₹351', status: '10M DISPATCH', color: '#9B51E0' },
    { name: 'FOODPANDA', logo: '🐼', price: '₹352', status: 'VOUCHER', color: '#FF2B85' },
    { name: 'EATSURE', logo: '🛡️', price: '₹356', status: 'ZERO FEE', color: '#2A9D8F' },
    { name: 'SWIGGY', logo: '🟠', price: '₹366', status: 'SWIGGY ONE', color: '#F4A261' },
    { name: 'UBER EATS', logo: '🖤', price: '₹369', status: 'STANDARD', color: '#10B981' }
  ];

  useEffect(() => {
    // Phase 1 -> Phase 2 (Pulsing wordmark -> Platform Orbit Reveal)
    const t1 = setTimeout(() => setPhase(2), 1800);

    // Phase 2 -> Phase 3 (Platform Orbit -> Gold Audit Bill Reveal)
    const t2 = setTimeout(() => setPhase(3), 4200);

    // Phase 3 -> Phase 4 (Auto Transition to App)
    const t3 = setTimeout(() => {
      setPhase(4);
      setTimeout(() => onComplete(), 700);
    }, 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="luxury-opening"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 4 ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-[#0A0807] text-[#F4EBDD] flex items-center justify-center overflow-hidden select-none"
    >
      {/* High-End Dark Culinary Atmosphere Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85"
          alt="Royal Dining Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-125 saturate-150 scale-105"
        />

        {/* Ambient Royal Gold Radial Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-radial from-[#C8A96B]/25 via-[#B86B4B]/10 to-transparent blur-3xl"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0807] via-[#0A0807]/70 to-[#0A0807]" />
      </div>

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60 z-10">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
              opacity: 0,
            }}
            animate={{
              y: -80,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#C8A96B] shadow-[0_0_12px_#C8A96B]"
          />
        ))}
      </div>

      {/* Top Right Direct Bypass / Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-8 right-8 z-50 px-5 py-2.5 rounded-full bg-[#15100E]/90 border border-[#C8A96B]/50 hover:bg-[#C8A96B] hover:text-[#080706] text-xs font-sans text-[#C8A96B] font-semibold uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center gap-2 group backdrop-blur-md"
      >
        <span>EXPLORE DISHCOUNT</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Main Stage Content */}
      <div className="relative z-20 w-full max-w-2xl px-6 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">

          {/* PHASE 1: LUXURY CREST & BRAND WORDMARK REVEAL */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#15100E] border-2 border-[#C8A96B] text-[#C8A96B] mx-auto flex items-center justify-center text-2xl shadow-[0_0_40px_rgba(200,169,107,0.4)]">
                ★
              </div>

              <span className="text-[10px] font-sans tracking-[0.35em] text-[#C8A96B] uppercase font-semibold block">
                ROYAL DINING INTELLIGENCE
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl font-light tracking-[0.25em] text-[#F4EBDD] uppercase">
                DISHCOUNT
              </h1>

              <p className="font-serif italic text-base sm:text-lg text-[#C8A96B]/90 font-light">
                The Art of True Food Price Comparison
              </p>
            </motion.div>
          )}

          {/* PHASE 2: SMOOTH FLOATING PLATFORM LOGOS & PRICES */}
          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="w-full space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#15100E] border border-[#C8A96B]/40 text-xs text-[#C8A96B] font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A96B]" />
                <span>SCANNING 7 FOOD DELIVERY PLATFORMS</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EBDD] font-light uppercase tracking-wide">
                COMPARING LIVE PAYABLE PRICES
              </h2>

              {/* Grid of Platform Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-xl mx-auto pt-2">
                {PLATFORMS_WITH_PRICES.map((p, idx) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                      p.best
                        ? 'bg-[#15100E] border-[#C8A96B] shadow-[0_0_25px_rgba(200,169,107,0.3)] ring-1 ring-[#C8A96B]/50'
                        : 'bg-[#0D0B0A] border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-base">{p.logo}</span>
                      <span className="text-[9px] font-sans tracking-wider text-[#8A7E76] uppercase font-semibold">{p.name}</span>
                    </div>

                    <div>
                      <span className={`font-sans text-lg font-bold block ${p.best ? 'text-[#C8A96B]' : 'text-[#F4EBDD]'}`}>
                        {p.price}
                      </span>
                      <span className={`text-[9px] font-sans font-semibold uppercase tracking-wider block ${p.best ? 'text-[#4F8A70]' : 'text-[#8A7E76]'}`}>
                        {p.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PHASE 3: GOLD-FRAMED SAVINGS AUDIT BILL REVEAL */}
          {phase === 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md bg-[#15100E] border-2 border-[#C8A96B] rounded-2xl p-8 shadow-[0_0_60px_rgba(200,169,107,0.3)] text-[#F4EBDD] relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8A96B]/20 border border-[#C8A96B] text-[#C8A96B] mx-auto flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-sans tracking-[0.25em] text-[#C8A96B] uppercase font-semibold block mb-1">
                REAL COST VERIFIED
              </span>

              <h2 className="font-serif text-3xl text-[#F4EBDD] uppercase font-light mb-4">
                CHICKEN DUM BIRYANI
              </h2>

              <div className="p-4 rounded-xl bg-[#0D0B0A] border border-white/05 space-y-2 text-xs font-sans mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#8A7E76]">Highest Rate (Swiggy):</span>
                  <span className="text-[#F4EBDD] font-semibold line-through">₹369</span>
                </div>
                <div className="flex justify-between items-center text-[#C8A96B]">
                  <span className="font-semibold">Best Rate (Magicpin):</span>
                  <span className="text-xl font-bold">₹307</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[#4F8A70] font-semibold uppercase tracking-wider">
                  <span>YOUR TOTAL SAVINGS:</span>
                  <span>SAVE ₹62 TONIGHT</span>
                </div>
              </div>

              <button
                onClick={onComplete}
                className="w-full py-3.5 rounded-xl bg-[#C8A96B] text-[#080706] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#b59557] transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>ENTER DISHCOUNT PLATFORM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};
