import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const PLATFORM_LOGOS = [
  { name: 'Swiggy', icon: '🟠', color: '#F4A261' },
  { name: 'Zomato', icon: '🔴', color: '#E63946' },
  { name: 'EatSure', icon: '🛡️', color: '#2A9D8F' },
  { name: 'SWISH', icon: '⚡', color: '#9B51E0' },
  { name: 'Magicpin', icon: '🟣', color: '#D800A6' },
  { name: 'Foodpanda', icon: '🐼', color: '#FF2B85' },
  { name: 'Uber Eats', icon: '🖤', color: '#10B981' },
];

function MatteCeramicPlateModel({ isRotating = true }: { isRotating?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && isRotating) {
      groupRef.current.rotation.y += delta * 0.45;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.45, 0, 0]}>
      {/* Base Matte Black Ceramic Body */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.95, 2.35, 0.26, 64]} />
        <meshPhysicalMaterial
          color="#0F0C0A"
          roughness={0.35}
          metalness={0.2}
          clearcoat={0.7}
          clearcoatRoughness={0.15}
          reflectivity={0.6}
        />
      </mesh>

      {/* Plate Inner Basin */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[2.65, 2.45, 0.08, 64]} />
        <meshPhysicalMaterial
          color="#161210"
          roughness={0.4}
          metalness={0.15}
          clearcoat={0.6}
        />
      </mesh>

      {/* Bright Metallic Imperial Gold Rim */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[2.85, 0.05, 32, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* Inner Decorative Gold Circle Line */}
      <mesh position={[0, 0.085, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 64]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Central Embossed DISHCOUNT Royal Crest Mark */}
      <group position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.28}
          color="#D4AF37"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.18}
        >
          D I S H C O U N T
        </Text>
        <Text
          position={[0, -0.22, 0]}
          fontSize={0.08}
          color="#F4EBDD"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.25}
        >
          ROYAL DINING INTELLIGENCE
        </Text>
      </group>

      {/* 7 Culinary Seals with Gold Metallic Rim & Clear Upright Text */}
      {PLATFORM_LOGOS.map((platform, i) => {
        const angle = (i / PLATFORM_LOGOS.length) * Math.PI * 2;
        const radius = 1.65;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={platform.name} position={[x, 0.085, z]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Gold Metallic Seal Outer Ring */}
            <mesh position={[0, 0, -0.005]}>
              <ringGeometry args={[0.26, 0.29, 32]} />
              <meshStandardMaterial color="#D4AF37" roughness={0.15} metalness={0.9} />
            </mesh>

            {/* Inner Dark Badge Surface */}
            <mesh position={[0, 0, -0.008]}>
              <circleGeometry args={[0.26, 32]} />
              <meshStandardMaterial color="#0F0C0A" roughness={0.3} />
            </mesh>

            {/* Platform Text Mark */}
            <Text
              fontSize={0.07}
              color="#F4EBDD"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.1}
            >
              {platform.name.toUpperCase()}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

class ThreeErrorBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: any) { console.warn("WebGL/3D Fallback active:", err); }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export const CeramicPlate: React.FC<{ isRotating?: boolean }> = ({ isRotating = true }) => {
  const fallbackPlate = (
    <div className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full bg-[#120E0C] border-[6px] border-[#D4AF37] shadow-[0_0_80px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center relative p-8">
      {/* Outer Circular Seals Layout */}
      {PLATFORM_LOGOS.map((plat, i) => {
        const angle = (i / PLATFORM_LOGOS.length) * Math.PI * 2;
        const radius = 135;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={plat.name}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            className="absolute px-2.5 py-1 rounded-full bg-[#1A1412] border-2 border-[#D4AF37] shadow-lg flex items-center gap-1 text-[10px] font-sans font-bold text-[#F4EBDD]"
          >
            <span>{plat.icon}</span>
            <span>{plat.name}</span>
          </div>
        );
      })}

      <div className="w-full h-full rounded-full border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center bg-[#080706]">
        <span className="font-serif text-3xl text-[#D4AF37] tracking-[0.25em] font-normal drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">D I S H C O U N T</span>
        <span className="text-[10px] font-sans text-[#F4EBDD] uppercase tracking-widest mt-1 font-medium">ROYAL DINING INTELLIGENCE</span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[360px] sm:h-[480px] relative flex items-center justify-center">
      <ThreeErrorBoundary fallback={fallbackPlate}>
        <Canvas camera={{ position: [0, 3.0, 5.0], fov: 42 }}>
          <ambientLight intensity={0.7} />
          <spotLight
            position={[3, 7, 4]}
            angle={0.4}
            penumbra={0.8}
            intensity={3.5}
            color="#F4EBDD"
            castShadow
          />
          
          <pointLight position={[-4, 3, -2]} intensity={2.2} color="#D4AF37" />
          <pointLight position={[4, 2, 3]} intensity={2.5} color="#F4A261" />
          <pointLight position={[0, -2, 4]} intensity={2.0} color="#2A9D8F" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <MatteCeramicPlateModel isRotating={isRotating} />
          </Float>

          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.85}
            scale={9}
            blur={3}
            far={5}
          />
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
};
