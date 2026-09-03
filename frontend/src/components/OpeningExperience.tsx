import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CeramicPlate } from './CeramicPlate';

export const OpeningExperience: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [billStep, setBillStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const PLATFORMS_WITH_PRICES = [
    { name: 'SWIGGY', logo: '🟠', price: '₹366', color: '#F4A261' },
    { name: 'ZOMATO', logo: '🔴', price: '₹341', color: '#E63946' },
    { name: 'EATSURE', logo: '🛡️', price: '₹356', color: '#2A9D8F' },
    { name: 'SWISH', logo: '⚡', price: '₹351', color: '#9B51E0' },
    { name: 'MAGICPIN', logo: '🟣', price: '₹307', color: '#D800A6', best: true },
    { name: 'FOODPANDA', logo: '🐼', price: '₹352', color: '#FF2B85' },
    { name: 'UBER EATS', logo: '🖤', price: '₹369', color: '#10B981' }
  ];

  useEffect(() => {
    // Stage 1 -> Stage 2 (Plate illuminates & rotates)
    const t1 = setTimeout(() => setPhase(2), 1000);

    // Stage 2 -> Stage 3 (Plate recedes, Bill appears & unrolls)
    const t2 = setTimeout(() => setPhase(3), 2800);

    // Stage 3 -> Stage 4 (Bill printing text sequence)
    const t3 = setTimeout(() => setPhase(4), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Text Print Sequence on Bill (Phase 4)
  useEffect(() => {
    if (phase === 4) {
      const s1 = setTimeout(() => setBillStep(2), 1600); 
      const s2 = setTimeout(() => setBillStep(3), 2000); 
      const s3 = setTimeout(() => setBillStep(4), 3800);
      const s4 = setTimeout(() => setBillStep(5), 5400);

      // Phase 5: Bill rolls back up & transforms into website
      const s5 = setTimeout(() => {
        setPhase(5);
        setTimeout(() => onComplete(), 800);
      }, 7200);

      return () => {
        clearTimeout(s1);
        clearTimeout(s2);
        clearTimeout(s3);
        clearTimeout(s4);
        clearTimeout(s5);
      };
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      key="royal-opening"
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === 5 ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#120E0C] text-[#F4EBDD] flex items-center justify-center overflow-hidden select-none"
    >
      {/* High-End Warm Culinary Ambiance Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85"
          alt="Royal Dining Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.35] contrast-125 saturate-150 scale-105"
        />
        
        {/* Animated Royal Imperial Gold Radial Aura */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.75, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-radial from-[#D4AF37]/35 via-[#E63946]/15 to-transparent blur-3xl"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/80 to-[#120E0C]" />
      </div>

      {/* Top Right Direct Bypass / Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-8 right-8 z-50 text-[10px] tracking-[0.25em] font-sans text-[#D4AF37] uppercase border-2 border-[#D4AF37] px-5 py-2.5 rounded-lg bg-[#1A1412]/90 backdrop-blur-md hover:bg-[#D4AF37] hover:text-[#080706] transition-all shadow-[0_0_25px_rgba(212,175,55,0.5)] font-bold"
      >
        ENTER DISHCOUNT →
      </button>

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70 z-10">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
              opacity: 0,
            }}
            animate={{
              y: -60,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]"
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-lg px-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">

          {/* PHASE 1 & 2: CERAMIC PLATE REVEAL & ROTATION */}
          {(phase === 1 || phase === 2) && (
            <motion.div
              key="stage-plate"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{
                opacity: 1,
                scale: phase === 2 ? 1 : 0.95,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.7, y: -40 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <CeramicPlate isRotating={true} />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 2 ? 1 : 0.4 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif italic text-lg tracking-widest text-[#D4AF37] mt-3 drop-shadow-[0_2px_15px_rgba(212,175,55,0.7)]"
              >
                The Art of Dining Intelligence
              </motion.p>
            </motion.div>
          )}

          {/* PHASE 3 & 4: RESTAURANT BILL UNROLLS & PRINTS */}
          {(phase === 3 || phase === 4) && (
            <motion.div
              key="stage-bill"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="w-full max-w-md bg-gradient-to-b from-[#1E1714] via-[#241B18] to-[#1E1714] receipt-zigzag-bottom p-8 shadow-[0_25px_90px_rgba(212,175,55,0.35)] overflow-hidden border-[3px] border-[#D4AF37] text-[#F4EBDD] font-sans flex flex-col items-center min-h-[440px] justify-between relative rounded-t-2xl backdrop-blur-2xl"
            >
              {/* Shimmering Gold Reflection Beam */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />

              {/* Royal Gold Wax Seal Header */}
              <div className="w-full border-b-2 border-[#D4AF37] pb-4 mb-4 text-center relative">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#080706] mx-auto flex items-center justify-center font-bold text-lg mb-2 shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                  ★
                </div>
                <div className="text-xs font-sans tracking-[0.35em] uppercase text-[#D4AF37] font-bold drop-shadow-[0_2px_10px_rgba(212,175,55,0.6)]">
                  RESTAURANT AUDIT REPORT
                </div>
                <div className="text-[10px] font-sans tracking-widest text-[#F4EBDD] uppercase mt-1 font-semibold">
                  VERIFIED REAL-TIME PRICE COMPARISON
                </div>
              </div>

              {/* Dynamic Content Printed Line-by-Line */}
              <div className="w-full flex-1 flex flex-col items-center justify-center my-4 min-h-[220px]">
                
                {/* Step 1: DINING INTELLIGENCE & 7 Platforms List with Prices & Logos */}
                {phase === 4 && billStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full space-y-2 text-center"
                  >
                    <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37] mb-3 drop-shadow">
                      DINING INTELLIGENCE AUDIT
                    </p>
                    <div className="space-y-1.5 border-2 border-[#D4AF37]/40 p-3 bg-[#0F0C0A]/90 rounded-xl shadow-inner text-xs">
                      {PLATFORMS_WITH_PRICES.map(p => (
                        <div 
                          key={p.name} 
                          className={`flex items-center justify-between px-3 py-1.5 rounded border transition-all ${
                            p.best 
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                              : 'bg-[#1A1412] border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{p.logo}</span>
                            <span className="font-sans font-bold text-left tracking-wider text-xs text-[#F4EBDD]">
                              {p.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`font-sans font-bold ${p.best ? 'text-[#D4AF37]' : 'text-[#F4EBDD]'}`}>
                              {p.price}
                            </span>
                            {p.best && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#080706] uppercase">
                                BEST
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: "ONE MEAL. MANY PRICES." */}
                {phase === 4 && billStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-4 space-y-3"
                  >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#E63946]/20 border border-[#E63946]/40 text-xs font-bold text-[#E63946] uppercase tracking-widest">
                      <span className="line-through opacity-70">₹486</span>
                      <span>→</span>
                      <span className="text-[#D4AF37] text-sm">₹307 CHEAPEST</span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-[#F4EBDD] font-light tracking-wide drop-shadow-md">
                      ONE MEAL.
                    </h3>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#D4AF37] font-bold tracking-wide drop-shadow-[0_2px_20px_rgba(212,175,55,0.7)]">
                      MANY PRICES.
                    </h3>
                  </motion.div>
                )}

                {/* Step 4: "COMPARE THE REAL COST." */}
                {phase === 4 && billStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-4 space-y-2"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] mx-auto flex items-center justify-center font-bold text-xl mb-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      ✓
                    </div>
                    <p className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-bold drop-shadow">
                      REAL COST VERIFICATION
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EBDD] font-normal tracking-widest uppercase drop-shadow-lg">
                      COMPARE THE REAL COST.
                    </h3>
                  </motion.div>
                )}

                {/* Step 5: Large Embossed DISHCOUNT Wordmark */}
                {phase === 4 && billStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center py-6"
                  >
                    <div className="text-2xl text-[#D4AF37] mb-1">👑</div>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#D4AF37] tracking-[0.25em] font-semibold uppercase drop-shadow-[0_4px_25px_rgba(212,175,55,0.6)]">
                      DISHCOUNT
                    </h1>
                    <div className="w-20 h-[3px] bg-[#D4AF37] mx-auto mt-3 rounded-full shadow-[0_0_12px_#D4AF37]" />
                  </motion.div>
                )}

              </div>

              {/* Gold Metallic Bottom Seal */}
              <div className="w-full border-t-2 border-[#D4AF37] pt-3 text-center text-[10px] text-[#D4AF37] tracking-[0.25em] uppercase font-bold">
                AUTHENTICATED DISHCOUNT REPORT
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};
