"use client";
import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradualBlur } from "@/components/ui/GradualBlur";

export default function FounderStatement() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-soft-white border-t border-b border-charcoal/5 relative z-10 overflow-hidden">
      {/* Background elegant grid & spatial depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-accent-sand/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-accent-blue/5 to-transparent blur-[100px] pointer-events-none" />

      {/* Subtle floating architectural line */}
      <div className="absolute left-12 right-12 top-0 h-[1px] bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.05)_80%,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-start relative z-10">
        {/* Label Badge */}
        <ScrollReveal
          baseOpacity={0.3}
          enableBlur={false}
          baseRotation={0}
          className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-8 block"
        >
          [ 02 / DIGITAL PHILOSOPHY ]
        </ScrollReveal>

        {/* Cinematic Scroll-Revealed Title */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          blurStrength={8}
          baseRotation={1}
          yOffset={35}
          stagger={0.06}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.08] mb-10 sm:mb-12 max-w-4xl block"
        >
          {`Technology,
design,
and storytelling —
working seamlessly together.`}
        </ScrollReveal>

        {/* Narrative Description (max 3 lines on desktop, soft opacity) */}
        <ScrollReveal
          baseOpacity={0.4}
          blurStrength={3}
          baseRotation={0}
          className="font-sans font-light text-base sm:text-lg text-charcoal leading-relaxed max-w-2xl mb-12 sm:mb-14 block"
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
          <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase mt-1 block">
            Founder, Designer & Ecosystem Builder
          </span>
        </ScrollReveal>
      </div>

      {/* Cinematic smooth preset gradual blurs at top and bottom boundaries */}
      <GradualBlur preset="smooth" strength={1.2} opacity={0.6} />
    </section>
  );
}
export { FounderStatement };
