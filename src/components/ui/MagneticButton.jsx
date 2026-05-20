"use client";
import React from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function MagneticButton({ children, className = "", strength = 0.25, onClick, ...props }) {
  const ref = useMagnetic(strength);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export { MagneticButton };
