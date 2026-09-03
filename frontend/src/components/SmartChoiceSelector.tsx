import React from 'react';
import { ChoiceMode } from '../types';

interface SmartChoiceSelectorProps {
  choiceMode: ChoiceMode;
  setChoiceMode: (mode: ChoiceMode) => void;
  speedSliderVal: number;
  setSpeedSliderVal: (val: number) => void;
}

export const SmartChoiceSelector: React.FC<SmartChoiceSelectorProps> = ({
  speedSliderVal,
  setSpeedSliderVal
}) => {
  // Interpolated recommendation preview based on slider position
  const currentPrice = Math.round(307 + (speedSliderVal / 100) * 44);
  const currentTime = Math.round(35 - (speedSliderVal / 100) * 25);

  return (
    <section className="py-12 px-6 sm:px-12 max-w-4xl mx-auto">
      <div className="bg-[#15100E] border border-[#C8A96B]/20 rounded-lg p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-1">
            TRADEOFF ENGINE
          </span>
          <h3 className="font-serif text-3xl font-light text-[#F4EBDD] uppercase tracking-wide">
            PRICE VS SPEED
          </h3>
        </div>

        {/* Interactive Luxury Slider */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs tracking-[0.2em] font-sans uppercase font-medium">
            <span className="text-[#4F8A70]">CHEAPEST</span>
            <span className="text-[#C8A96B]">SPEED</span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={speedSliderVal}
              onChange={(e) => setSpeedSliderVal(Number(e.target.value))}
              className="w-full h-1 bg-[#1B1512] rounded-lg appearance-none cursor-pointer accent-[#C8A96B]"
            />
          </div>

          {/* Dynamic Recommendation Card */}
          <div className="pt-4 border-t border-white/05 flex items-center justify-between font-sans">
            <div className="text-left">
              <span className="text-[10px] tracking-widest text-[#8A7E76] uppercase block">RECOMMENDED OFFER</span>
              <span className="text-xl font-medium text-[#F4EBDD]">₹{currentPrice}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] tracking-widest text-[#8A7E76] uppercase block">ESTIMATED TIME</span>
              <span className="text-xl font-medium text-[#C8A96B]">{currentTime} min</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
