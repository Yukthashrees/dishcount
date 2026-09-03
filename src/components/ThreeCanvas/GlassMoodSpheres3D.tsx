import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { MOOD_BOOKLETS } from '../../data/moods';
import { MoodBooklet } from '../../types';

function GlassSphereWithEnvironment({
  mood,
  position,
  isSelected,
  onSelect
}: {
  mood: MoodBooklet;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load inner environment texture
  const texture = useLoader(THREE.TextureLoader, mood.image);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <group position={position}>
        
        {/* Inner Environment Sphere (Miniature World Inside Glass) */}
        <mesh scale={0.72}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>

        {/* Outer Translucent Refractive Glass Shell */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onSelect}
          scale={hovered ? 1.15 : isSelected ? 1.2 : 1}
        >
          <sphereGeometry args={[1.05, 64, 64]} />
          <meshPhysicalMaterial
            color={mood.colorHex}
            roughness={0.05}
            metalness={0.1}
            transmission={0.92}
            thickness={1.2}
            ior={1.52}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            reflectivity={0.95}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Floating Label below Sphere */}
        <Text
          position={[0, -1.4, 0]}
          fontSize={0.28}
          font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuCi9uu26E5pY2-V5F7GZ1.woff"
          color={hovered || isSelected ? '#E76F51' : '#F5F0E6'}
          anchorX="center"
          anchorY="top"
        >
          {mood.name}
        </Text>
      </group>
    </Float>
  );
}

export const GlassMoodSpheres3D = ({
  activeMood,
  onSelectMood
}: {
  activeMood: string | null;
  onSelectMood: (id: string) => void;
}) => {
  return (
    <div className="w-full h-[550px] relative pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#FFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#E76F51" />

        {MOOD_BOOKLETS.map((mood) => (
          <GlassSphereWithEnvironment
            key={mood.id}
            mood={mood}
            position={mood.spatialPosition}
            isSelected={activeMood === mood.id}
            onSelect={() => onSelectMood(mood.id)}
          />
        ))}
      </Canvas>
    </div>
  );
};
