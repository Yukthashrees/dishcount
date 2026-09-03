import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function FloatingHerbs() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  // Small organic leaf meshes
  const herbPositions = [
    [-1.2, 0.6, 0.8],
    [1.4, 0.9, -0.6],
    [-0.8, 1.2, -1.0],
    [0.9, 0.7, 1.2],
    [-1.5, 0.4, -0.5]
  ];

  return (
    <group ref={groupRef}>
      {herbPositions.map((pos, idx) => (
        <Float key={idx} speed={3 + idx} rotationIntensity={2} floatIntensity={1.5}>
          <mesh position={pos} scale={[0.15, 0.08, 0.15]}>
            <dodecahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#2A9D8F" : "#70E000"}
              roughness={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CeramicPlateModel({ isRotating = true }) {
  const plateRef = useRef();

  useFrame((state, delta) => {
    if (plateRef.current && isRotating) {
      plateRef.current.rotation.y += delta * 0.8;
      plateRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={plateRef} rotation={[0.4, 0, 0]}>
      {/* Outer Ceramic Plate Body */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.8, 2.2, 0.25, 64]} />
        <meshPhysicalMaterial
          color="#F5F0E6"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Plate Inner Rim Basin */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[2.5, 2.4, 0.1, 64]} />
        <meshPhysicalMaterial
          color="#EFE9DE"
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>

      {/* Golden Terracotta Outer Accent Ring */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[2.65, 0.06, 32, 64]} />
        <meshStandardMaterial
          color="#E76F51"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Engraved Typography Text on Solid Ceramic Surface */}
      <Text
        position={[0, 0.11, -0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.46}
        color="#1A1625"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        DishCount
      </Text>
      
      <Text
        position={[0, 0.11, 0.45]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.14}
        color="#E76F51"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        Discover. Compare. Save.
      </Text>

      {/* Rising Steam & Warm Spice Particles */}
      <Sparkles
        count={50}
        scale={[3, 2, 3]}
        size={2.5}
        speed={0.6}
        color="#F4A261"
      />
      <Sparkles
        count={30}
        scale={[2.5, 3, 2.5]}
        size={3.5}
        speed={0.4}
        color="#FFF8F0"
      />
    </group>
  );
}

export const Plate3D = ({ isRotating = true }) => {
  return (
    <div className="w-full h-[400px] sm:h-[500px] relative">
      <Canvas camera={{ position: [0, 2.5, 5], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
        <pointLight position={[-5, -2, -5]} intensity={0.8} color="#E76F51" />
        <pointLight position={[5, 2, 5]} intensity={1.2} color="#F4A261" />

        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <CeramicPlateModel isRotating={isRotating} />
          <FloatingHerbs />
        </Float>

        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={4}
        />
      </Canvas>
    </div>
  );
};
