"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import RetroComputer from "@/components/three/RetroComputer";

export default function FounderStatement() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-soft-white border-t border-b border-charcoal/5 relative z-10 overflow-hidden">
      {/* Background elegant grid & spatial depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-accent-sand/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-accent-blue/5 to-transparent blur-[100px] pointer-events-none" />

      {/* Subtle floating architectural line */}
      <div className="absolute left-12 right-12 top-0 h-[1px] bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.05)_80%,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center relative z-10">
        {/* LEFT COLUMN: Editorial Content (55%) */}
        <div className="flex flex-col items-start w-full">
          {/* Label Badge */}
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-8 block"
          >
            [ 02 / DIGITAL PHILOSOPHY ]
          </ScrollReveal>

          {/* Cinematic Scroll-Revealed Title with Non-Breaking Spans */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={8}
            baseRotation={1}
            yOffset={35}
            stagger={0.06}
            className="font-display font-bold text-[clamp(2rem,4.2vw,4.5rem)] tracking-tight text-charcoal leading-[0.98] lg:leading-[0.95] mb-10 sm:mb-12 max-w-4xl block"
          >
            <span className="md:whitespace-nowrap">
              Technology,
              <br className="block md:hidden" />{" "}
              design and
            </span>
            <br className="hidden md:block" />{" "}
            <span className="md:whitespace-nowrap">
              storytelling —
              <br className="block md:hidden" />{" "}
              working seamlessly together.
            </span>
          </ScrollReveal>

          {/* Narrative Description (max 3 lines on desktop, soft opacity) */}
          <ScrollReveal
            baseOpacity={0.4}
            blurStrength={3}
            baseRotation={0}
            className="font-sans font-light text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-xl mb-12 sm:mb-14 block"
          >
            Modern digital experiences should feel immersive, intentional, and emotionally connected. My focus is on building systems that combine design, motion, storytelling, and technology into experiences that feel alive and future-ready.
          </ScrollReveal>

          {/* Signature Block */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={4}
            baseRotation={0}
            className="flex flex-col items-start w-full border-t border-charcoal/10 pt-6 max-w-xs block"
          >
            <span className="font-display font-bold text-sm sm:text-base text-charcoal tracking-tight block">
              Aditya Kapoor
            </span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase mt-1.5 block leading-relaxed">
              Founder, Designer & <br className="block" />Ecosystem Builder
            </span>
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN: Interactive 3D Visual (45%) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center"
        >
          <div 
            className="w-full h-[400px] sm:h-[450px] lg:h-[500px] relative rounded-2xl border border-charcoal/[0.04] bg-charcoal/[0.01] hover:bg-charcoal/[0.02] transition-colors duration-500 overflow-hidden flex items-center justify-center group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {/* Dynamic Background glowing ambient circle */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(194,193,189,0.08)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none ${isHovered ? "opacity-100" : "opacity-0"}`} />
            
            <ThreeCanvas 
              camera={{ position: [0, 0, 5.2], fov: 45 }}
              className="w-full h-full"
            >
              <ambientLight intensity={0.5} />
              <RetroComputer isHovered={isHovered} />
            </ThreeCanvas>

            {/* Elegant interactive floating tooltip in bottom right corner */}
            <div className={`absolute bottom-6 right-6 font-mono text-[9px] tracking-widest uppercase transition-all duration-500 pointer-events-none flex items-center gap-2 ${isHovered ? "text-emerald-500/80 translate-y-0 opacity-100" : "text-soft-gray translate-y-1 opacity-60"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-emerald-500 animate-pulse" : "bg-soft-gray"}`} />
              {isHovered ? "SYSTEMS ONLINE" : "INTERACT TO BOOT"}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cinematic smooth preset gradual blurs at top and bottom boundaries */}
      <GradualBlur preset="smooth" strength={1.2} opacity={0.6} />
    </section>
  );
}
export { FounderStatement };
