"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ScrollReveal({
  children,
  baseOpacity = 0,
  enableBlur = true,
  blurStrength = 8,
  baseRotation = 0,
  yOffset = 20,
  stagger = 0,
  duration = 1.0,
  ease = [0.16, 1, 0.3, 1],
  scrub = false,
  className = "",
}) {
  const ref = useRef(null);
  
  // Trigger when 10% of the element is visible in the viewport
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  // Determine if children contains typical heading elements or uppercase labels
  const isLabel = typeof children === "string" && (children.trim().startsWith("[") || children.length < 35);
  const isParagraph = typeof children === "string" && children.length > 80;

  // Refined values based on design directions
  let activeYOffset = yOffset;
  let activeBlur = enableBlur ? blurStrength : 0;
  let activeDuration = duration;

  if (isLabel) {
    // Labels use soft fade, no motion
    activeYOffset = 0;
    activeBlur = 0;
    activeDuration = 0.8;
  } else if (isParagraph) {
    // Paragraphs use softer motion (8px) and lower blur to remain stable
    activeYOffset = 8;
    activeBlur = enableBlur ? Math.min(blurStrength, 3) : 0;
    activeDuration = 1.0;
  } else {
    // Headings use premium block translate (15px) and moderate blur
    activeYOffset = Math.min(yOffset, 15);
    activeBlur = enableBlur ? Math.min(blurStrength, 6) : 0;
  }

  // Mobile overrides to guarantee performance
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    activeBlur = 0;
    activeYOffset = Math.min(activeYOffset, 6);
  }

  // Parse children and split string by newline to preserve layout structures
  const renderContent = () => {
    if (typeof children === "string") {
      const lines = children.split("\n");
      if (lines.length > 1) {
        return lines.map((line, lineIdx) => (
          <span key={lineIdx} className="block">
            {line}
          </span>
        ));
      }
      return children;
    }
    return children;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: baseOpacity, 
        y: activeYOffset,
        filter: activeBlur > 0 ? `blur(${activeBlur}px)` : "none"
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)"
      } : { 
        opacity: baseOpacity, 
        y: activeYOffset,
        filter: activeBlur > 0 ? `blur(${activeBlur}px)` : "none"
      }}
      transition={{ 
        duration: activeDuration, 
        ease: ease 
      }}
      className={className}
      style={{
        display: className.includes("inline") ? "inline-block" : "block",
        width: "100%"
      }}
    >
      {renderContent()}
    </motion.div>
  );
}

export { ScrollReveal };
