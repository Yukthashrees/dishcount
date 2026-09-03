import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { MoodBooklet } from '../types';
import { audioFX } from '../utils/audio';

interface MenuBookletProps {
  mood: MoodBooklet;
  isSelected: boolean;
  onSelect: (moodId: string) => void;
}

export const MenuBookletItem: React.FC<MenuBookletProps> = ({ mood, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => {
        audioFX.playPop();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        audioFX.playPaperRustle();
        onSelect(mood.id);
      }}
      animate={{
        scale: isHovered ? 1.08 : isSelected ? 1.05 : 1,
        z: isHovered ? 50 : 0,
        rotateY: isHovered ? -8 : 0,
        rotateX: isHovered ? 5 : 0,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative w-72 sm:w-80 cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 group shadow-2xl ${
        isSelected
          ? 'ring-2 ring-[#E76F51] shadow-[0_0_50px_rgba(231,111,81,0.4)]'
          : 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10'
      }`}
    >
      {/* Physical Embossed Paper Texture & Brass Accent Border */}
      <div className="relative h-96 w-full overflow-hidden bg-charcoal-850 p-6 flex flex-col justify-between border-t-2 border-accent-gold/40">
        
        {/* Subtle Background Photo with Dark Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={mood.image}
            alt={mood.name}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />
        </div>

        {/* Top Brass Seal & Restaurant Count Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="w-8 h-8 rounded-full border border-accent-gold/60 flex items-center justify-center text-accent-gold text-xs font-serif font-bold shadow-md bg-black/40 backdrop-blur-md">
            ⚜️
          </div>
          
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-label font-bold text-accent-ivory uppercase tracking-widest border border-white/20">
            {mood.restaurantCount} RESTAURANTS
          </span>
        </div>

        {/* Menu Center Content */}
        <div className="relative z-10 text-accent-ivory my-auto py-4">
          <span className="text-[10px] font-label font-bold uppercase tracking-widest text-[#E76F51] block mb-1">
            LUXURY MENU BOOKLET
          </span>

          <h3 className="font-serif text-3xl font-extrabold text-white group-hover:text-[#F4A261] transition-colors leading-tight">
            {mood.name}
          </h3>

          <p className="text-xs text-zinc-300 font-light line-clamp-2 mt-2 leading-relaxed">
            {mood.tagline}
          </p>
        </div>

        {/* Bottom Unfold Action Bar */}
        <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between">
          <span className="text-[11px] font-label font-bold text-[#2A9D8F]">
            {mood.savingsAvailable}
          </span>

          <div className="flex items-center gap-1.5 text-xs font-label font-bold text-[#E76F51] group-hover:text-[#F4A261] transition-colors">
            <span>UNFOLD MENU</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
