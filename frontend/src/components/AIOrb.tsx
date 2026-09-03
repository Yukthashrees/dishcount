import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { Sparkles as SparklesIcon, Bot, Send, ArrowUpRight, X } from 'lucide-react';
import * as THREE from 'three';
import { PRESET_PROMPTS, AI_KNOWLEDGE_BASE } from '../data/aiPrompts';
import { RESTAURANTS } from '../data/restaurants';
import { Restaurant } from '../types';
import { audioFX } from '../utils/audio';

function HologramOrbCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.1;
      coreRef.current.rotation.z += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.7;
      ringRef.current.rotation.y -= delta * 1.3;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 3]} />
        <meshPhysicalMaterial
          color="#F5F0E6"
          emissive="#E76F51"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[1.85, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#2A9D8F"
          emissive="#2A9D8F"
          emissiveIntensity={0.8}
        />
      </mesh>

      <Sparkles count={80} scale={4} size={3} speed={0.8} color="#E76F51" />
    </group>
  );
}

export const AIOrb = ({ onSelectRestaurant }: { onSelectRestaurant: (r: Restaurant) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState(PRESET_PROMPTS[0]);
  const [customInput, setCustomInput] = useState('');

  const keyLower = activePrompt.toLowerCase();
  const matchedData = AI_KNOWLEDGE_BASE[keyLower] || AI_KNOWLEDGE_BASE['dinner for 2 under ₹800'];

  const handleSelectPrompt = (p: string) => {
    audioFX.playPop();
    setActivePrompt(p);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    audioFX.playChime();
    setActivePrompt(customInput);
    setCustomInput('');
  };

  return (
    <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 text-[#2A9D8F] text-xs font-label font-semibold tracking-widest uppercase mb-3">
          <SparklesIcon className="w-3.5 h-3.5 animate-spin-slow" />
          <span>HOLOGRAPHIC CERAMIC AI GUIDE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-accent-ivory">
          3D Orbiting Recommendation Assistant
        </h2>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* Left 3D Holographic Orb Canvas */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full h-[320px] relative pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={2} color="#E76F51" />
              <Float speed={3} rotationIntensity={1} floatIntensity={1.2}>
                <HologramOrbCore />
              </Float>
            </Canvas>
          </div>

          {/* Quick Prompt Chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-lg">
            {PRESET_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPrompt(prompt)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-label transition-all border ${
                  activePrompt === prompt
                    ? 'bg-[#E76F51] text-white border-[#E76F51] shadow-lg shadow-[#E76F51]/30'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask Holographic AI guide..."
              className="flex-1 px-4 py-2.5 rounded-full glass-editorial text-xs font-label text-white placeholder-zinc-500 focus:outline-none border border-white/10"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-full bg-[#2A9D8F] text-white font-label text-xs font-bold uppercase tracking-wider hover:bg-[#1F7A6F] transition-all flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right Orbiting Recommendation Satellites */}
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePrompt}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-2xl glass-editorial border border-white/10 text-xs font-label text-zinc-300">
                <span className="text-[#2A9D8F] font-bold block mb-1">
                  AI RECOMMENDATION SYNTHESIS //
                </span>
                {matchedData.response}
              </div>

              {matchedData.recommendations.map((rec, idx) => {
                const targetRest = RESTAURANTS.find((r) => r.id === rec.id);

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, x: 6 }}
                    onClick={() => {
                      if (targetRest) {
                        audioFX.playChime();
                        onSelectRestaurant(targetRest);
                      }
                    }}
                    className="p-5 rounded-3xl glass-editorial border border-white/10 hover:border-[#E76F51]/50 cursor-pointer transition-all flex items-center justify-between group shadow-xl"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#E76F51]/20 text-[#E76F51] font-label text-[10px] font-bold uppercase">
                          ORBITING SATELLITE #{idx + 1}
                        </span>
                        <span className="font-label text-xs text-zinc-400">
                          {rec.platform}
                        </span>
                      </div>

                      <h4 className="font-serif text-xl font-bold text-accent-ivory group-hover:text-[#F4A261] transition-colors">
                        {rec.dishName}
                      </h4>

                      <p className="text-xs text-zinc-400 font-light mt-1">
                        {rec.reason}
                      </p>

                      <div className="mt-3 flex items-center gap-3 font-label">
                        <span className="text-sm font-bold text-[#2A9D8F]">
                          Final: ₹{rec.finalCost}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] font-bold">
                          Save ₹{rec.savings}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#E76F51] text-white transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
