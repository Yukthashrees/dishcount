import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoverType, setHoverType] = useState<'none' | 'button' | 'image' | 'price'>('none');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = (e.target as HTMLElement).closest('button, a, input, img, [data-cursor]');
      if (!target) {
        setHoverType('none');
        return;
      }

      if (target.tagName.toLowerCase() === 'img' || target.closest('img')) {
        setHoverType('image');
      } else if (target.classList.contains('price-row') || target.textContent?.includes('₹')) {
        setHoverType('price');
      } else {
        setHoverType('button');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Outer Ring / Tag */}
      <motion.div
        animate={{
          x: position.x - (hoverType !== 'none' ? 24 : 6),
          y: position.y - (hoverType !== 'none' ? 24 : 6),
          scale: hoverType !== 'none' ? 1.3 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className={`w-12 h-12 rounded-full border border-[#C8A96B]/50 flex items-center justify-center text-[9px] font-sans font-semibold tracking-widest text-[#F4EBDD] backdrop-blur-[2px] transition-colors ${
          hoverType === 'image' || hoverType === 'price' ? 'bg-[#15100E]/90 border-[#C8A96B]' : 'bg-transparent'
        }`}
      >
        {hoverType === 'image' && 'VIEW'}
        {hoverType === 'price' && 'COMPARE'}
      </motion.div>

      {/* Central Warm Ivory Dot */}
      <motion.div
        animate={{
          x: position.x - 2,
          y: position.y - 2,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
        className="w-1 h-1 rounded-full bg-[#F4EBDD]"
      />
    </div>
  );
};
