import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MOODS } from '../../data/moods';

function GlassTranslucentSphere({ mood, position, onSelect, isSelected, onHover, isHovered }) {
  const outerSphereRef = useRef();
  const innerCoreRef = useRef();

  useFrame((state, delta) => {
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.x += delta * 0.3;
      outerSphereRef.current.rotation.y += delta * 0.5;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.z -= delta * 0.7;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.4}>
      <group
        position={position}
        onClick={onSelect}
        onPointerOver={() => onHover(mood.id)}
        onPointerOut={() => onHover(null)}
        scale={isSelected ? 1.45 : isHovered ? 1.25 : 1}
      >
        {/* Outer Translucent Glass Sphere with High Refraction & Clearcoat */}
        <mesh ref={outerSphereRef}>
          <sphereGeometry args={[1.05, 48, 48]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.9}
            roughness={0.05}
            ior={1.52}
            thickness={1.3}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
            reflectivity={0.95}
            attenuationColor={mood.colorHex}
            attenuationDistance={0.9}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner Glowing Miniature Environment Core */}
        <mesh ref={innerCoreRef} scale={0.52}>
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={mood.colorHex}
            emissive={mood.colorHex}
            emissiveIntensity={isHovered || isSelected ? 1.2 : 0.7}
            roughness={0.2}
          />
        </mesh>

        {/* Ambient Volumetric Sparkles Inside Glass Sphere */}
        <Sparkles count={20} scale={1.5} size={2.5} speed={0.5} color={mood.colorHex} />

        {/* Hover Information Label HTML Overlay */}
        {(isHovered || isSelected) && (
          <Html position={[0, 1.4, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
            <div className="px-4 py-3 rounded-2xl glass-etienne border border-white/20 shadow-2xl backdrop-blur-xl text-center min-w-[200px] pointer-events-none transition-all">
              <span className="editorial-tag text-[10px] text-[#F4A261] font-bold block mb-1">
                {mood.name}
              </span>
              <span className="editorial-tag text-[9px] text-paper-100 block">
                {mood.curatedCount} curated restaurants
              </span>
              <span className="editorial-tag text-[9px] text-[#2A9D8F] block font-bold mt-0.5">
                {mood.savingsText}
              </span>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

export const MoodSpheres3D = ({ activeMood, onSelectMood }) => {
  const [hoveredMood, setHoveredMood] = useState(null);

  const positions = [
    [-3.2, 1.4, 0],
    [-1.1, -1.3, 1.1],
    [1.1, 1.6, -0.4],
    [3.2, -0.6, 0.4],
    [-2.2, -1.8, -1.0],
    [0.4, -1.6, -0.2],
    [2.3, 1.2, 0.8],
    [0.0, 2.1, -1.4]
  ];

  return (
    <div className="w-full h-[520px] relative pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 7.2], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#FFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#E76F51" />

        {MOODS.map((mood, idx) => (
          <GlassTranslucentSphere
            key={mood.id}
            mood={mood}
            position={positions[idx] || [0, 0, 0]}
            isSelected={activeMood === mood.id}
            isHovered={hoveredMood === mood.id}
            onHover={setHoveredMood}
            onSelect={() => onSelectMood(mood.id)}
          />
        ))}
      </Canvas>
    </div>
  );
};
