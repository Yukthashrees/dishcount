import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onExecuteSearch: (q: string) => void;
  location: string;
  onChangeLocation: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onExecuteSearch,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const POPULAR_SUGGESTIONS = [
    'Chicken Dum Biryani',
    'Kathi Rolls & Wraps',
    'Paneer Tikka Roll',
    'Cheesy Truffle Pizza',
    'Smash Gourmet Burger',
    'Butter Chicken & Naan',
    'Crispy Masala Dosa',
    'Steamed Momos & Dim Sum',
    'Single Origin Cold Brew',
    'Meghana Foods',
    'Empire Restaurant',
    'Truffles',
    'Nagarjuna Restaurant',
    'Toit Brewpub'
  ];

  const q = searchQuery.trim();
  
  // Build dynamic suggestions list
  let filteredSuggestions = q
    ? POPULAR_SUGGESTIONS.filter(s => s.toLowerCase().includes(q.toLowerCase()))
    : POPULAR_SUGGESTIONS.slice(0, 6);

  // If user typed something custom (e.g. "rolls") that isn't in popular list, add their custom term to top
  if (q && !filteredSuggestions.some(s => s.toLowerCase() === q.toLowerCase())) {
    filteredSuggestions = [`${q.charAt(0).toUpperCase() + q.slice(1)}`, ...filteredSuggestions];
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onExecuteSearch(searchQuery.trim());
      setIsFocused(false);
    }
  };

  return (
    <section id="hero-section" className="relative pt-36 pb-28 px-6 sm:px-12 max-w-5xl mx-auto text-center flex flex-col items-center overflow-hidden rounded-3xl my-6 border border-[#C8A96B]/20 shadow-[0_20px_80px_rgba(0,0,0,0.95)]">
      
      {/* Background High-End Culinary Photography with Royal Glow Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85"
          alt="Royal Dining Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.35] contrast-125 saturate-150 scale-105"
        />
        
        {/* Colorful Posh & Royal Radial Glow Bursts */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-radial from-[#C8A96B]/20 via-[#B86B4B]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] rounded-full bg-[#4F8A70]/15 blur-3xl" />
        <div className="absolute top-10 left-10 w-[350px] h-[350px] rounded-full bg-[#E63946]/10 blur-3xl" />

        {/* Gradient Vignette Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/75 to-[#080706]/90" />
      </div>

      {/* Royal Crown Crest Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#15100E]/90 border border-[#C8A96B]/40 mb-6 shadow-xl backdrop-blur-md"
      >
        <span className="text-[#C8A96B] font-serif text-sm">★</span>
        <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase font-semibold">
          ROYAL DINING INTELLIGENCE
        </span>
      </motion.div>

      {/* Main High-Contrast Editorial Serif Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 space-y-4 mb-8"
      >
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-[#F4EBDD] tracking-tight leading-[0.95] uppercase drop-shadow-xl">
          WHAT WILL YOU<br />
          <span className="font-normal italic text-[#C8A96B] drop-shadow-[0_4px_20px_rgba(200,169,107,0.4)]">ACTUALLY PAY?</span>
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#F4EBDD]/80 font-light max-w-xl mx-auto tracking-wide">
          Compare the real final price of your favourite food across platforms.
        </p>
      </motion.div>

      {/* Dominant Luxury Object Search Interaction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-30"
      >
        <form onSubmit={handleSubmit}>
          <div className={`relative transition-all duration-500 rounded-xl bg-[#15100E]/90 backdrop-blur-2xl border px-6 py-5 flex items-center shadow-2xl ${
            isFocused 
              ? 'border-[#C8A96B] shadow-[0_0_50px_rgba(200,169,107,0.3)] bg-[#1B1512]' 
              : 'border-[#C8A96B]/40 hover:border-[#C8A96B]/70'
          }`}>
            <Search className={`w-5 h-5 mr-4 transition-colors ${isFocused ? 'text-[#C8A96B]' : 'text-[#C8A96B]/70'}`} />
            
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any dish or restaurant (e.g., Rolls, Burgers, Empire, Dosa)..."
              className="w-full bg-transparent text-lg sm:text-xl font-serif font-light text-[#F4EBDD] placeholder-[#8A7E76] focus:outline-none tracking-wide"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#8A7E76] hover:text-[#F4EBDD]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {/* Floating Suggestions Overlay */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-[#15100E] border border-[#C8A96B]/40 shadow-2xl overflow-hidden z-40 text-left backdrop-blur-2xl"
            >
              <div className="p-3 text-[10px] tracking-[0.2em] uppercase font-sans text-[#C8A96B] border-b border-white/05 font-semibold flex items-center justify-between">
                <span>CURATED SUGGESTIONS</span>
                <span className="text-[#8A7E76] text-[9px]">PRESS ENTER TO SEARCH</span>
              </div>
              <div className="py-2 max-h-60 overflow-y-auto">
                {filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(item);
                      onExecuteSearch(item);
                      setIsFocused(false);
                    }}
                    className="w-full px-5 py-3 text-left font-serif text-base text-[#F4EBDD]/90 hover:text-[#C8A96B] hover:bg-[#1B1512] transition-colors flex items-center justify-between group"
                  >
                    <span>{item}</span>
                    <span className="text-[10px] font-sans tracking-widest text-[#C8A96B] uppercase font-semibold group-hover:translate-x-1 transition-transform">COMPARE →</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </section>
  );
};
