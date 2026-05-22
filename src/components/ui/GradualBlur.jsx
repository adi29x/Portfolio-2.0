"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Pure JS mathematical curve evaluation
const getCurveFactor = (t, curve) => {
  if (curve === "bezier") {
    // Smoothstep: 3t^2 - 2t^3
    return t * t * (3 - 2 * t);
  } else if (curve === "exponential") {
    // Quadratic curve: t^2
    return t * t;
  } else {
    return t;
  }
};

export default function GradualBlur({
  position = "bottom",
  height = "8rem",
  width = "4rem",
  strength = 1,
  divCount = 5,
  curve = "bezier",
  opacity = 0.7,
  animated = "none",
  preset,
  zIndex = 40,
  className = "",
}) {
  const containerRef = useRef(null);

  // Apply Presets override if provided
  let activePosition = position;
  let activeHeight = height;
  let activeWidth = width;
  let activeStrength = strength;
  let activeOpacity = opacity;
  let activeDivCount = divCount;
  let activeCurve = curve;
  let activeAnimated = animated;
  let activeZIndex = zIndex;

  if (preset === "smooth") {
    // Smooth preset: dual top and bottom transitions for philosophical pause
    activePosition = "both";
    activeHeight = "8rem";
    activeStrength = 1.2;
    activeOpacity = 0.6;
    activeCurve = "bezier";
  } else if (preset === "footer") {
    // Footer preset: elegant top transition before footer starts
    activePosition = "top";
    activeHeight = "8rem";
    activeStrength = 1;
    activeOpacity = 0.5;
    activeDivCount = 5;
    activeCurve = "bezier";
  } else if (preset === "hero") {
    activePosition = "bottom";
    activeHeight = "8rem";
    activeStrength = 1;
    activeDivCount = 6;
    activeCurve = "bezier";
    activeOpacity = 0.7;
    activeAnimated = "scroll";
  }

  // Handle GSAP Scroll animation
  useGSAP(
    () => {
      if (activeAnimated !== "scroll" || !containerRef.current) return;

      // Animate the container opacity smoothly on scroll
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: activeOpacity,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom 70%",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [activeAnimated, activeOpacity] }
  );

  // Helper to generate styles for each blur layer
  const renderBlurLayers = (pos) => {
    const layers = [];
    const maxRadius = activeStrength * 8; // Max blur radius scale factor

    for (let i = 0; i < activeDivCount; i++) {
      // Curve step interpolation
      const t = activeDivCount > 1 ? i / (activeDivCount - 1) : 1;
      const factor = getCurveFactor(t, activeCurve);

      // Radii are kept relatively small to prevent heavy GPU fill-rates
      const radius = (i + 1) * 1.5 * activeStrength; 
      
      const startPercent = (i / activeDivCount) * 100 * factor;
      const endPercent = ((i + 1) / activeDivCount) * 100 * factor;

      let maskDir = "to bottom";
      if (pos === "top") maskDir = "to top";
      if (pos === "left") maskDir = "to left";
      if (pos === "right") maskDir = "to right";

      const maskGradient = `linear-gradient(${maskDir}, rgba(0, 0, 0, 0) ${startPercent.toFixed(1)}%, rgba(0, 0, 0, 1) ${endPercent.toFixed(1)}%)`;

      layers.push(
        <div
          key={i}
          className="absolute inset-0 pointer-events-none will-change-[backdrop-filter]"
          style={{
            backdropFilter: `blur(${radius.toFixed(1)}px)`,
            WebkitBackdropFilter: `blur(${radius.toFixed(1)}px)`,
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
          }}
        />
      );
    }
    return layers;
  };

  // Helper to return style rules based on position orientation
  const getContainerStyles = (pos) => {
    const base = {
      position: className && className.includes("fixed") ? "fixed" : "absolute",
      zIndex: activeZIndex,
      pointerEvents: "none",
    };

    if (pos === "top") {
      return {
        ...base,
        top: 0,
        left: 0,
        right: 0,
        height: activeHeight,
      };
    }
    if (pos === "bottom") {
      return {
        ...base,
        bottom: 0,
        left: 0,
        right: 0,
        height: activeHeight,
      };
    }
    if (pos === "left") {
      return {
        ...base,
        top: 0,
        bottom: 0,
        left: 0,
        width: activeWidth,
        height: "100%",
      };
    }
    if (pos === "right") {
      return {
        ...base,
        top: 0,
        bottom: 0,
        right: 0,
        width: activeWidth,
        height: "100%",
      };
    }
    return base;
  };

  // If "both" is specified (or preset="smooth"), we render top and bottom overlays
  if (activePosition === "both") {
    return (
      <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: activeZIndex }}>
        {/* Top Boundary Blur */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: activeHeight,
            opacity: activeOpacity,
            zIndex: activeZIndex,
            pointerEvents: "none",
          }}
        >
          {renderBlurLayers("top")}
        </div>
        {/* Bottom Boundary Blur */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: activeHeight,
            opacity: activeOpacity,
            zIndex: activeZIndex,
            pointerEvents: "none",
          }}
        >
          {renderBlurLayers("bottom")}
        </div>
      </div>
    );
  }

  // Render standard single orientation gradual blur
  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{
        ...getContainerStyles(activePosition),
        opacity: activeAnimated === "scroll" ? 0 : activeOpacity,
      }}
    >
      {renderBlurLayers(activePosition)}
    </div>
  );
}

export { GradualBlur };
