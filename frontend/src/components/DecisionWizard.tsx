import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

export const DecisionWizard: React.FC<{ onCompareDish: (dishName: string) => void }> = ({ onCompareDish }) => {
  const [step, setStep] = useState(1);
  const [craving, setCraving] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);

  const CRAVINGS = ['SPICY', 'COMFORT', 'HEALTHY', 'CRISPY', 'SWEET', 'ADVENTUROUS'];
  const BUDGETS = ['₹200', '₹400', '₹600', '₹1000+'];
  const MOODS = ['SOLO', 'DATE', 'FRIENDS', 'FAMILY'];

  const resetWizard = () => {
    setStep(1);
    setCraving(null);
    setBudget(null);
    setMood(null);
  };

  return (
    <section className="py-20 px-6 sm:px-12 max-w-4xl mx-auto">
      <div className="bg-[#15100E] border border-[#C8A96B]/30 rounded-2xl p-10 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
        
        {/* Background Subtle Food Ambiance Image */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85"
            alt="Culinary Ambiance"
            className="w-full h-full object-cover filter saturate-150 brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15100E] via-[#15100E]/70 to-[#15100E]" />
        </div>

        <div className="relative z-10">
          <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-2">
            ROYAL DECISION ASSISTANT
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F4EBDD] uppercase tracking-wide mb-8">
            NOT SURE WHAT TO ORDER?
          </h2>

          {/* STEP 1: CRAVING */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <p className="text-xs font-sans tracking-widest text-[#C8A96B] uppercase font-semibold">
                STEP 1 OF 3: WHAT ARE YOU CRAVING?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {CRAVINGS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCraving(c);
                      setStep(2);
                    }}
                    className="px-6 py-3.5 rounded-lg bg-[#080706]/90 border border-[#C8A96B]/30 text-xs font-sans tracking-widest text-[#F4EBDD] hover:border-[#C8A96B] hover:text-[#C8A96B] hover:bg-[#15100E] transition-all uppercase shadow-lg"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: BUDGET */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <p className="text-xs font-sans tracking-widest text-[#C8A96B] uppercase font-semibold">
                STEP 2 OF 3: WHAT IS YOUR BUDGET?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setBudget(b);
                      setStep(3);
                    }}
                    className="px-6 py-3.5 rounded-lg bg-[#080706]/90 border border-[#C8A96B]/30 text-xs font-sans tracking-widest text-[#F4EBDD] hover:border-[#C8A96B] hover:text-[#C8A96B] hover:bg-[#15100E] transition-all uppercase shadow-lg"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: MOOD */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <p className="text-xs font-sans tracking-widest text-[#C8A96B] uppercase font-semibold">
                STEP 3 OF 3: WHAT IS THE OCCASION / MOOD?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMood(m);
                      setStep(4);
                    }}
                    className="px-6 py-3.5 rounded-lg bg-[#080706]/90 border border-[#C8A96B]/30 text-xs font-sans tracking-widest text-[#F4EBDD] hover:border-[#C8A96B] hover:text-[#C8A96B] hover:bg-[#15100E] transition-all uppercase shadow-lg"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: YOUR MATCH */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="p-8 rounded-xl bg-[#080706]/90 border border-[#C8A96B]/40 text-center shadow-2xl relative overflow-hidden">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border border-[#C8A96B]">
                  <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80" alt="Match" className="w-full h-full object-cover" />
                </div>
                
                <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-1">
                  ROYAL MATCH FOUND
                </span>
                <h3 className="font-serif text-3xl font-light text-[#F4EBDD] uppercase tracking-wider mb-2">
                  CHEESY TRUFFLE PIZZA
                </h3>
                <p className="text-xs font-sans text-[#F4EBDD]/70 mb-6">
                  Matched for {craving} • {budget} • {mood}
                </p>

                <div className="inline-flex items-center gap-6 px-6 py-3 rounded-lg bg-[#15100E] border border-[#C8A96B]/30 text-xs font-sans shadow-lg">
                  <span className="text-[#F4EBDD]/80 uppercase tracking-widest">BEST FINAL PRICE: <strong className="text-[#C8A96B]">₹389</strong></span>
                  <span className="text-[#4F8A70] uppercase font-semibold tracking-widest">SAVE ₹96</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => onCompareDish('Cheesy Truffle Pizza')}
                  className="px-6 py-3 rounded bg-[#C8A96B] text-[#080706] font-sans text-xs font-semibold uppercase tracking-wider hover:bg-[#b59557] transition-colors flex items-center gap-2 shadow-lg"
                >
                  <span>SEE FULL COMPARISON</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={resetWizard}
                  className="p-3 rounded bg-[#080706] text-[#C8A96B] hover:text-[#F4EBDD] border border-[#C8A96B]/30"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
