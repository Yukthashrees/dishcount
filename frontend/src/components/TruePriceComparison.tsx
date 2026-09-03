import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Dish, PlatformPriceBreakdown } from '../types';
import { TruePriceEngine } from '../services/truePriceEngine';

interface TruePriceComparisonProps {
  dish: Dish;
  sortedPlatforms: PlatformPriceBreakdown[];
  onOpenPlatform: (platform: PlatformPriceBreakdown) => void;
}

export const TruePriceComparison: React.FC<TruePriceComparisonProps> = ({
  dish,
  sortedPlatforms,
  onOpenPlatform
}) => {
  const [expandedPlatformId, setExpandedPlatformId] = useState<string | null>(null);

  const { cheapest, savings } = TruePriceEngine.calculateMaxSavings(sortedPlatforms);

  const toggleExpand = (id: string) => {
    setExpandedPlatformId(expandedPlatformId === id ? null : id);
  };

  return (
    <section id="compare-section" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      
      {/* Posh Royal Dish Header Card with Rich Culinary Image */}
      <div className="mb-12 rounded-2xl bg-[#15100E]/90 border border-[#C8A96B]/30 p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle Dish Background Atmosphere */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 pointer-events-none overflow-hidden opacity-30">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover filter saturate-150 brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#15100E] via-[#15100E]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {/* Dish Thumbnail */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-[#C8A96B]/50 shadow-2xl shrink-0">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-3 text-xs font-sans tracking-[0.2em] text-[#C8A96B] uppercase font-semibold mb-1">
                <span>{dish.restaurantName}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#F4EBDD]"><Star className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" /> {dish.rating}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F4EBDD] uppercase tracking-wide">
                {dish.name}
              </h2>
              <p className="text-xs font-sans text-[#F4EBDD]/70 font-light max-w-md mt-1">
                {dish.description}
              </p>
            </div>
          </div>

          {/* Hero Best Price Highlight */}
          <div className="bg-[#080706]/90 border border-[#C8A96B]/50 rounded-xl p-6 text-left md:text-right shadow-2xl shrink-0 min-w-[250px]">
            <span className="text-[10px] font-sans tracking-[0.25em] text-[#C8A96B] uppercase block font-semibold">
              THE BEST PRICE TONIGHT
            </span>
            <div className="font-sans text-4xl sm:text-5xl font-bold text-[#F4EBDD] mt-1 drop-shadow-md">
              ₹{cheapest.finalPayablePrice}
            </div>
            <div className="text-xs font-sans font-semibold text-[#4F8A70] tracking-wider uppercase mt-1">
              SAVE ₹{savings} VS HIGHEST RATE
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Platform Comparison Stage */}
      <div className="space-y-3">
        <div className="px-6 py-2 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase font-sans text-[#C8A96B] font-semibold">
          <span>PLATFORM & OFFER</span>
          <div className="flex items-center gap-12">
            <span>DELIVERY</span>
            <span>FINAL PAYABLE</span>
          </div>
        </div>

        {sortedPlatforms.map((platform) => {
          const isCheapest = platform.platformId === cheapest.platformId;
          const isExpanded = expandedPlatformId === platform.platformId;

          return (
            <motion.div
              key={platform.platformId}
              layout
              className={`rounded-xl transition-all border overflow-hidden ${
                isCheapest
                  ? 'bg-[#15100E] border-[#C8A96B] shadow-[0_0_35px_rgba(200,169,107,0.2)] ring-1 ring-[#C8A96B]/40'
                  : 'bg-[#0D0B0A] border-white/05 hover:border-white/15'
              }`}
            >
              {/* Main Platform Row */}
              <div
                onClick={() => toggleExpand(platform.platformId)}
                className="px-6 py-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-xl text-[#F4EBDD] tracking-wider uppercase font-light">
                    {platform.platformName}
                  </span>

                  {/* Luxury BEST DEAL Stamp */}
                  {isCheapest && (
                    <span className="luxury-stamp">
                      ★ BEST DEAL
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-8 sm:gap-14">
                  <span className="text-xs font-sans text-[#8A7E76] font-light hidden sm:inline">
                    {platform.deliveryTimeMinutes} min
                  </span>

                  <div className="flex items-center gap-4">
                    <span className={`font-sans text-2xl font-medium ${isCheapest ? 'text-[#C8A96B]' : 'text-[#F4EBDD]'}`}>
                      ₹{platform.finalPayablePrice}
                    </span>

                    <button className="p-1 text-[#8A7E76] hover:text-[#F4EBDD]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable True Price Breakdown */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/05 bg-[#15100E]/95 px-6 py-6 font-sans"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs mb-6">
                      <div>
                        <span className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">ITEM PRICE</span>
                        <span className="text-[#F4EBDD] font-medium">₹{platform.basePrice}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">DELIVERY FEE</span>
                        <span className="text-[#F4EBDD] font-medium">₹{platform.deliveryFee}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">PLATFORM FEE</span>
                        <span className="text-[#F4EBDD] font-medium">₹{platform.platformFee}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">TAXES</span>
                        <span className="text-[#F4EBDD] font-medium">₹{platform.taxes}</span>
                      </div>
                      <div>
                        <span className="text-[#8A7E76] block mb-1 uppercase tracking-wider text-[10px]">OFFERS / COUPON</span>
                        <span className="text-[#4F8A70] font-medium">-₹{platform.restaurantDiscount + platform.couponDiscount}</span>
                      </div>
                    </div>

                    {/* WHY THIS IS THE BEST DEAL Box */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#0D0B0A] border border-[#C8A96B]/30">
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#C8A96B] block mb-1">
                          WHY THIS IS THE BEST DEAL
                        </span>
                        <p className="text-xs text-[#8A7E76]">
                          {platform.scoreReason} • Code: <strong className="text-[#F4EBDD]">{platform.couponCode}</strong>
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPlatform(platform);
                        }}
                        className="px-6 py-2.5 rounded bg-[#C8A96B] text-[#080706] text-xs font-semibold uppercase tracking-wider hover:bg-[#b59557] transition-colors flex items-center gap-2 shadow-lg"
                      >
                        <span>ORDER ON {platform.platformName}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
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
