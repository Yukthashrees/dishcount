import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowDownRight, TrendingUp, X } from 'lucide-react';
import { audioFX } from '../utils/audio';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onExploreMoods: () => void;
}

export const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery, onExploreMoods }) => {
  const [isFocused, setIsFocused] = useState(false);

  const suggestedDishes = [
    '🔥 Truffle Pasta',
    '👑 Dum Biryani',
    '🍣 Sushi',
    '🥞 Pancakes',
    '🥩 Korean BBQ',
    '☕ Filter Coffee',
    '🍜 Ramen',
    '🍕 Pizza',
    '🥟 Momos',
    '🍰 Desserts'
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 sm:px-12 flex flex-col justify-between max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Soft Lighting & Parallax Visuals */}
      <div className="absolute top-20 right-10 w-[550px] h-[550px] rounded-full bg-[#E76F51]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-[#2A9D8F]/10 blur-3xl pointer-events-none" />

      {/* Top Tagline Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-between text-xs font-label uppercase tracking-widest text-zinc-400 border-b border-white/10 pb-4 mb-10"
      >
        <span className="flex items-center gap-2 text-[#E76F51] font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          DISCOVER RESTAURANTS. COMPARE EVERY OFFER.
        </span>
        <span className="hidden sm:inline text-zinc-500">
          7-PLATFORM REAL-TIME PRICE ENGINE
        </span>
      </motion.div>

      {/* Main Giant Serif Headline */}
      <div className="my-auto py-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-editorial-giant text-accent-ivory uppercase tracking-tighter">
            DISH<span className="text-[#E76F51] italic font-light">COUNT.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-editorial-sub text-zinc-300 font-light max-w-2xl leading-relaxed"
        >
          An haute digital discovery experience comparing live platform offers line-by-line across Swiggy, Zomato, EatSure, SWISH, Magicpin, Foodpanda, and Uber Eats.
        </motion.p>

        {/* ONE DOMINANT SEARCH INTERACTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 w-full max-w-3xl"
        >
          <div className={`relative transition-all duration-500 rounded-3xl ${
            isFocused 
              ? 'ring-2 ring-[#E76F51] shadow-[0_0_60px_rgba(231,111,81,0.3)] bg-charcoal-900' 
              : 'glass-editorial'
          }`}>
            <div className="flex items-center px-6 py-5">
              <Search className={`w-6 h-6 mr-4 transition-colors ${isFocused ? 'text-[#E76F51]' : 'text-zinc-500'}`} />
              
              <input
                type="text"
                value={searchQuery}
                onFocus={() => {
                  audioFX.playPop();
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, restaurants, cuisines, or neighborhoods..."
                className="w-full bg-transparent text-lg sm:text-2xl font-serif text-accent-ivory placeholder-zinc-500 focus:outline-none"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Animated Suggested Dish Chips */}
          <div className="flex items-center flex-wrap gap-2 mt-4">
            <span className="text-xs font-label text-zinc-500 uppercase tracking-wider mr-1">
              Popular:
            </span>
            {suggestedDishes.map((dish, idx) => {
              const cleanDish = dish.replace(/^[^a-zA-Z0-9]+/, '').trim();
              return (
                <button
                  key={idx}
                  onClick={() => {
                    audioFX.playPop();
                    setSearchQuery(cleanDish);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#E76F51]/20 border border-white/10 text-xs font-label text-zinc-300 hover:text-[#E76F51] transition-all"
                >
                  {dish}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-label text-zinc-400"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#2A9D8F]" />
          <span className="text-accent-ivory">MAX SAVINGS TONIGHT: ₹186 on Dum Biryani via Magicpin</span>
        </div>

        <button
          onClick={() => {
            audioFX.playPop();
            onExploreMoods();
          }}
          className="flex items-center gap-2 text-[#E76F51] hover:text-[#F4A261] transition-colors cursor-pointer"
        >
          <span>SPATIAL MENU BOOKLETS</span>
          <ArrowDownRight className="w-4 h-4" />
        </button>
      </motion.div>

    </section>
  );
};
