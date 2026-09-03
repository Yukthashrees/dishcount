import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const PriceHistoryChart: React.FC = () => {
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '3M'>('7D');

  const RANGE_DATA = {
    '7D': [
      { label: '30 days ago', price: 394 },
      { label: '7 days ago', price: 361 },
      { label: 'Yesterday', price: 329 },
      { label: 'Today', price: 307 },
    ],
    '30D': [
      { label: '90 days ago', price: 420 },
      { label: '30 days ago', price: 394 },
      { label: '14 days ago', price: 350 },
      { label: 'Today', price: 307 },
    ],
    '3M': [
      { label: '6 months ago', price: 440 },
      { label: '3 months ago', price: 410 },
      { label: '30 days ago', price: 394 },
      { label: 'Today', price: 307 },
    ]
  };

  const points = RANGE_DATA[activeRange];

  return (
    <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto">
      <div className="bg-[#15100E] border border-[#C8A96B]/20 rounded-lg p-10 shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 border-b border-white/05 pb-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-1">
              HISTORICAL PRICE TRENDS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4EBDD] uppercase tracking-wide">
              PRICES HAVE A MEMORY.
            </h2>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-4 text-xs font-sans">
            {(['7D', '30D', '3M'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-4 py-2 rounded text-xs tracking-widest uppercase transition-colors ${
                  activeRange === range
                    ? 'bg-[#C8A96B] text-[#080706] font-semibold'
                    : 'text-[#8A7E76] hover:text-[#F4EBDD]'
                }`}
              >
                {range === '7D' ? '7 DAYS' : range === '30D' ? '30 DAYS' : '3 MONTHS'}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Champagne SVG Line Graph */}
        <div className="relative h-48 w-full flex items-end justify-between px-6 border-b border-white/05">
          
          {/* Subtle Horizontal Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
            <div className="border-b border-white/20 w-full" />
          </div>

          {points.map((pt, idx) => {
            const heightPercent = ((pt.price - 280) / 160) * 100;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center justify-end h-full group">
                <span className="text-sm font-sans font-medium text-[#C8A96B] mb-2">
                  ₹{pt.price}
                </span>

                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${heightPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="w-[2px] bg-[#C8A96B] group-hover:bg-[#F4EBDD] transition-colors"
                />

                <span className="text-[11px] font-sans text-[#8A7E76] mt-4 tracking-wider uppercase">
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
