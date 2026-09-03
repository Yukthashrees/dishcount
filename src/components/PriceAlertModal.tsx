import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check } from 'lucide-react';
import { audioFX } from '../utils/audio';

interface PriceAlertModalProps {
  isOpen: boolean;
  dishName: string;
  currentPrice: number;
  onClose: () => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  dishName,
  currentPrice,
  onClose
}) => {
  const [targetPrice, setTargetPrice] = useState(Math.round(currentPrice * 0.85));
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    audioFX.playChime();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md rounded-3xl bg-[#FFFDF9] border border-ivory-300 p-6 shadow-2xl z-10 text-charcoal-950 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-ivory-200 text-charcoal-500"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-coral-500/10 text-coral-500 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl font-bold">Set Price Alert</h3>
          <p className="text-xs font-sans text-charcoal-500 mt-1 mb-6">
            Alert me when {dishName} drops below target price across any platform.
          </p>

          <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200 font-sans text-sm space-y-3 mb-6">
            <div className="flex justify-between text-xs">
              <span className="text-charcoal-500">Current Lowest:</span>
              <span className="font-bold text-charcoal-950">₹{currentPrice}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-charcoal-500 font-medium">Target Alert Price:</span>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-24 px-3 py-1 rounded-lg bg-white border border-ivory-300 text-right font-bold text-coral-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 px-4 rounded-full bg-charcoal-950 hover:bg-coral-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-savings-500" />
                <span>ALERT SET!</span>
              </>
            ) : (
              <span>CREATE PRICE DROP ALERT</span>
            )}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
