"use client";
import React from "react";
import { DottedGlobe } from "./DottedGlobe";

export default function HeroScene() {
  return (
    <>
      {/* Studio lighting environment */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-8, -5, -3]} intensity={1.5} color="#6E8FB3" />
      <spotLight 
        position={[2, 10, 2]} 
        angle={0.4} 
        penumbra={1} 
        intensity={2.5} 
        color="#D9C7A2" 
      />

      {/* Cinematic 3D Dotted Globe representing startup networks */}
      <DottedGlobe />
    </>
  );
}
export { HeroScene };
