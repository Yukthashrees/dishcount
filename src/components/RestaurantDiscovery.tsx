import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantDiscoveryProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (rest: Restaurant) => void;
}

export const RestaurantDiscovery: React.FC<RestaurantDiscoveryProps> = ({
  restaurants,
  onSelectRestaurant
}) => {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Editorial Header */}
      <div className="mb-12 border-b border-[#C8A96B]/20 pb-6 flex items-end justify-between">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-1">
            CURATED SELECTION
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F4EBDD] uppercase tracking-wide">
            WHERE SHOULD YOU EAT?
          </h2>
        </div>

        <span className="hidden sm:inline text-xs font-sans text-[#8A7E76] tracking-wider uppercase">
          SWIPE HORIZONTALLY →
        </span>
      </div>

      {/* Full-Bleed Editorial Horizontal Strip */}
      <div className="flex gap-8 overflow-x-auto pb-10 pt-2 no-scrollbar snap-x cursor-grab">
        {restaurants.map((rest) => (
          <motion.div
            key={rest.id}
            whileHover={{ y: -6 }}
            onClick={() => onSelectRestaurant(rest)}
            className="w-[320px] sm:w-[420px] h-[480px] shrink-0 rounded-lg relative overflow-hidden cursor-pointer group snap-start border border-white/10"
          >
            {/* Full-Bleed Imagery */}
            <img
              src={rest.image}
              alt={rest.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-transparent" />

            {/* Minimal Minimalistic Overlay Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-[#F4EBDD]">
              <div className="flex items-center justify-between text-xs tracking-widest uppercase font-sans text-[#C8A96B]">
                <span>{rest.cuisine[0]}</span>
                <span>BEST ON {rest.bestPlatform.toUpperCase()}</span>
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl font-light uppercase tracking-wider mb-2 group-hover:text-[#C8A96B] transition-colors">
                  {rest.name}
                </h3>
                <p className="text-xs font-sans text-[#8A7E76] font-light mb-4">
                  {rest.location} • {rest.rating} ★ ({rest.ratingCount})
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-sans">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#8A7E76] uppercase block">BEST FINAL PRICE</span>
                    <span className="text-lg font-medium text-[#F4EBDD]">From ₹{rest.startingFinalPrice}</span>
                  </div>

                  <div className="p-3 rounded-full bg-[#15100E] border border-[#C8A96B]/30 group-hover:bg-[#C8A96B] group-hover:text-[#080706] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};
