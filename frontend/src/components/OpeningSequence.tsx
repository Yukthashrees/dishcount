import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CeramicPlate } from './CeramicPlate';
import { audioFX } from '../utils/audio';

export const OpeningSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  // 1: Ember, 2: Receipt Emergence, 3: Thermal Print, 4: Paper Tear Down Middle, 5: Fold to Plate, 6: 3D Engraved Plate, 7: Slide Sideways
  const [stage, setStage] = useState(1);
  const [printIndex, setPrintIndex] = useState(0);

  const platforms = [
    { name: 'Swiggy', sub: 'LIVE OFFER VERIFIED' },
    { name: 'Zomato', sub: 'LIVE OFFER VERIFIED' },
    { name: 'EatSure', sub: 'LIVE OFFER VERIFIED' },
    { name: 'SWISH', sub: 'LIVE OFFER VERIFIED' },
    { name: 'Magicpin', sub: 'LIVE OFFER VERIFIED' },
    { name: 'Foodpanda', sub: 'LIVE OFFER VERIFIED' },
    { name: 'Uber Eats', sub: 'LIVE OFFER VERIFIED' }
  ];

  useEffect(() => {
    audioFX.playChime();

    // Stage 1 -> Stage 2 (Receipt unrolls)
    const t1 = setTimeout(() => {
      setStage(2);
      audioFX.playPaperRustle();
    }, 1100);

    // Stage 2 -> Stage 3 (Line thermal printing)
    const t2 = setTimeout(() => {
      setStage(3);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Stage 3 line printing
  useEffect(() => {
    if (stage === 3) {
      if (printIndex < platforms.length) {
        audioFX.playPrinterTick();
        const printTimer = setTimeout(() => {
          setPrintIndex((prev) => prev + 1);
        }, 300);
        return () => clearTimeout(printTimer);
      } else {
        // Stage 4: Receipt tears itself down the middle
        const tearTimer = setTimeout(() => {
          setStage(4);
          audioFX.playPaperRustle();
        }, 500);

        // Stage 5: Torn receipt folds into ceramic plate
        const foldTimer = setTimeout(() => {
          setStage(5);
        }, 1600);

        // Stage 6: 3D Plate rotates with engraved logo
        const plateTimer = setTimeout(() => {
          setStage(6);
        }, 2800);

        // Stage 7: Plate slides sideways & transforms into homepage
        const endTimer = setTimeout(() => {
          setStage(7);
          setTimeout(() => onComplete(), 1000);
        }, 5800);

        return () => {
          clearTimeout(tearTimer);
          clearTimeout(foldTimer);
          clearTimeout(plateTimer);
          clearTimeout(endTimer);
        };
      }
    }
  }, [stage, printIndex, platforms.length, onComplete]);

  return (
    <motion.div
      key="opening-sequence"
      initial={{ opacity: 1 }}
      animate={{
        opacity: stage === 7 ? 0 : 1,
        x: stage === 7 ? -180 : 0
      }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#070608] text-accent-ivory flex items-center justify-center overflow-hidden select-none"
    >
      {/* Floating Herbs, Coffee Steam, and Spice Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 20,
              opacity: 0,
              scale: Math.random() * 0.8 + 0.3,
            }}
            animate={{
              y: -50,
              x: `calc(${Math.random() * 80 - 40}px)`,
              opacity: [0, 0.6, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
            className="absolute"
          >
            {i % 3 === 0 && <span className="text-sm opacity-40">🌿</span>}
            {i % 3 === 1 && <span className="text-xs opacity-50">✨</span>}
            {i % 3 === 2 && (
              <div className="w-1.5 h-1.5 rounded-full bg-[#E76F51]/40 blur-xs" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Ambient Warm Studio Lighting */}
      <motion.div
        animate={{
          scale: stage >= 2 ? [1, 1.6, 1.3] : 1,
          opacity: stage >= 2 ? [0.3, 0.6, 0.4] : 0.2,
        }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#E76F51]/30 via-[#F4A261]/20 to-[#2A9D8F]/20 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: Glowing Ember */}
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.9] }}
              exit={{ scale: 2, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E76F51] to-[#F4A261] shadow-[0_0_80px_#E76F51] animate-pulse" />
            </motion.div>
          )}

          {/* STAGE 2 & 3: Receipt Unrolls & Thermal Stamping */}
          {(stage === 2 || stage === 3) && (
            <motion.div
              key="stage-2-3"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="w-full max-w-sm rounded-t-lg paper-receipt receipt-zigzag-bottom p-6 shadow-2xl overflow-hidden border border-amber-900/10 text-charcoal-950 font-label"
            >
              {/* Receipt Top Seal */}
              <div className="text-center border-b border-dashed border-zinc-400/60 pb-4 mb-4">
                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[#121015] text-[#F5F0E6] flex items-center justify-center font-serif font-bold text-xs">
                  🍽️
                </div>
                <span className="text-xs font-label font-bold tracking-widest uppercase block text-zinc-800">
                  DISHCOUNT AUDIT RECEIPT
                </span>
                <span className="text-[10px] font-label text-zinc-500 block mt-0.5">
                  LIVE OFFER COMPARISON MATRIX
                </span>
              </div>

              {/* Thermal Line Printing for 7 Platforms */}
              <div className="space-y-2 py-1">
                {platforms.map((p, i) => {
                  const isPrinted = i < printIndex;
                  return (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isPrinted ? 1 : 0, x: isPrinted ? 0 : -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between text-xs font-label border-b border-zinc-200 pb-1.5"
                    >
                      <span className="font-bold text-zinc-900 uppercase">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-[#2A9D8F] font-bold tracking-wider uppercase">
                        {p.sub}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STAGE 4: RECEIPT TEARS ITSELF DOWN THE MIDDLE */}
          {stage === 4 && (
            <motion.div
              key="stage-4-tear"
              className="relative w-full max-w-sm h-64 flex justify-between gap-2 overflow-hidden"
            >
              {/* Left Torn Half */}
              <motion.div
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: -35, rotate: -12, opacity: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-1/2 paper-receipt p-4 rounded-tl-lg shadow-xl text-charcoal-950 font-label border-r-2 border-dashed border-zinc-400"
              >
                <div className="w-6 h-6 rounded-full bg-[#121015] text-white flex items-center justify-center font-serif text-xs mb-2">
                  🍽️
                </div>
                <span className="font-bold text-xs block uppercase">SWIGGY</span>
                <span className="font-bold text-xs block uppercase">ZOMATO</span>
                <span className="font-bold text-xs block uppercase">EATSURE</span>
              </motion.div>

              {/* Right Torn Half */}
              <motion.div
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: 35, rotate: 12, opacity: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-1/2 paper-receipt p-4 rounded-tr-lg shadow-xl text-charcoal-950 font-label border-l-2 border-dashed border-zinc-400"
              >
                <span className="font-bold text-xs block uppercase text-right">SWISH</span>
                <span className="font-bold text-xs block uppercase text-right">MAGICPIN</span>
                <span className="font-bold text-xs block uppercase text-right">UBER EATS</span>
              </motion.div>
            </motion.div>
          )}

          {/* STAGE 5 & 6: TORN RECEIPT FOLDS INTO CERAMIC PLATE & Embossed Logo Reveal */}
          {(stage === 5 || stage === 6) && (
            <motion.div
              key="stage-5-6-plate"
              initial={{ opacity: 0, scale: 0.6, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <CeramicPlate isRotating={true} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};
