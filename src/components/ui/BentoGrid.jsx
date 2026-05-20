"use client";
import React from "react";
import { motion } from "framer-motion";

export function BentoGrid({ children, className = "" }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full ${className}`}>
      {children}
    </div>
  );
}

export function BentoGridItem({ 
  children, 
  className = "", 
  colSpan = "md:col-span-1", 
  rowSpan = "", 
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: true },
  transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  ...props 
}) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={`glass-card p-6 sm:p-8 rounded-premium-lg flex flex-col justify-between ${colSpan} ${rowSpan} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
