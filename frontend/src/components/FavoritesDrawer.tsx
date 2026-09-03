import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ArrowUpRight, TrendingDown } from 'lucide-react';
import { audioFX } from '../utils/audio';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dishName: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectDish
}) => {
  if (!isOpen) return null;

  const savedUsualItems = [
    {
      id: 'fav-1',
      dishName: 'Chicken Dum Biryani',
      restaurantName: 'Empire Restaurant',
      bestPlatform: 'Magicpin',
      currentCheapestPrice: 307,
      savedAmount: 142
    },
    {
      id: 'fav-2',
      dishName: 'Truffle Pizza',
      restaurantName: 'La Piazza Trattoria',
      bestPlatform: 'Zomato',
      currentCheapestPrice: 520,
      savedAmount: 71
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-md h-full bg-[#FFFDF9] border-l border-ivory-300 p-6 shadow-2xl z-10 text-charcoal-950 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-ivory-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-coral-500 fill-current" />
                <h3 className="font-serif text-2xl font-bold">Saved Usual Meals</h3>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-ivory-200 text-charcoal-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {savedUsualItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 flex flex-col justify-between font-sans space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-sans font-bold text-coral-500 uppercase tracking-widest block">
                      {item.restaurantName}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-charcoal-950">
                      {item.dishName}
                    </h4>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FFFDF9] border border-ivory-300 text-xs">
                    <span className="font-bold text-savings-600 block">
                      Your usual is ₹{item.savedAmount} cheaper on {item.bestPlatform} today!
                    </span>
                    <span className="text-charcoal-500 text-[11px] block mt-0.5">
                      Lowest final price: ₹{item.currentCheapestPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      audioFX.playChime();
                      onClose();
                      onSelectDish(item.dishName);
                    }}
                    className="w-full py-2 px-3 rounded-full bg-charcoal-950 hover:bg-coral-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Check Today's Price</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-200 text-xs font-sans text-center text-charcoal-500 font-medium">
            Automatic daily price updates active for saved favorites
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
