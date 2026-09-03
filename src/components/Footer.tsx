import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-32 py-24 px-6 sm:px-12 bg-[#080706] border-t border-[#C8A96B]/20 text-[#F4EBDD]">
      
      {/* FINAL HERO CALLOUT */}
      <div className="max-w-4xl mx-auto text-center mb-24 space-y-3">
        <h2 className="font-serif text-4xl sm:text-7xl font-light tracking-wide uppercase">
          STOP GUESSING.
        </h2>
        <h2 className="font-serif text-4xl sm:text-7xl font-normal italic tracking-wide text-[#C8A96B] uppercase">
          START COMPARING.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#8A7E76] font-light max-w-md mx-auto pt-4">
          DISHCOUNT computes the true final payable price across Swiggy, Zomato, EatSure, SWISH, Magicpin, Foodpanda, and Uber Eats.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/05 pt-12 text-center md:text-left font-sans text-xs">
        
        <div>
          <span className="font-serif text-2xl tracking-[0.25em] text-[#F4EBDD] font-light uppercase block mb-1">
            DISHCOUNT
          </span>
          <span className="text-[#8A7E76] font-light block">
            Royal Editorial Dining Intelligence Engine
          </span>
        </div>

        <div className="text-[#8A7E76] font-light max-w-md">
          Supported platforms: Swiggy, Zomato, EatSure, SWISH, Magicpin, Foodpanda, Uber Eats.
        </div>

        <div className="text-[#8A7E76] font-light">
          © 2026 DISHCOUNT INC. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
};
