"use client";
import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hoverEffect = true, ...props }) {
  const hoverAnimations = {};

  return (
    <motion.div
      className={`glass-card p-6 sm:p-8 rounded-premium-lg ${className}`}
      {...hoverAnimations}
      {...props}
    >
      {children}
    </motion.div>
  );
}
export { GlassCard };
