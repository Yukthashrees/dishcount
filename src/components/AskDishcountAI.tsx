import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';

export const AskDishcountAI: React.FC<{ onCompareDish: (dishName: string) => void }> = ({ onCompareDish }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleRunQuery = async (userText: string) => {
    setQuery(userText);
    setIsThinking(true);
    const data = await apiService.aiRecommend(userText);
    setAiResult(data);
    setIsThinking(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 px-6 py-3 rounded-full bg-[#15100E] border border-[#C8A96B]/40 text-[#C8A96B] font-sans text-xs font-semibold tracking-widest uppercase shadow-2xl hover:bg-[#C8A96B] hover:text-[#080706] transition-all"
      >
        ★ ASK DISHCOUNT
      </button>

      {/* Dark Full-Screen AI Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#080706]/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl text-center text-[#F4EBDD]"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 p-2 text-[#8A7E76] hover:text-[#F4EBDD]"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Glowing Circular AI Core */}
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-radial from-[#C8A96B] via-[#B86B4B]/40 to-transparent flex items-center justify-center shadow-[0_0_80px_rgba(200,169,107,0.3)] animate-pulse">
                <div className="w-12 h-12 rounded-full border border-[#C8A96B]/60" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-light uppercase tracking-wider mb-8">
                WHAT ARE YOU LOOKING FOR?
              </h2>

              {/* Natural Language Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (query.trim()) handleRunQuery(query);
                }}
                className="mb-8"
              >
                <div className="relative flex items-center rounded-lg bg-[#15100E] border border-[#C8A96B]/30 px-6 py-4">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find me the cheapest biryani near me..."
                    className="w-full bg-transparent font-serif text-lg text-[#F4EBDD] placeholder-[#8A7E76] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-[#C8A96B] text-[#080706] text-xs font-semibold uppercase tracking-wider hover:bg-[#b59557] transition-colors"
                  >
                    SEARCH
                  </button>
                </div>
              </form>

              {/* Thinking State */}
              {isThinking && (
                <div className="text-xs font-sans tracking-widest text-[#8A7E76] uppercase animate-pulse">
                  CONVERTING INTENT INTO STRUCTURED PLATFORM FILTERS...
                </div>
              )}

              {/* Structured Output Result */}
              {aiResult && !isThinking && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
                  <div className="p-6 rounded bg-[#15100E] border border-white/10 font-sans text-xs space-y-3">
                    <span className="text-[10px] tracking-[0.25em] text-[#C8A96B] block uppercase font-semibold">STRUCTURED FILTERS</span>
                    <div className="grid grid-cols-3 gap-4 text-[#8A7E76]">
                      <div>DISH: <strong className="text-[#F4EBDD]">Biryani</strong></div>
                      <div>LOCATION: <strong className="text-[#F4EBDD]">Nearby</strong></div>
                      <div>PRIORITY: <strong className="text-[#F4EBDD]">Lowest Price</strong></div>
                    </div>
                  </div>

                  <div className="p-6 rounded bg-[#15100E] border border-[#C8A96B]/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] font-sans text-[#4F8A70] uppercase font-semibold block">BEST MATCH</span>
                      <h4 className="font-serif text-2xl font-light text-[#F4EBDD] uppercase">{aiResult.recommendedDish.name}</h4>
                      <p className="text-xs font-sans text-[#8A7E76] mt-1">₹{aiResult.finalPrice} on {aiResult.cheapestPlatform}</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onCompareDish(aiResult.recommendedDish.name);
                      }}
                      className="px-5 py-2.5 rounded bg-[#C8A96B] text-[#080706] font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>COMPARE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
