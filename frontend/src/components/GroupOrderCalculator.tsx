import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const GroupOrderCalculator: React.FC = () => {
  const [peopleCount, setPeopleCount] = useState(4);

  const PLATFORM_GROUP_TOTALS = [
    { platformName: 'SWIGGY', finalTotal: 1248 },
    { platformName: 'ZOMATO', finalTotal: 1192 },
    { platformName: 'EATSURE', finalTotal: 1310 },
    { platformName: 'SWISH', finalTotal: 1280 },
    { platformName: 'MAGICPIN', finalTotal: 1109, isCheapest: true },
    { platformName: 'FOODPANDA', finalTotal: 1220 },
    { platformName: 'UBER EATS', finalTotal: 1320 }
  ];

  const cheapest = PLATFORM_GROUP_TOTALS.find(p => p.isCheapest)!;
  const mostExpensive = Math.max(...PLATFORM_GROUP_TOTALS.map(p => p.finalTotal));
  const savings = mostExpensive - cheapest.finalTotal;

  return (
    <section className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
      <div className="bg-[#15100E] border border-[#C8A96B]/20 rounded-lg p-10 shadow-2xl">
        
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-2">
            GROUP ORDER ENGINE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F4EBDD] uppercase tracking-wide">
            ORDERING FOR A GROUP?
          </h2>
        </div>

        {/* Group Configurator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded bg-[#0D0B0A] border border-white/05 mb-8 font-sans">
          <div>
            <span className="text-xs text-[#8A7E76] uppercase tracking-widest block mb-1">GROUP SIZE</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                className="w-8 h-8 rounded bg-[#15100E] border border-white/10 text-[#F4EBDD] font-bold"
              >
                -
              </button>
              <span className="text-lg font-medium text-[#F4EBDD]">{peopleCount} People</span>
              <button
                onClick={() => setPeopleCount(peopleCount + 1)}
                className="w-8 h-8 rounded bg-[#15100E] border border-white/10 text-[#F4EBDD] font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] tracking-widest text-[#8A7E76] uppercase block">BEST GROUP PRICE</span>
            <span className="text-3xl font-medium text-[#C8A96B]">₹{cheapest.finalTotal}</span>
            <span className="text-xs font-semibold text-[#4F8A70] block uppercase tracking-wider mt-1">SAVE ₹{savings}</span>
          </div>
        </div>

        {/* Platform Group Totals Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-sans text-xs">
          {PLATFORM_GROUP_TOTALS.map((item) => (
            <motion.div
              key={item.platformName}
              whileHover={{ y: -3 }}
              className={`p-4 rounded border text-center ${
                item.isCheapest
                  ? 'bg-[#15100E] border-[#C8A96B] shadow-[0_0_20px_rgba(200,169,107,0.15)]'
                  : 'bg-[#0D0B0A] border-white/05'
              }`}
            >
              <span className="text-[10px] tracking-widest text-[#8A7E76] block uppercase mb-1">
                {item.platformName}
              </span>
              <span className={`text-lg font-medium ${item.isCheapest ? 'text-[#C8A96B]' : 'text-[#F4EBDD]'}`}>
                ₹{item.finalTotal}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
