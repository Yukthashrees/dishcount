import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight, BookOpen, Clock, Tag, Flame } from 'lucide-react';
import { DetailedRestaurant, MenuItem } from '../data/mockDatabase';
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
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-[#15100E]/90 border border-[#C8A96B]/40 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase font-semibold mb-1">
            <Flame className="w-3.5 h-3.5 text-[#C8A96B]" />
            <span>REAL-TIME DISH & COMBOS LOOKUP FOR "{query.toUpperCase()}"</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F4EBDD] uppercase tracking-wide">
            AVAILABLE AT {restaurants.length} RESTAURANTS
          </h3>
          <p className="text-xs font-sans text-[#8A7E76] font-light mt-1">
            Explore varieties, meal combos, base prices, active promo codes & platform delivery times.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-[#0D0B0A] border border-[#C8A96B]/30 text-xs font-sans text-[#C8A96B] uppercase tracking-wider font-semibold shrink-0 text-center">
          {restaurants.length} RESTAURANTS SERVING {query.toUpperCase()}
        </div>
      </div>

      {/* Multi-Restaurant Grid */}
      <div className="space-y-8">
        {restaurants.map((rest) => {
          const q = query.toLowerCase();

          // Filter matching varieties & combos from full menu
          const matchingItems = rest.fullMenu.filter(m =>
            m.name.toLowerCase().includes(q) ||
            m.category.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q)
          );

          // If no direct keyword match, fall back to top menu items
          const itemsToDisplay = matchingItems.length > 0 ? matchingItems : rest.fullMenu.slice(0, 3);

          return (
            <motion.div
              key={rest.id}
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-[#15100E] border border-white/10 hover:border-[#C8A96B]/50 transition-all p-6 sm:p-8 shadow-2xl relative overflow-hidden group"
            >
              {/* Top Row: Restaurant Info Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/05 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#C8A96B]/40 shrink-0">
                    <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-xs font-sans mb-1">
                      <span className="text-[10px] tracking-widest text-[#C8A96B] uppercase font-semibold">{rest.cuisine[0]}</span>
                      <span className="text-[#8A7E76]">•</span>
                      <span className="flex items-center gap-1 text-[#F4EBDD] font-sans font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" /> {rest.rating} ({rest.ratingCount})
                      </span>
                    </div>

                    <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#F4EBDD] uppercase tracking-wide group-hover:text-[#C8A96B] transition-colors">
                      {rest.name}
                    </h4>

                    <p className="text-xs font-sans text-[#8A7E76] font-light mt-0.5 flex items-center gap-2">
                      <span>{rest.location}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#C8A96B]"><Clock className="w-3 h-3" /> 22m avg delivery</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectRestaurantForMenu(rest)}
                  className="px-5 py-2.5 rounded-lg bg-[#0D0B0A] border border-[#C8A96B]/40 hover:border-[#C8A96B] text-[#C8A96B] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>VIEW ALL {rest.fullMenu.length} MENU ITEMS</span>
                </button>
              </div>

              {/* Varieties & Combos List for this Restaurant */}
              <div className="space-y-4">
                <div className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#8A7E76] font-semibold flex items-center justify-between">
                  <span>VARIETIES & COMBOS AVAILABLE ({itemsToDisplay.length})</span>
                  <span>BEST PAYABLE PRICE</span>
                </div>

                {itemsToDisplay.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#0D0B0A] border border-white/05 hover:border-[#C8A96B]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/10 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center text-[7px] ${item.isVeg ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>●</span>
                          <span className="font-serif text-base font-light text-[#F4EBDD] uppercase tracking-wide">{item.name}</span>
                        </div>
                        <p className="text-xs font-sans text-[#8A7E76] font-light line-clamp-1">{item.description}</p>
                        
                        {/* Offer / Coupon Badge */}
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded bg-[#4F8A70]/20 border border-[#4F8A70]/40 text-[10px] font-sans text-[#4F8A70] font-semibold uppercase tracking-wider">
                          <Tag className="w-3 h-3" />
                          <span>Code: SUPERPIN60 — Extra Cashback Valid</span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/05 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-sans text-[#8A7E76] line-through block">Menu: ₹{item.price}</span>
                        <span className="font-sans text-xl font-bold text-[#F4EBDD]">₹{item.bestPrice}</span>
                        <span className="text-[10px] font-sans text-[#4F8A70] block font-semibold uppercase">Best on {item.bestPlatform}</span>
                      </div>

                      <button
                        onClick={() => {
                          const convertedDish: Dish = {
                            id: item.id,
                            restaurantId: rest.id,
                            restaurantName: rest.name,
                            name: item.name,
                            description: item.description,
                            category: item.category,
                            basePrice: item.price,
                            image: item.image,
                            rating: item.rating,
                            deliveryTimeAvg: '22 mins',
                            priceRange: `₹${item.bestPrice} – ₹${item.price + 45}`,
                            comparison: [
                              { platformId: 'magicpin', platformName: 'Magicpin', logo: '🟣', status: 'BEST PRICE', statusDetail: 'Best rate tonight', basePrice: item.price, restaurantDiscount: 30, couponDiscount: 25, deliveryFee: 20, platformFee: 4, taxes: 12, packagingFee: 10, cashback: 15, finalPayablePrice: item.bestPrice, couponCode: 'SUPERPIN60', deliveryTimeMinutes: 24, dealScore: 98, scoreReason: 'Cheapest rate' },
                              { platformId: 'swish', platformName: 'SWISH', logo: '⚡', status: 'FASTEST', statusDetail: '10 min delivery', basePrice: item.price, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 15, platformFee: 3, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: item.bestPrice + 12, couponCode: 'SWISH10M', deliveryTimeMinutes: 10, dealScore: 94, scoreReason: 'Fastest delivery' },
                              { platformId: 'zomato', platformName: 'Zomato', logo: '🔴', status: 'AVAILABLE', statusDetail: 'Gold deal', basePrice: item.price, restaurantDiscount: 25, couponDiscount: 15, deliveryFee: 30, platformFee: 5, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: item.bestPrice + 25, couponCode: 'ZOMGOLD', deliveryTimeMinutes: 22, dealScore: 90, scoreReason: 'Gold discount' },
                              { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'AVAILABLE', statusDetail: 'Swiggy One', basePrice: item.price, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 35, platformFee: 6, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: item.bestPrice + 38, couponCode: 'SWIGGYIT', deliveryTimeMinutes: 25, dealScore: 84, scoreReason: 'Standard deal' }
                            ]
                          };
                          onSelectDishForComparison(convertedDish);
                        }}
                        className="px-4 py-2 rounded bg-[#C8A96B] text-[#080706] hover:bg-[#b59557] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-lg"
                      >
                        <span>COMPARE PLATFORMS</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
