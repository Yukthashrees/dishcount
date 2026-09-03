import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Image, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { MOODS } from '../../data/moods';

function SpatialMenuPanel({ mood, position, rotation, onSelect, isSelected, onHover, isHovered, anyHovered }) {
  const groupRef = useRef();
  const leftCoverRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth position & scale lerp on hover
      const targetZ = isHovered ? position[2] + 0.8 : anyHovered && !isHovered ? position[2] - 0.3 : position[2];
      const targetScale = isHovered ? 1.1 : anyHovered && !isHovered ? 0.94 : 1;

      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
    }

    if (leftCoverRef.current) {
      // Menu cover unfolds like a luxury restaurant booklet on hover
      const targetAngle = isHovered || isSelected ? -0.45 : 0;
      leftCoverRef.current.rotation.y = THREE.MathUtils.lerp(leftCoverRef.current.rotation.y, targetAngle, 0.12);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={onSelect}
      onPointerOver={() => onHover(mood.id)}
      onPointerOut={() => onHover(null)}
    >
      {/* Main Base Panel (Ceramic & Dark Linen Backer) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.38, 2.3, 0.05]} />
        <meshPhysicalMaterial
          color="#141018"
          roughness={0.3}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Embedded Food Imagery on Panel (Revealed when cover unfolds) */}
      <Image
        url={mood.image}
        position={[0, 0.42, 0.035]}
        scale={[1.24, 1.15]}
        transparent
        opacity={isHovered ? 1.0 : anyHovered ? 0.65 : 0.9}
      />

      {/* Outer Accent Frame */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.3, 2.22, 0.005]} />
        <meshStandardMaterial
          color={isHovered ? mood.colorHex : "#2A2230"}
          roughness={0.3}
        />
      </mesh>

      {/* Menu Title Text directly on panel (Zero floating label cards!) */}
      <Text
        position={[0, -0.28, 0.04]}
        fontSize={0.13}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slLCN5-E7PZ1UfnT2G6lI.woff"
      >
        {mood.name.toUpperCase()}
      </Text>

      {/* Atmospheric Subtitle */}
      <Text
        position={[0, -0.48, 0.04]}
        fontSize={0.065}
        color="#F4A261"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.18}
        textAlign="center"
      >
        {mood.environment}
      </Text>

      {/* Restaurant Count & Savings Line Item */}
      <Text
        position={[0, -0.72, 0.04]}
        fontSize={0.06}
        color="#2A9D8F"
        anchorX="center"
        anchorY="middle"
      >
        {`${mood.curatedCount} RESTAURANTS • ${mood.savingsText.toUpperCase()}`}
      </Text>

      {/* Unfolding Left Menu Cover */}
      <group ref={leftCoverRef} position={[-0.67, 0, 0.035]}>
        <mesh position={[-0.67, 0, 0]}>
          <boxGeometry args={[1.34, 2.26, 0.03]} />
          <meshPhysicalMaterial
            color={mood.colorHex}
            roughness={0.25}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
          />
        </mesh>

        <Text
          position={[-0.67, 0.4, 0.025]}
          fontSize={0.12}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {mood.name.toUpperCase()}
        </Text>

        <Text
          position={[-0.67, -0.4, 0.025]}
          fontSize={0.07}
          color="#F4A261"
          anchorX="center"
          anchorY="middle"
        >
          SELECT MENU
        </Text>
      </group>

      {/* Ambient Sparkles for Hovered Menu */}
      {isHovered && (
        <Sparkles count={15} scale={2} size={2.5} speed={0.5} color={mood.colorHex} />
      )}
    </group>
  );
}

export const MenuBooklets3D = ({ activeMood, onSelectMood }) => {
  const [hoveredMood, setHoveredMood] = useState(null);

  // Exact 7-Booklet Symmetrical Spatial Arc Layout:
  //         Rooftop Nights (Top Center)
  //  Aesthetic Café               Romantic Dinner
  // Breakfast Ritual              Calm & Quiet
  // Family Dining                 Late Night
  const spatialArcLayout = [
    { pos: [0.0, 1.85, 0.0], rot: [0.0, 0.0, 0] },     // Rooftop Nights (Top Center)
    { pos: [-2.9, 1.0, -0.2], rot: [0.03, 0.15, 0] },  // Aesthetic Café (Upper Left)
    { pos: [2.9, 1.0, -0.2], rot: [-0.03, -0.15, 0] }, // Romantic Dinner (Upper Right)
    { pos: [-4.5, -0.2, -0.5], rot: [0.05, 0.25, 0] }, // Breakfast Ritual (Mid Far Left)
    { pos: [4.5, -0.2, -0.5], rot: [-0.05, -0.25, 0] },// Calm & Quiet (Mid Far Right)
    { pos: [-3.1, -1.5, -0.8], rot: [0.04, 0.18, 0] }, // Family Dining (Bottom Left)
    { pos: [3.1, -1.5, -0.8], rot: [-0.04, -0.18, 0] }  // Late Night (Bottom Right)
  ];

  return (
    <div className="w-full h-[600px] relative pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 7.2], fov: 50 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} />
        <pointLight position={[-8, -5, -5]} intensity={1.2} color="#E76F51" />
        <pointLight position={[8, 5, 5]} intensity={1.5} color="#2A9D8F" />

        {MOODS.map((mood, idx) => {
          const item = spatialArcLayout[idx] || { pos: [0, 0, 0], rot: [0, 0, 0] };
          return (
            <SpatialMenuPanel
              key={mood.id}
              mood={mood}
              position={item.pos}
              rotation={item.rot}
              isSelected={activeMood === mood.id}
              isHovered={hoveredMood === mood.id}
              anyHovered={Boolean(hoveredMood)}
              onHover={setHoveredMood}
              onSelect={() => onSelectMood(mood.id)}
            />
          );
        })}
      </Canvas>
    </div>
  );
};
