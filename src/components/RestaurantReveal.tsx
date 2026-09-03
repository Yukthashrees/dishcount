import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, MapPin, Zap, ArrowUpRight, ChevronDown, Dna } from 'lucide-react';
import { Restaurant, Dish } from '../types';
import { audioFX } from '../utils/audio';

interface RestaurantRevealProps {
  restaurants: Restaurant[];
  onCompareOffers: (r: Restaurant) => void;
  onInspectDna: (dish: Dish, r: Restaurant) => void;
}

export const RestaurantReveal: React.FC<RestaurantRevealProps> = ({
  restaurants,
  onCompareOffers,
  onInspectDna
}) => {
  const [unfoldedId, setUnfoldedId] = useState<string | null>(null);

  const toggleUnfold = (id: string) => {
    audioFX.playPaperRustle();
    setUnfoldedId(unfoldedId === id ? null : id);
  };

  return (
    <section id="compare" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-12 border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-label text-xs text-[#2A9D8F] tracking-widest uppercase block mb-1">
            EDITORIAL RESTAURANT PANELS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-accent-ivory">
            Unfolding Restaurant Menus
          </h2>
        </div>
        <span className="text-xs font-label text-zinc-400 uppercase">
          PHYSICAL LAYERED PANELS
        </span>
      </div>

      {/* Layered Menu Panels Stack */}
      <div className="space-y-6">
        {restaurants.map((rest) => {
          const isUnfolded = unfoldedId === rest.id;

          return (
            <motion.div
              key={rest.id}
              layout
              className="rounded-3xl glass-editorial border border-white/10 overflow-hidden transition-all duration-500"
            >
              {/* Main Panel Header */}
              <div
                onClick={() => toggleUnfold(rest.id)}
                className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-6">
                  {/* Photo Thumbnail */}
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />

                  <div>
                    <div className="flex items-center gap-2 text-xs font-label text-zinc-400 mb-1">
                      <span className="text-[#E76F51]">{rest.cuisine.join(' • ')}</span>
                      <span>•</span>
                      <span>{rest.distance}</span>
                      <span>•</span>
                      <span>{rest.location}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-accent-ivory group-hover:text-[#F4A261] transition-colors">
                      {rest.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light mt-1">
                      {rest.tagline}
                    </p>

                    {/* Best Offer Tag */}
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E76F51]/10 text-[#E76F51] text-xs font-label font-bold border border-[#E76F51]/30">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{rest.bestOffer}</span>
                    </div>
                  </div>
                </div>

                {/* Rating & Controls */}
                <div className="flex items-center justify-between md:justify-end gap-6">
                  <div className="text-left md:text-right font-label">
                    <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{rest.rating}</span>
                      <span className="text-zinc-400 font-normal">({rest.ratingCount})</span>
                    </div>
                    <span className="text-xs text-zinc-400 block mt-1">
                      {rest.deliveryTime} • {rest.priceForTwo}
                    </span>
                  </div>

                  <div className={`p-3 rounded-full bg-white/5 border border-white/10 text-white transition-transform duration-500 ${isUnfolded ? 'rotate-180 bg-[#E76F51]' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Physical Unfolding Panel */}
              <AnimatePresence>
                {isUnfolded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, rotateX: -15 }}
                    animate={{ opacity: 1, height: 'auto', rotateX: 0 }}
                    exit={{ opacity: 0, height: 0, rotateX: -15 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'top center' }}
                    className="border-t border-white/10 bg-black/40 p-6 sm:p-8"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="font-label text-xs text-[#2A9D8F] tracking-widest uppercase">
                        SIGNATURE DISHES & 7-PLATFORM RECEIPTS
                      </span>
                      <button
                        onClick={() => {
                          audioFX.playChime();
                          onCompareOffers(rest);
                        }}
                        className="px-5 py-2.5 rounded-full bg-[#E76F51] hover:bg-[#D85637] text-white text-xs font-label font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                      >
                        <span>Unroll 7-Platform Receipts</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rest.dishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="p-5 rounded-2xl paper-receipt text-charcoal-950 border border-amber-900/10 shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-label text-xs font-bold text-[#E76F51]">
                                {dish.category}
                              </span>
                              <span className="font-label font-bold text-sm">
                                ₹{dish.basePrice}
                              </span>
                            </div>

                            <h4 className="font-serif text-lg font-bold text-zinc-900">
                              {dish.name}
                            </h4>
                            <p className="font-label text-xs text-zinc-600 line-clamp-2 mt-1">
                              {dish.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-dashed border-zinc-300 flex items-center justify-between">
                            <span className="font-label text-xs font-bold text-[#2A9D8F]">
                              Cheapest Option: ₹{dish.comparison.find(c => c.isCheapest)?.finalPrice || dish.comparison[0].finalPrice}
                            </span>

                            <button
                              onClick={() => {
                                audioFX.playPop();
                                onInspectDna(dish, rest);
                              }}
                              className="px-3 py-1.5 rounded bg-zinc-900 text-white font-label text-[10px] uppercase font-bold flex items-center gap-1"
                            >
                              <Dna className="w-3.5 h-3.5 text-[#2A9D8F]" />
                              <span>Inspect DNA</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
