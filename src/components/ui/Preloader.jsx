"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";

// Custom inline SVG for LinkedIn icon to prevent deprecation issues in newer lucide versions
const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// High-performance 3D Dotted preloader globe (visual parity with DottedGlobe.jsx)
function PreloaderGlobe({ dotsOpacity, linesOpacity, dissolveActive }) {
  const groupRef = useRef(null);
  const pointsRef1 = useRef(null);
  const pointsRef2 = useRef(null);

  // Generate 750 points using Fibonacci Golden Spiral distribution
  const particleCount = 600; // Optimized node complexity for preloader
  const positions = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI * goldenRatio;

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = Math.sin(inclination) * Math.cos(azimuth);
      const y = Math.sin(inclination) * Math.sin(azimuth);
      const z = Math.cos(inclination);

      const radius = 2.65;
      coords[i * 3] = x * radius;
      coords[i * 3 + 1] = y * radius;
      coords[i * 3 + 2] = z * radius;
    }
    return coords;
  }, [particleCount]);

  // Handle slow ambient rotation and progressive expansion/dissolve physics
  useFrame((state) => {
    if (!groupRef.current) return;

    // Slow cinematic rotation
    groupRef.current.rotation.y += 0.0016;

    // React subtly to cursor coordinates if not dissolving
    if (!dissolveActive) {
      const targetX = state.pointer.x * 0.12;
      const targetY = -state.pointer.y * 0.12;
      groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.05;
    } else {
      // Dynamic spherical explosion/dissolve updates
      const geom1 = pointsRef1.current?.geometry;
      const geom2 = pointsRef2.current?.geometry;
      
      const processGeom = (geom) => {
        if (!geom) return;
        const posAttr = geom.attributes.position;
        const arr = posAttr.array;
        const count = posAttr.count;

        for (let i = 0; i < count; i++) {
          const x = arr[i * 3];
          const y = arr[i * 3 + 1];
          const z = arr[i * 3 + 2];

          const len = Math.sqrt(x * x + y * y + z * z);
          if (len > 0) {
            const dx = x / len;
            const dy = y / len;
            const dz = z / len;

            // Expand points outward spherically
            arr[i * 3] += dx * 0.05;
            arr[i * 3 + 1] += dy * 0.05;
            arr[i * 3 + 2] += dz * 0.05;
          }
        }
        posAttr.needsUpdate = true;
      };

      processGeom(geom1);
      processGeom(geom2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Primary Dotted Points */}
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#FFFFFF"
          size={0.055}
          sizeAttenuation={true}
          transparent={true}
          opacity={dotsOpacity}
        />
      </points>

      {/* 2. Secondary Dotted Points */}
      <points ref={pointsRef2} scale={0.985}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#D1D1D6"
          size={0.04}
          sizeAttenuation={true}
          transparent={true}
          opacity={dotsOpacity * 0.7}
        />
      </points>

      {/* 3. Lightweight Grid Connections */}
      <mesh scale={1.002}>
        <sphereGeometry args={[2.64, 18, 18]} />
        <meshBasicMaterial
          color="#E2E2DF"
          wireframe={true}
          transparent={true}
          opacity={linesOpacity}
        />
      </mesh>

      {/* 4. Soft Inner Core Ambient Glow */}
      <mesh>
        <sphereGeometry args={[1.95, 12, 12]} />
        <meshBasicMaterial
          color="#ECE9E2"
          transparent={true}
          opacity={dotsOpacity * 0.055}
        />
      </mesh>
    </group>
  );
}

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(1);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [dissolveActive, setDissolveActive] = useState(false);
  const [dotsOpacity, setDotsOpacity] = useState(0);
  const [linesOpacity, setLinesOpacity] = useState(0);
  const [preloaderActive, setPreloaderActive] = useState(true);

  const phrases = [
    "BUILDING ECOSYSTEMS",
    "CREATING EXPERIENCES",
    "LAUNCHING VENTURES"
  ];

  useEffect(() => {
    // Body scroll lock during preloading
    document.body.style.overflow = "hidden";

    // Step 2: Dots appear
    const t2 = setTimeout(() => {
      setStep(2);
      let currentDots = 0;
      const dotsInterval = setInterval(() => {
        currentDots += 0.15;
        if (currentDots >= 0.95) {
          setDotsOpacity(0.9);
          clearInterval(dotsInterval);
        } else {
          setDotsOpacity(currentDots);
        }
      }, 50);
    }, 400);

    // Step 3: Connections draw
    const t3 = setTimeout(() => {
      setStep(3);
      let currentLines = 0;
      const linesInterval = setInterval(() => {
        currentLines += 0.03;
        if (currentLines >= 0.16) {
          setLinesOpacity(0.16);
          clearInterval(linesInterval);
        } else {
          setLinesOpacity(currentLines);
        }
      }, 50);
    }, 900);

    // Step 5: Phrases display
    const t5 = setTimeout(() => {
      setStep(5);
    }, 1400);

    // Phrase cycling
    const tp1 = setTimeout(() => setPhraseIndex(1), 1900);
    const tp2 = setTimeout(() => setPhraseIndex(2), 2400);

    // Step 6: ADITYA_KAPOOR.OS is ONLINE
    const t6 = setTimeout(() => {
      setStep(6);
    }, 2900);

    // Step 7: Dissolve & Fade Out start
    const t7 = setTimeout(() => {
      setDissolveActive(true);
      // Fade out lines & dots smoothly
      let currentDots = 0.9;
      let currentLines = 0.16;
      const fadeInterval = setInterval(() => {
        currentDots -= 0.08;
        currentLines -= 0.02;
        if (currentDots <= 0) {
          setDotsOpacity(0);
          setLinesOpacity(0);
          clearInterval(fadeInterval);
        } else {
          setDotsOpacity(currentDots);
          setLinesOpacity(Math.max(0, currentLines));
        }
      }, 40);

      setStep(7);
    }, 3600);

    // Complete exit preloader completely
    const t8 = setTimeout(() => {
      setPreloaderActive(false);
      document.body.style.overflow = "unset";
      if (onComplete) onComplete();
    }, 4200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t5);
      clearTimeout(tp1);
      clearTimeout(tp2);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, []);

  if (!preloaderActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: step === 7 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#FAFAF8] flex flex-col items-center justify-between py-20 select-none overflow-hidden"
      >
        {/* Subtle cinematic background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

        {/* STEP 01: Centered Brand Info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-6">
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <h1 
                  className="font-display font-bold tracking-tight text-charcoal"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 4rem)", lineHeight: 1.1 }}
                >
                  ADITYA<span className="text-accent-blue font-light">KAPOOR</span>
                </h1>
                <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-soft-gray uppercase mt-3">
                  Founder Ecosystem &bull; Digital Builder
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* STEPS 02-04 & 07: 3D Dotted System Globe */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step === 7 ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="w-full h-full max-w-[320px] max-h-[320px] sm:max-w-[420px] sm:max-h-[420px] pointer-events-auto">
              <Canvas camera={{ position: [0, 0, 8], fof: 45 }} className="w-full h-full">
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} />
                <pointLight position={[-8, -5, -3]} intensity={1.5} color="#6E8FB3" />
                <PreloaderGlobe
                  dotsOpacity={dotsOpacity}
                  linesOpacity={linesOpacity}
                  dissolveActive={dissolveActive}
                />
              </Canvas>
            </div>
          </motion.div>
        )}

        {/* STEPS 05-06: Supporting Cinematic Phrases / OS Online Status */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center text-center z-25 pointer-events-none h-14">
          {step === 5 && phraseIndex < phrases.length && (
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-charcoal uppercase select-none"
              >
                {phrases[phraseIndex]}
              </motion.p>
            </AnimatePresence>
          )}

          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 select-none"
            >
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-charcoal">
                ADITYA_KAPOOR.OS
              </span>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-bold tracking-widest text-emerald-600 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                STATUS: ONLINE
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
