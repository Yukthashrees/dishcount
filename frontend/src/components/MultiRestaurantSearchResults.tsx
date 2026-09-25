import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import { DetailedRestaurant } from '../data/mockDatabase';
import { Dish } from '../types';

interface MultiRestaurantSearchResultsProps {
  query: string;
  restaurants: DetailedRestaurant[];
  onSelectRestaurantForMenu: (rest: DetailedRestaurant) => void;
  onSelectDishForComparison: (dish: Dish) => void;
}

export const MultiRestaurantSearchResults: React.FC<MultiRestaurantSearchResultsProps> = ({
  query,
  restaurants,
  onSelectRestaurantForMenu,
  onSelectDishForComparison
}) => {
  if (!query || restaurants.length === 0) return null;

  return (
    <section className="py-12 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 p-6 rounded-2xl bg-[#15100E]/80 border border-[#C8A96B]/30 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase font-semibold block mb-1">
            MULTI-RESTAURANT COMPARISON FOR "{query.toUpperCase()}"
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F4EBDD] uppercase tracking-wide">
            RESTAURANTS SERVING {query.toUpperCase()}
          </h3>
          <p className="text-xs font-sans text-[#8A7E76] font-light mt-1">
            Compare true final prices and delivery times across different hotels & delivery platforms.
          </p>
        </div>

        <div className="px-4 py-2 rounded-lg bg-[#0D0B0A] border border-white/10 text-xs font-sans text-[#C8A96B] uppercase tracking-wider font-semibold shrink-0">
          {restaurants.length} RESTAURANTS FOUND
        </div>
      </div>

      {/* Multi-Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map((rest) => {
          // Find matching dish or default first menu item
          const matchedItem = rest.fullMenu.find(m => m.name.toLowerCase().includes(query.toLowerCase())) || rest.fullMenu[0];

          return (
            <motion.div
              key={rest.id}
              whileHover={{ y: -4 }}
              className="rounded-xl bg-[#15100E] border border-white/10 hover:border-[#C8A96B]/50 transition-all p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
            >
              {/* Top Row: Restaurant Info & Image */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#C8A96B]/30 shrink-0">
                  <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] tracking-widest text-[#C8A96B] uppercase font-semibold">{rest.cuisine[0]}</span>
                    <span className="flex items-center gap-1 text-[#F4EBDD] font-sans font-semibold">
                      <Star className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" /> {rest.rating} ({rest.ratingCount})
                    </span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-light text-[#F4EBDD] uppercase tracking-wide group-hover:text-[#C8A96B] transition-colors">
                    {rest.name}
                  </h4>

                  <p className="text-xs font-sans text-[#8A7E76] font-light mt-1 flex items-center gap-2">
                    <span>{rest.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#C8A96B]"><Clock className="w-3 h-3" /> 22m avg</span>
                  </p>
                </div>
              </div>

              {/* Middle Row: Featured Dish & True Price Highlight */}
              {matchedItem && (
                <div className="p-4 rounded-lg bg-[#0D0B0A] border border-white/05 mb-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] tracking-widest text-[#8A7E76] uppercase block">FEATURED MATCH</span>
                      <span className="font-serif text-base text-[#F4EBDD] font-light">{matchedItem.name}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] tracking-widest text-[#C8A96B] uppercase block">BEST DEAL TONIGHT</span>
                      <span className="font-sans text-xl font-bold text-[#F4EBDD]">₹{matchedItem.bestPrice}</span>
                      <span className="text-[10px] font-sans text-[#4F8A70] block uppercase font-semibold">on {matchedItem.bestPlatform}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Row: Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/05">
                <button
                  onClick={() => onSelectRestaurantForMenu(rest)}
                  className="flex-1 py-2.5 rounded bg-[#0D0B0A] border border-white/10 hover:border-[#C8A96B]/50 text-[#F4EBDD] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C8A96B]" />
                  <span>VIEW FULL MENU</span>
                </button>

                {matchedItem && (
                  <button
                    onClick={() => {
                      const convertedDish: Dish = {
                        id: matchedItem.id,
                        restaurantId: rest.id,
                        restaurantName: rest.name,
                        name: matchedItem.name,
                        description: matchedItem.description,
                        category: matchedItem.category,
                        basePrice: matchedItem.price,
                        image: matchedItem.image,
                        rating: matchedItem.rating,
                        deliveryTimeAvg: '22 mins',
                        priceRange: `₹${matchedItem.bestPrice} – ₹${matchedItem.price + 45}`,
                        comparison: [
                          { platformId: 'magicpin', platformName: 'Magicpin', logo: '🟣', status: 'BEST PRICE', statusDetail: 'Best rate tonight', basePrice: matchedItem.price, restaurantDiscount: 30, couponDiscount: 25, deliveryFee: 20, platformFee: 4, taxes: 12, packagingFee: 10, cashback: 15, finalPayablePrice: matchedItem.bestPrice, couponCode: 'MAGICPIN50', deliveryTimeMinutes: 24, dealScore: 98, scoreReason: 'Cheapest rate' },
                          { platformId: 'swish', platformName: 'SWISH', logo: '⚡', status: 'FASTEST', statusDetail: '10 min delivery', basePrice: matchedItem.price, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 15, platformFee: 3, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: matchedItem.bestPrice + 12, couponCode: 'SWISH10M', deliveryTimeMinutes: 10, dealScore: 94, scoreReason: 'Fastest delivery' },
                          { platformId: 'zomato', platformName: 'Zomato', logo: '🔴', status: 'AVAILABLE', statusDetail: 'Gold deal', basePrice: matchedItem.price, restaurantDiscount: 25, couponDiscount: 15, deliveryFee: 30, platformFee: 5, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: matchedItem.bestPrice + 25, couponCode: 'ZOMGOLD', deliveryTimeMinutes: 22, dealScore: 90, scoreReason: 'Gold discount' },
                          { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'AVAILABLE', statusDetail: 'Swiggy One', basePrice: matchedItem.price, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 35, platformFee: 6, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: matchedItem.bestPrice + 38, couponCode: 'SWIGGYIT', deliveryTimeMinutes: 25, dealScore: 84, scoreReason: 'Standard deal' }
                        ]
                      };
                      onSelectDishForComparison(convertedDish);
                    }}
                    className="flex-1 py-2.5 rounded bg-[#C8A96B] text-[#080706] hover:bg-[#b59557] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <span>COMPARE PLATFORMS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
