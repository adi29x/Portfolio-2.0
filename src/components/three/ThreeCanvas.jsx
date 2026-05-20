"use client";
import React from "react";
import dynamic from "next/dynamic";

const CanvasComponent = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

export default function ThreeCanvas({ children, className = "", camera = { position: [0, 0, 8], fov: 45 }, ...props }) {
  return (
    <div className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`}>
      <CanvasComponent camera={camera} {...props}>
        {children}
      </CanvasComponent>
    </div>
  );
}
export { ThreeCanvas };
