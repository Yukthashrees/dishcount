import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Restaurant, Dish, PlatformReceipt } from '../types';
import { triggerConfetti } from '../utils/confetti';
import { audioFX } from '../utils/audio';

interface OfferReceiptsProps {
  restaurant: Restaurant;
  onClose: () => void;
  onLockDeal: (r: Restaurant, dish: Dish, platformName: string, finalPrice: number, savings: number) => void;
}

export const OfferReceipts: React.FC<OfferReceiptsProps> = ({
  restaurant,
  onClose,
  onLockDeal
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  if (!restaurant || !restaurant.dishes) return null;

  const currentDish = restaurant.dishes[0];
  const comparisonList = currentDish.comparison || [];

  // Identify lowest cost receipt
  const cheapest = [...comparisonList].sort((a, b) => a.finalPrice - b.finalPrice)[0];
  const runnerUp = [...comparisonList].sort((a, b) => a.finalPrice - b.finalPrice)[1] || cheapest;
  const savingsAmount = runnerUp.finalPrice - cheapest.finalPrice;

  const handleSelectReceipt = (item: PlatformReceipt) => {
    audioFX.playStampThud();
    setSelectedPlatform(item.platformId);
    triggerConfetti();
    onLockDeal(restaurant, currentDish, item.platformName, item.finalPrice, savingsAmount);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-6xl rounded-3xl glass-editorial border border-white/20 p-6 sm:p-10 shadow-2xl z-10 text-accent-ivory max-h-[92vh] overflow-y-auto no-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              audioFX.playPop();
              onClose();
            }}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-8 pr-10">
            <div className="flex items-center gap-2 text-xs font-label text-[#E76F51] uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>PAPER RECEIPT COMPARISON SCENE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
              {restaurant.name}
            </h2>
            <p className="text-xs font-label text-zinc-400 mt-1">
              Comparing: {currentDish.name} (Base Price: ₹{currentDish.basePrice})
            </p>
          </div>

          {/* SMART COMPARISON ENGINE CALLOUT */}
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#2A9D8F]/20 via-[#2A9D8F]/10 to-[#E76F51]/20 border border-[#2A9D8F]/40 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <span className="font-label text-xs text-[#2A9D8F] font-bold block uppercase">
                  VERIFIED CHEAPEST PLATFORM RECEIPT
                </span>
                <span className="text-sm font-serif font-bold text-white">
                  You save <strong className="text-[#10B981] text-base font-black">₹{savingsAmount}</strong> with {cheapest?.platformName}!
                </span>
              </div>
            </div>
          </div>

          {/* PHYSICAL UNROLLING PAPER RECEIPTS SCENE (7 PLATFORMS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {comparisonList.map((item, idx) => {
              const isWinner = item.platformId === cheapest?.platformId;
              const isLocked = selectedPlatform === item.platformId;

              return (
                <motion.div
                  key={item.platformId}
                  initial={{ y: -40, opacity: 0, rotate: idx % 2 === 0 ? -2 : 2 }}
                  animate={{ y: 0, opacity: 1, rotate: idx % 2 === 0 ? -2 : 2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className={`paper-receipt receipt-zigzag-bottom p-5 rounded-t-lg flex flex-col justify-between relative border ${
                    isWinner ? 'border-[#10B981] shadow-[0_0_40px_rgba(16,185,129,0.35)]' : 'border-amber-900/10'
                  }`}
                >
                  {/* ANIMATED GREEN INK STAMP ON CHEAPEST DEAL */}
                  {isWinner && (
                    <div className="absolute top-4 right-4 z-20">
                      <motion.div
                        initial={{ scale: 2.5, opacity: 0, rotate: -15 }}
                        animate={{ scale: 1, opacity: 0.95, rotate: -6 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 450, damping: 22 }}
                        className="ink-stamp-green text-[10px]"
                      >
                        BEST DEAL
                      </motion.div>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="border-b border-dashed border-zinc-400/60 pb-3 mb-3">
                      <span className="text-lg font-bold font-serif block text-zinc-900">
                        {item.logo} {item.platformName}
                      </span>
                      <span className="font-label text-[10px] text-zinc-500 block mt-0.5 uppercase tracking-wider">
                        CODE: {item.couponCode}
                      </span>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-1.5 font-label text-xs text-zinc-700 py-1">
                      <div className="flex justify-between">
                        <span>ITEM BASE</span>
                        <span className="font-bold">₹{item.itemPrice}</span>
                      </div>
                      <div className="flex justify-between text-[#D85637]">
                        <span>RESTAURANT DISCOUNT</span>
                        <span className="font-bold">-₹{item.restaurantDiscount}</span>
                      </div>
                      <div className="flex justify-between text-[#D85637]">
                        <span>COUPON DISCOUNT</span>
                        <span className="font-bold">-₹{item.couponDiscount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DELIVERY FEE</span>
                        <span>₹{item.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PLATFORM FEE</span>
                        <span>₹{item.platformFee}</span>
                      </div>
                      {item.cashback > 0 && (
                        <div className="flex justify-between text-[#10B981] font-bold">
                          <span>CASHBACK</span>
                          <span>-₹{item.cashback}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Final Payable Amount & Stamp Button */}
                  <div className="mt-5 pt-3 border-t border-dashed border-zinc-400/60 text-center font-label">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold tracking-wider">
                      FINAL PAYABLE
                    </span>
                    <span className={`text-2xl font-black block my-1 ${isWinner ? 'text-[#10B981]' : 'text-zinc-900'}`}>
                      ₹{item.finalPrice}
                    </span>

                    <button
                      onClick={() => handleSelectReceipt(item)}
                      className={`w-full mt-2 py-2 px-3 rounded font-label text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isWinner
                          ? 'bg-[#10B981] text-white hover:bg-[#059669] shadow-md'
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>DEAL LOCKED!</span>
                        </>
                      ) : (
                        <>
                          <span>STAMP DEAL</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
