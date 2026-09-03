import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { audioFX } from '../utils/audio';

interface LivePriceScanProps {
  query: string;
  onScanComplete: () => void;
}

export const LivePriceScan: React.FC<LivePriceScanProps> = ({ query, onScanComplete }) => {
  const [scanStep, setScanStep] = useState(0);

  const scanPlatforms = [
    { name: 'SWIGGY', status: 'Checking price & Swiggy One membership discount...' },
    { name: 'ZOMATO', status: 'Checking Zomato Gold coupon offers & delivery surge...' },
    { name: 'EATSURE', status: 'Checking zero platform fee pass & hygiene seal...' },
    { name: 'SWISH', status: 'Checking 10-minute lightning dispatch availability...' },
    { name: 'MAGICPIN', status: 'Checking SuperPin 60% surge voucher & cashback...' },
    { name: 'FOODPANDA', status: 'Checking minimum order requirements & global voucher...' },
    { name: 'UBER EATS', status: 'Checking priority delivery charges & restaurant fees...' }
  ];

  useEffect(() => {
    audioFX.playChime();

    const interval = setInterval(() => {
      setScanStep((prev) => {
        audioFX.playScanTick();
        if (prev < scanPlatforms.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => onScanComplete(), 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onScanComplete, scanPlatforms.length]);

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none">
      
      {/* Vertical Scanning Line */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-coral-500 to-transparent pointer-events-none opacity-80"
      />

      <div className="w-full max-w-lg space-y-6">
        <div>
          <span className="text-xs font-sans font-bold tracking-widest text-coral-500 uppercase block mb-1">
            LIVE ENGINE PRICE SCANNING
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
            Searching true final price for "{query}"
          </h2>
        </div>

        {/* Sequential Platform Status Cards */}
        <div className="space-y-2.5 font-sans">
          {scanPlatforms.map((p, idx) => {
            const isScanned = idx <= scanStep;
            const isCurrent = idx === scanStep;

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isScanned ? 1 : 0.3, y: 0 }}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'bg-[#FFFDF9] border-coral-500 shadow-md scale-[1.02]'
                    : isScanned
                    ? 'bg-ivory-100/60 border-ivory-300'
                    : 'bg-transparent border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isScanned ? (
                    <CheckCircle2 className="w-4 h-4 text-savings-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-charcoal-300 border-t-coral-500 animate-spin" />
                  )}
                  <span className="font-bold text-xs text-charcoal-950 tracking-wider">
                    {p.name}
                  </span>
                </div>

                <span className="text-[11px] text-charcoal-500 font-medium truncate max-w-[220px]">
                  {p.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
