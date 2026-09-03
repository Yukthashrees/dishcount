import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MoodLineSpectrum: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const MOODS = [
    {
      id: 'quiet',
      label: 'QUIET',
      subtext: 'slow coffee / artisanal bake / morning light',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1600&q=85',
      royalColor: '#C8A96B', // Imperial Gold
      accentGlow: 'rgba(200, 169, 107, 0.4)',
    },
    {
      id: 'cozy',
      label: 'COZY',
      subtext: 'warm ramen bowl / comfort food / rain',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1600&q=85',
      royalColor: '#B86B4B', // Warm Copper
      accentGlow: 'rgba(184, 107, 75, 0.4)',
    },
    {
      id: 'social',
      label: 'SOCIAL',
      subtext: 'artisanal pizza / friends / shared feast',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85',
      royalColor: '#E63946', // Ruby Crimson
      accentGlow: 'rgba(230, 57, 70, 0.4)',
    },
    {
      id: 'romantic',
      label: 'ROMANTIC',
      subtext: 'candlelight dinner / fine wine / intimate',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
      royalColor: '#9B51E0', // Royal Amethyst
      accentGlow: 'rgba(155, 81, 224, 0.4)',
    },
    {
      id: 'celebrate',
      label: 'CELEBRATE',
      subtext: 'royal fine dining / champagne / luxury',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85',
      royalColor: '#4F8A70', // Deep Emerald
      accentGlow: 'rgba(79, 138, 112, 0.4)',
    },
    {
      id: 'latenight',
      label: 'LATE NIGHT',
      subtext: 'saffron biryani / post-midnight feast',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=85',
      royalColor: '#D4AF37', // Royal Gold
      accentGlow: 'rgba(212, 175, 55, 0.4)',
    }
  ];

  const activeMood = hoveredIdx !== null ? MOODS[hoveredIdx] : MOODS[2];

  return (
    <section id="discover-section" className="relative py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden rounded-2xl my-12 border border-[#C8A96B]/30 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
      
      {/* Dynamic Vibrant Rich Background Picture Reveal on Hover */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMood.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <img
              src={activeMood.image}
              alt={activeMood.label}
              className="w-full h-full object-cover filter brightness-90 contrast-110 saturate-125"
            />
            {/* Rich Royal Colored Ambient Light Radial Burst */}
            <div 
              className="absolute inset-0 transition-colors duration-700"
              style={{
                background: `radial-gradient(circle at center, ${activeMood.accentGlow} 0%, rgba(8,7,6,0.85) 70%, #080706 100%)`
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark Editorial Linear Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/90" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#15100E]/90 border border-[#C8A96B]/40 mb-3 shadow-xl backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-ping" />
          <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase font-semibold">
            ROYAL MOOD DISCOVERY
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F4EBDD] uppercase tracking-wide drop-shadow-md">
          WHAT ARE YOU IN THE MOOD FOR?
        </h2>
        <p className="text-xs font-sans text-[#F4EBDD]/80 font-light mt-2 tracking-wider uppercase">
          Hover across the spectrum to illuminate curated dining experiences
        </p>
      </div>

      {/* Horizontal Interactive Royal Spectrum Cards */}
      <div className="relative z-10 border border-[#C8A96B]/30 rounded-xl overflow-hidden backdrop-blur-xl bg-[#080706]/75 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-[#C8A96B]/20 divide-y md:divide-y-0 text-center">
          {MOODS.map((mood, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <button
                key={mood.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  const el = document.getElementById('compare-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-12 px-5 transition-all duration-400 flex flex-col items-center justify-between min-h-[260px] group relative ${
                  isHovered 
                    ? 'bg-[#15100E]/90 shadow-[inset_0_0_30px_rgba(200,169,107,0.2)]' 
                    : 'bg-transparent hover:bg-[#15100E]/40'
                }`}
              >
                {/* Active Royal Accent Top Border Line */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-[3px] transition-all duration-400 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundColor: mood.royalColor }}
                />

                <span className={`text-[10px] font-sans tracking-[0.25em] font-semibold uppercase transition-colors ${
                  isHovered ? 'text-[#F4EBDD]' : 'text-[#C8A96B]/70'
                }`}>
                  0{idx + 1}
                </span>

                <div className="my-4">
                  <h3 
                    className="font-serif text-xl sm:text-2xl tracking-widest uppercase transition-all duration-300 font-normal mb-2"
                    style={{ color: isHovered ? mood.royalColor : '#F4EBDD' }}
                  >
                    {mood.label}
                  </h3>
                  <p className="text-[11px] font-sans text-[#F4EBDD]/70 font-light max-w-[150px] leading-relaxed mx-auto">
                    {mood.subtext}
                  </p>
                </div>

                <span 
                  className={`text-[10px] font-sans tracking-[0.2em] font-semibold uppercase px-3 py-1.5 rounded transition-all duration-300 ${
                    isHovered 
                      ? 'opacity-100 bg-[#C8A96B] text-[#080706] shadow-lg' 
                      : 'opacity-0 text-[#C8A96B]'
                  }`}
                >
                  EXPLORE →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Mood Ambient Preview Card */}
      <div className="relative z-10 mt-10 p-6 rounded-xl bg-[#15100E]/85 border border-[#C8A96B]/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg border border-white/20"
            style={{ backgroundColor: activeMood.royalColor }}
          >
            <span className="text-white text-lg font-serif">★</span>
          </div>
          <div>
            <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#C8A96B] font-semibold block">
              SELECTED EXPERIENCE: {activeMood.label}
            </span>
            <h4 className="font-serif text-xl text-[#F4EBDD] font-light">
              "{activeMood.subtext}"
            </h4>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('compare-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-2.5 rounded bg-[#C8A96B] text-[#080706] font-sans text-xs font-semibold uppercase tracking-wider hover:bg-[#b59557] transition-colors shrink-0 shadow-lg"
        >
          COMPARE {activeMood.label} DISHES
        </button>
      </div>

    </section>
  );
};
