"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DottedGlobe() {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);

  // Generate 750 points using Fibonacci Golden Spiral distribution
  const particleCount = 750;
  const positions = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI * goldenRatio;

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = Math.sin(inclination) * Math.cos(azimuth);
      const y = Math.sin(inclination) * Math.sin(azimuth);
      const z = Math.cos(inclination);

      // Sphere radius 2.65
      const radius = 2.65;
      coords[i * 3] = x * radius;
      coords[i * 3 + 1] = y * radius;
      coords[i * 3 + 2] = z * radius;
    }
    return coords;
  }, [particleCount]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow, natural ambient rotation representing global startup system flow
    groupRef.current.rotation.y += 0.0012;
    
    // Subtle, architectural cursor tilt responsiveness (lerped smoothly)
    const targetX = state.pointer.x * 0.18;
    const targetY = -state.pointer.y * 0.18;

    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* 1. Primary Dotted Points - Pure White, light, and crisp */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFFFFF"
          size={0.055}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.9}
        />
      </points>

      {/* 2. Secondary Dotted Points - Soft Gray for architectural depth */}
      <points scale={0.985}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#D1D1D6"
          size={0.04}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.65}
        />
      </points>

      {/* 3. Lightweight Connection Lines - Delicate grid shell */}
      <mesh scale={1.002}>
        <sphereGeometry args={[2.64, 24, 24]} />
        <meshBasicMaterial
          color="#E2E2DF"
          wireframe={true}
          transparent={true}
          opacity={0.16}
        />
      </mesh>

      {/* 4. Elegant Core Glowing Ambient layer */}
      <mesh>
        <sphereGeometry args={[1.95, 16, 16]} />
        <meshBasicMaterial
          color="#ECE9E2"
          transparent={true}
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}
export { DottedGlobe };
