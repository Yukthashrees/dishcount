import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Star, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { DetailedRestaurant, MenuItem } from '../data/mockDatabase';
import { Dish } from '../types';

interface RestaurantMenuModalProps {
  restaurant: DetailedRestaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectDishForComparison: (dish: Dish) => void;
}

export const RestaurantMenuModal: React.FC<RestaurantMenuModalProps> = ({
  restaurant,
  isOpen,
  onClose,
  onSelectDishForComparison
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen || !restaurant) return null;

  const categories = ['ALL', ...(restaurant.menuCategories || [])];

  const filteredMenu = restaurant.fullMenu.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCompareItem = (item: MenuItem) => {
    const basePrice = item.price;
    const convertedDish: Dish = {
      id: item.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: item.name,
      description: item.description,
      category: item.category,
      basePrice: item.price,
      image: item.image,
      rating: item.rating,
      deliveryTimeAvg: '22 mins',
      priceRange: `₹${item.bestPrice} – ₹${item.price + 45}`,
      comparison: [
        { platformId: 'magicpin', platformName: 'Magicpin', logo: '🟣', status: 'BEST PRICE', statusDetail: 'Best rate tonight', basePrice: basePrice, restaurantDiscount: 30, couponDiscount: 25, deliveryFee: 20, platformFee: 4, taxes: 12, packagingFee: 10, cashback: 15, finalPayablePrice: item.bestPrice, couponCode: 'MAGICSPECIAL', deliveryTimeMinutes: 24, dealScore: 98, scoreReason: 'Cheapest final rate' },
        { platformId: 'swish', platformName: 'SWISH', logo: '⚡', status: 'FASTEST', statusDetail: '10 min delivery', basePrice: basePrice, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 15, platformFee: 3, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: item.bestPrice + 12, couponCode: 'SWISHEXPRESS', deliveryTimeMinutes: 10, dealScore: 94, scoreReason: 'Fastest 10m delivery' },
        { platformId: 'zomato', platformName: 'Zomato', logo: '🔴', status: 'AVAILABLE', statusDetail: 'Gold deal', basePrice: basePrice, restaurantDiscount: 25, couponDiscount: 15, deliveryFee: 30, platformFee: 5, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: item.bestPrice + 25, couponCode: 'ZOMATOGOLD', deliveryTimeMinutes: 22, dealScore: 90, scoreReason: 'Gold discount' },
        { platformId: 'swiggy', platformName: 'Swiggy', logo: '🟠', status: 'AVAILABLE', statusDetail: 'Swiggy One', basePrice: basePrice, restaurantDiscount: 20, couponDiscount: 10, deliveryFee: 35, platformFee: 6, taxes: 12, packagingFee: 10, cashback: 0, finalPayablePrice: item.bestPrice + 38, couponCode: 'SWIGGYIT', deliveryTimeMinutes: 25, dealScore: 84, scoreReason: 'Standard deal' }
      ]
    };

    onSelectDishForComparison(convertedDish);
    onClose();
  };

  const handleDirectOrder = (platformName: string) => {
    const urls: Record<string, string> = {
      magicpin: 'https://magicpin.in',
      swish: 'https://swish.app',
      zomato: 'https://www.zomato.com',
      swiggy: 'https://www.swiggy.com',
      eatsure: 'https://www.eatsure.com'
    };
    const target = urls[platformName.toLowerCase()] || `https://${platformName.toLowerCase()}.com`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-4xl h-[90vh] rounded-2xl bg-[#120E0C] border border-[#C8A96B]/30 shadow-2xl flex flex-col overflow-hidden text-[#F4EBDD]"
        >
          {/* Header Cover Banner */}
          <div className="relative h-48 sm:h-64 shrink-0 overflow-hidden">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover filter brightness-[0.45] contrast-125 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-[#120E0C]/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-[#F4EBDD] hover:bg-[#C8A96B] hover:text-[#080706] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Restaurant Info */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div>
                <div className="flex items-center gap-3 text-xs font-sans tracking-widest text-[#C8A96B] uppercase font-semibold mb-1">
                  <span>{restaurant.cuisine.join(' • ')}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#F4EBDD]"><Star className="w-3.5 h-3.5 fill-[#C8A96B] text-[#C8A96B]" /> {restaurant.rating} ({restaurant.ratingCount})</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl font-light uppercase tracking-wide text-[#F4EBDD]">
                  {restaurant.name}
                </h2>
                <p className="text-xs text-[#8A7E76] font-light mt-1">
                  {restaurant.location} • {restaurant.distance} away
                </p>
              </div>

              <div className="bg-[#15100E]/90 border border-[#C8A96B]/50 px-4 py-2 rounded-lg text-left sm:text-right shrink-0">
                <span className="text-[10px] tracking-widest text-[#C8A96B] uppercase block">BEST PLATFORM DEAL</span>
                <span className="text-sm font-serif text-[#F4EBDD]">Best rates on <strong className="text-[#C8A96B]">{restaurant.bestPlatform}</strong></span>
              </div>
            </div>
          </div>

          {/* Menu Search & Category Filter Bar */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#15100E] shrink-0 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#8A7E76]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${restaurant.name} menu…`}
                  className="w-full bg-[#0D0B0A] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs font-sans text-[#F4EBDD] placeholder-[#8A7E76] focus:border-[#C8A96B] outline-none"
                />
              </div>
              <div className="text-xs font-sans text-[#C8A96B] font-semibold uppercase tracking-wider">
                {filteredMenu.length} ITEMS FOUND
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-colors shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#C8A96B] text-[#080706] font-semibold'
                      : 'bg-[#0D0B0A] border border-white/10 text-[#8A7E76] hover:text-[#F4EBDD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {filteredMenu.length === 0 ? (
              <div className="text-center py-16 text-[#8A7E76] font-sans text-xs">
                No menu items found matching "{searchQuery}".
              </div>
            ) : (
              filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#15100E] border border-white/05 hover:border-[#C8A96B]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Item Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-white/10 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-3 h-3 rounded-full border flex items-center justify-center text-[8px] ${item.isVeg ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                          ●
                        </span>
                        <span className="text-[10px] font-sans tracking-widest text-[#8A7E76] uppercase">{item.category}</span>
                      </div>
                      <h4 className="font-serif text-lg font-light text-[#F4EBDD] uppercase tracking-wide group-hover:text-[#C8A96B] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs font-sans text-[#8A7E76] font-light max-w-md mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-sans">
                        <span className="text-[#C8A96B] font-semibold">Base Price: ₹{item.price}</span>
                        <span className="text-[#8A7E76]">•</span>
                        <span className="text-[#4F8A70] font-semibold">Best Deal: ₹{item.bestPrice} on {item.bestPlatform}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/05">
                    <button
                      onClick={() => handleCompareItem(item)}
                      className="px-4 py-2 rounded bg-[#0D0B0A] border border-[#C8A96B]/50 text-[#C8A96B] hover:bg-[#C8A96B] hover:text-[#080706] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <span>COMPARE PRICES</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDirectOrder(item.bestPlatform)}
                      className="px-4 py-2 rounded bg-[#C8A96B] text-[#080706] hover:bg-[#b59557] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ORDER</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
