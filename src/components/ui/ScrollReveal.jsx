"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({
  children,
  baseOpacity = 0,
  enableBlur = true,
  blurStrength = 8,
  baseRotation = 2,
  yOffset = 30,
  stagger = 0.08,
  duration = 1.4,
  ease = "power2.out",
  scrub = 1,
  className = "",
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Select target words. Fallback to direct children if no explicit word spans exist.
      let targets = containerRef.current.querySelectorAll(".scroll-reveal-word");
      if (targets.length === 0) {
        targets = containerRef.current.children;
      }
      if (targets.length === 0) return;

      // Mobile Responsive Optimizations: programmatically reduce heavy properties
      let activeBlurStrength = blurStrength;
      let activeYOffset = yOffset;
      let activeStagger = stagger;
      let activeRotation = baseRotation;

      if (typeof window !== "undefined" && window.innerWidth < 768) {
        activeBlurStrength = enableBlur ? Math.min(blurStrength, 4) : 0;
        activeYOffset = Math.min(yOffset, 15);
        activeStagger = Math.min(stagger, 0.04);
        activeRotation = Math.min(baseRotation, 0.5);
      }

      gsap.fromTo(
        targets,
        {
          opacity: baseOpacity,
          filter: enableBlur && activeBlurStrength > 0 ? `blur(${activeBlurStrength}px)` : "none",
          transformOrigin: "left center",
          rotate: activeRotation,
          y: activeYOffset,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          rotate: 0,
          y: 0,
          stagger: activeStagger,
          duration: duration,
          ease: ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            end: "bottom 60%",
            scrub: scrub,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [baseOpacity, enableBlur, blurStrength, baseRotation, yOffset, stagger, duration, ease, scrub] }
  );

  // Parse children and split string into words, preserving newlines as block lines
  const renderContent = () => {
    if (typeof children === "string") {
      const lines = children.split("\n");
      return lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split(" ").map((word, wordIdx) => {
            if (!word.trim()) return null;
            return (
              <span
                key={wordIdx}
                className="scroll-reveal-word inline-block mr-[0.22em] will-change-[transform,opacity,filter]"
              >
                {word}
              </span>
            );
          })}
        </span>
      ));
    }

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: `${children.props.className || ""} scroll-reveal-word`,
      });
    }

    // Handle arrays of children (e.g. mixed elements, lists)
    if (Array.isArray(children)) {
      return children.map((child, idx) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            key: idx,
            className: `${child.props.className || ""} scroll-reveal-word`,
          });
        }
        return child;
      });
    }

    return children;
  };

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {renderContent()}
    </div>
  );
}

export { ScrollReveal };
