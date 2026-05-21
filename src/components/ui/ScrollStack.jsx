"use client";
import React, { useRef, createContext, useContext, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollStackContext = createContext(null);

export function ScrollStack({
  children,
  itemDistance = 70,
  itemScale = 0.02,
  itemStackDistance = 24,
  stackPosition = "18%",
  scaleEndPosition = "10%",
  baseScale = 0.94,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  className = "",
}) {
  const containerRef = useRef(null);

  // Set up scroll progress tracking for the entire stack container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const contextValue = {
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    scrollYProgress,
    totalItems,
  };

  return (
    <ScrollStackContext.Provider value={contextValue}>
      <div 
        ref={containerRef} 
        className={`relative w-full ${className}`}
        style={{
          // The height of the container controls the total scrollable track for stacking
          // 3 cards * 60vh = 180vh scroll track length
          height: `${totalItems * 60}vh`,
          paddingBottom: "10vh",
        }}
      >
        <div className="sticky top-0 w-full h-screen overflow-visible flex flex-col justify-start">
          {childrenArray.map((child, index) => {
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(child, {
              index,
            });
          })}
        </div>
      </div>
    </ScrollStackContext.Provider>
  );
}

export function ScrollStackItem({
  children,
  index = 0,
  className = "",
  style = {},
}) {
  const context = useContext(ScrollStackContext);
  if (!context) {
    throw new Error("ScrollStackItem must be used within ScrollStack");
  }

  const {
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    scrollYProgress,
    totalItems,
  } = context;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeDistance = isMobile ? itemDistance * 0.4 : itemDistance;
  const activeStackDistance = isMobile ? itemStackDistance * 0.6 : itemStackDistance;
  const activeScale = baseScale;

  // Mathematically precise scroll range mapping for each card
  // Card index i animates (scales down & fades) when the next card i+1 pins
  const startRange = index / totalItems;
  const endRange = (index + 1) / totalItems;

  // Driving animations relative to the computed card's active scroll range
  const scale = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [1 - index * itemScale, 1 - (index + 1) * itemScale]
  );

  const y = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [0, -activeDistance]
  );

  const rotate = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [0, rotationAmount]
  );

  const opacity = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [1, 0.95]
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [0, 0.18]
  );

  const blurValue = useTransform(
    scrollYProgress,
    [startRange, endRange],
    [0, blurAmount]
  );

  const filter = useTransform(blurValue, (v) => v > 0 ? `blur(${v}px)` : "none");

  // Sticky top calculation
  // Each card sits at stackPosition from top, offset by index * stackDistance to create stacked shingles
  const stickyTop = `calc(${stackPosition} + ${index * activeStackDistance}px)`;

  return (
    <motion.div
      className={`absolute left-0 right-0 mx-auto w-full max-w-5xl rounded-[2rem] overflow-hidden ${className}`}
      style={{
        top: stickyTop,
        scale,
        y,
        rotate,
        opacity,
        filter,
        zIndex: index + 10,
        transformOrigin: "top center",
        ...style,
      }}
    >
      <div className="relative w-full h-full">
        {children}
        
        {/* Cinematic ambient lighting depth layer */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-charcoal/25 pointer-events-none rounded-[2rem] z-50 transition-colors duration-300"
        />
      </div>
    </motion.div>
  );
}
