import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dna, Flame, PackageCheck, TrendingUp, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Dish, Restaurant } from '../types';
import { audioFX } from '../utils/audio';

interface DishDnaModalProps {
  dish: Dish | null;
  restaurant: Restaurant | null;
  onClose: () => void;
}

export const DishDnaModal: React.FC<DishDnaModalProps> = ({ dish, restaurant, onClose }) => {
  if (!dish) return null;

  const dna = dish.dna || {
    spiceLevel: 2,
    spiceLabel: 'Balanced Spice',
    portionSize: 'Serves 2',
    valueForMoney: 94,
    popularity: 98,
    deliveryReliability: 99
  };

  const metrics = [
    {
      title: 'Value for Money',
      value: dna.valueForMoney,
      color: '#2A9D8F',
      icon: TrendingUp,
      subtitle: '94% high value vs market avg'
    },
    {
      title: 'Popularity Score',
      value: dna.popularity,
      color: '#E76F51',
      icon: Heart,
      subtitle: 'Top 2% ordered dish in area'
    },
    {
      title: 'Delivery Reliability',
      value: dna.deliveryReliability,
      color: '#F4A261',
      icon: ShieldCheck,
      subtitle: '99% intact packaging score'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl rounded-3xl glass-editorial border border-white/20 p-6 sm:p-8 shadow-2xl z-10 text-accent-ivory"
        >
          <button
            onClick={() => {
              audioFX.playPop();
              onClose();
            }}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-[#E76F51]/20 text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6 pr-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2A9D8F] to-[#3DB8A7] flex items-center justify-center text-white shadow-lg">
              <Dna className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-label uppercase tracking-widest text-[#2A9D8F]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CULINARY DISH DNA METRICS</span>
              </div>
              <h2 className="font-serif text-2xl font-bold">
                {dish.name}
              </h2>
              <span className="text-xs text-zinc-400 font-light">
                {restaurant ? restaurant.name : 'Dish Analytics'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-label uppercase tracking-wider block">Spice Level</span>
                <span className="text-sm font-bold text-white block">{dna.spiceLabel}</span>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-1.5 rounded-full ${
                        i < dna.spiceLevel ? 'bg-red-500' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 font-label uppercase tracking-wider block">Portion Scale</span>
                <span className="text-sm font-bold text-white block">{dna.portionSize}</span>
                <span className="text-[11px] text-zinc-400">Generous packing rating</span>
              </div>
            </div>
          </div>

          {/* Radial Ring Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((m, idx) => {
              const radius = 38;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (m.value / 100) * circumference;
              const Icon = m.icon;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center text-center shadow-md"
                >
                  <div className="relative w-24 h-24 flex items-center justify-center mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-zinc-800"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={m.color}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.2, delay: idx * 0.2, ease: "easeOut" }}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Icon className="w-4 h-4 mb-0.5" style={{ color: m.color }} />
                      <span className="text-base font-extrabold text-white">
                        {m.value}%
                      </span>
                    </div>
                  </div>

                  <h4 className="font-serif text-sm font-bold text-white">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {m.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
