import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function HologramCore() {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.2;
      coreRef.current.rotation.z += delta * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.8;
      ringRef.current.rotation.y -= delta * 1.4;
    }
  });

  return (
    <group>
      {/* Core Glowing Orb */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 3]} />
        <meshPhysicalMaterial
          color="#2A9D8F"
          emissive="#E76F51"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbiting Particle Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#F4A261"
          emissive="#F4A261"
          emissiveIntensity={0.8}
        />
      </mesh>

      <Sparkles count={80} scale={4} size={3} speed={0.8} color="#E76F51" />
    </group>
  );
}

export const HolographicOrb3D = () => {
  return (
    <div className="w-full h-[320px] relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#E76F51" />
        <Float speed={3} rotationIntensity={1} floatIntensity={1.2}>
          <HologramCore />
        </Float>
      </Canvas>
    </div>
  );
};
