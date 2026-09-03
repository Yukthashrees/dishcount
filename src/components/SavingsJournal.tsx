import React from 'react';
import { motion } from 'framer-motion';

export const SavingsJournal: React.FC = () => {
  return (
    <section id="savings-section" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto space-y-32">
      
      {/* LUXURY PERSONAL SAVINGS */}
      <div className="bg-[#15100E] border border-[#C8A96B]/20 rounded-lg p-12 shadow-2xl text-center">
        
        <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-2">
          PERSONAL SAVINGS
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4EBDD] uppercase tracking-wide mb-8">
          HOW MUCH HAVE YOU SAVED?
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sans text-6xl sm:text-8xl font-light text-[#C8A96B] tracking-tight my-4"
        >
          ₹4,861
        </motion.div>

        <div className="flex items-center justify-center gap-12 font-sans text-xs text-[#8A7E76] uppercase tracking-widest pt-8 border-t border-white/05 max-w-md mx-auto">
          <div>
            <span className="text-[#F4EBDD] font-medium text-lg block mb-0.5">37</span>
            <span>COMPARISONS</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div>
            <span className="text-[#F4EBDD] font-medium text-lg block mb-0.5">₹131</span>
            <span>AVG SAVING</span>
          </div>
        </div>

      </div>

      {/* SAVINGS STORIES — EDITORIAL AD CAMPAIGN */}
      <div className="text-center space-y-16 py-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-serif text-4xl sm:text-6xl text-[#F4EBDD]/50 uppercase tracking-wide font-light">
            YOU ALMOST PAID <span className="line-through decoration-[#B86B4B]">₹486</span>.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="font-serif text-4xl sm:text-6xl text-[#F4EBDD] uppercase tracking-wide font-light">
            WE FOUND IT FOR <span className="text-[#C8A96B]">₹342</span>.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="font-serif text-5xl sm:text-7xl text-[#4F8A70] uppercase tracking-wider font-normal">
            YOU SAVED ₹144.
          </h2>
        </motion.div>

      </div>

    </section>
  );
};
