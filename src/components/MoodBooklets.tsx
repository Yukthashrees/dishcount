import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { MOOD_BOOKLETS } from '../data/moods';
import { GlassMoodSpheres3D } from './ThreeCanvas/GlassMoodSpheres3D';
import { audioFX } from '../utils/audio';

interface MoodBookletsProps {
  activeMood: string | null;
  setActiveMood: (id: string | null) => void;
}

export const MoodBooklets: React.FC<MoodBookletsProps> = ({ activeMood, setActiveMood }) => {
  const currentMoodObj = MOOD_BOOKLETS.find((m) => m.id === activeMood) || MOOD_BOOKLETS[0];

  return (
    <section id="moods" className="relative py-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Room Lighting Background Morph */}
      <motion.div
        animate={{
          backgroundColor: activeMood ? currentMoodObj.ambientBg : '#0A090C'
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0 rounded-3xl -z-10 opacity-80 transition-colors"
      />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-[#E76F51] mb-1">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>TRANSLUCENT GLASS SPHERES // MOOD PHYSICS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-accent-ivory">
            Immersive Mood Environments
          </h2>
        </div>

        {activeMood && (
          <button
            onClick={() => {
              audioFX.playPop();
              setActiveMood(null);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E76F51]/10 text-[#E76F51] border border-[#E76F51]/30 text-xs font-label font-bold hover:bg-[#E76F51] hover:text-white transition-all shadow-sm"
          >
            <span>Reset Mood World</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: 3D Translucent Glass Spheres Canvas */}
        <div className="w-full">
          <GlassMoodSpheres3D
            activeMood={activeMood}
            onSelectMood={(moodId) => {
              audioFX.playPop();
              setActiveMood(activeMood === moodId ? null : moodId);
            }}
          />
        </div>

        {/* Right Side: Active Mood Atmosphere Panel & Cards */}
        <div className="w-full space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMoodObj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-3xl glass-editorial border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-label uppercase font-bold text-[#F4A261] tracking-wider">
                  ATMOSPHERE: {currentMoodObj.name}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#2A9D8F]/20 text-[#2A9D8F] text-xs font-label font-bold border border-[#2A9D8F]/30">
                  {currentMoodObj.restaurantCount} RESTAURANTS
                </span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-accent-ivory mb-2">
                {currentMoodObj.tagline}
              </h3>

              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {currentMoodObj.description}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-label font-bold text-[#2A9D8F]">
                  {currentMoodObj.savingsAvailable}
                </span>

                <button
                  onClick={() => {
                    audioFX.playChime();
                    const el = document.getElementById('compare');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E76F51] hover:bg-[#D85637] text-white text-xs font-label font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Explore World</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Atmosphere Selector Chips */}
          <div className="flex flex-wrap gap-2">
            {MOOD_BOOKLETS.map((mood) => {
              const isSelected = activeMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => {
                    audioFX.playPop();
                    setActiveMood(isSelected ? null : mood.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-label transition-all border ${
                    isSelected
                      ? 'bg-[#E76F51] text-white border-[#E76F51] shadow-lg shadow-[#E76F51]/30 font-bold'
                      : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {mood.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
