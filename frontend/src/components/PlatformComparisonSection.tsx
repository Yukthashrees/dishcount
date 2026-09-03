import React from 'react';

export const PlatformComparisonSection: React.FC = () => {
  const PLATFORMS = [
    { name: 'Swiggy', feeInfo: 'Swiggy One membership waives delivery fees above ₹149. Platform fee: ₹7.' },
    { name: 'Zomato', feeInfo: 'Zomato Gold includes free delivery & up to 30% OFF extra at partner restaurants. Platform fee: ₹6.' },
    { name: 'EatSure', feeInfo: 'Zero platform fees & zero delivery charges on multi-brand orders. Direct kitchen fulfillment.' },
    { name: 'SWISH', feeInfo: '10-minute lightning dispatch model with dynamic distance-based delivery fee. Platform fee: ₹5.' },
    { name: 'Magicpin', feeInfo: 'Aggregates direct merchant coupons & SuperPin rewards for max discount. Platform fee: ₹4.' },
    { name: 'Foodpanda', feeInfo: 'Flat voucher discounts on group orders above minimum threshold. Platform fee: ₹5.' },
    { name: 'Uber Eats', feeInfo: 'Standard restaurant menu list rates with direct distance delivery surcharges. Platform fee: ₹7.' }
  ];

  return (
    <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-white/05">
      
      <div className="text-center mb-16">
        <span className="text-[10px] tracking-[0.25em] font-sans text-[#C8A96B] uppercase block font-semibold mb-2">
          TRANSPARENCY REPORT
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F4EBDD] uppercase tracking-wide">
          WHY FOOD PRICES CHANGE
        </h2>
        <p className="text-xs font-sans text-[#8A7E76] font-light max-w-xl mx-auto mt-3">
          Every platform calculates final payable cost using different restaurant agreements, delivery fees, platform surcharges, and membership perks.
        </p>
      </div>

      <div className="divide-y divide-white/05 border-t border-b border-white/05 font-sans">
        {PLATFORMS.map((platform) => (
          <div key={platform.name} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#15100E]/50 px-4 transition-colors">
            <span className="font-serif text-2xl text-[#F4EBDD] font-light uppercase tracking-wider group-hover:text-[#C8A96B] transition-colors">
              {platform.name}
            </span>
            <p className="text-xs text-[#8A7E76] font-light max-w-md">
              {platform.feeInfo}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};
