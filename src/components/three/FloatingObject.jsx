"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function FloatingObject({ 
  geometryType = "torus", 
  color = "#D9C7A2", 
  scale = 1, 
  position = [0, 0, 0],
  speed = 1
}) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Ambient continuous spin
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.004 * speed;

    // Gentle mouse parallax following
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.8;
    
    // Smooth lerping to position
    meshRef.current.position.x += (position[0] + targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (position[1] + targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometryType === "torus" && (
        <torusGeometry args={[1, 0.35, 32, 100]} />
      )}
      {geometryType === "icosahedron" && (
        <icosahedronGeometry args={[1, 0]} />
      )}
      {geometryType === "sphere" && (
        <sphereGeometry args={[1, 64, 64]} />
      )}
      
      {/* Luxury architectural matte material */}
      <meshStandardMaterial 
        color={color} 
        roughness={0.4} 
        metalness={0.25}
        flatShading={geometryType === "icosahedron"}
      />
    </mesh>
  );
}
export { FloatingObject };
