"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { HeroScene } from "@/components/three/HeroScene";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-12 px-6 sm:px-12 bg-soft-white overflow-hidden">
      {/* Background soft spatial highlights */}
      <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-accent-blue/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-accent-sand/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Fine architectural grid/noise texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Layout Column: Editorial Content */}
        <div className="lg:col-span-7 flex flex-col items-start w-full">
          {/* Editorial Separator Line Above Content */}
          <motion.div 
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[1px] bg-charcoal/10 mb-8"
          />

          {/* Small Label Indicator */}
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-4"
          >
            [ FOUNDER ECOSYSTEM / DIGITAL BUILDER ]
          </ScrollReveal>

          {/* Large Cinematic Title */}
          <div className="mb-4 max-w-xl sm:max-w-2xl lg:max-w-3xl">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={10}
              baseRotation={1}
              className="font-display font-bold text-[7.2vw] xs:text-[6.2vw] sm:text-4.5xl lg:text-5.5xl xl:text-6xl tracking-tight text-charcoal leading-[1.05]"
            >
              {`Building startup ecosystems,
digital products, and
immersive experiences`}
            </ScrollReveal>
          </div>

          {/* Editorial Sub-line Divider Below Heading */}
          <motion.div 
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 0.15 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[1.5px] bg-accent-blue my-6"
          />

          {/* Immersive Subtext */}
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            blurStrength={4}
            baseRotation={0}
            className="text-sm sm:text-base text-soft-gray/90 leading-relaxed max-w-[440px] mb-8"
          >
            Founder of Hexora and startup ecosystem leader at PU-iNCENT building modern digital systems, immersive experiences, and innovation-driven platforms.
          </ScrollReveal>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12"
          >
            <Link href="/ecosystem" passHref legacyBehavior>
              <button
                className="px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/85 border border-transparent hover:border-charcoal/10 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md flex items-center gap-2.5 hover:opacity-90"
              >
                Explore Ecosystem
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>

            <Link href="/projects" className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue transition-all duration-300 ease-out hover:opacity-90">
              View Projects
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Supporting Metrics Panel Row */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={5}
            stagger={0.1}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-charcoal/5 w-full"
          >
            {[
              { val: "50+", label: "Founders Guided" },
              { val: "150+", label: "Innovation Events" },
              { val: "Hexora", label: "Founder & CEO" },
              { val: "PU-iNCENT", label: "Ecosystem Leader" }
            ].map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl font-bold text-charcoal leading-none mb-1">{metric.val}</span>
                <span className="text-[10px] font-mono text-soft-gray uppercase tracking-wider font-bold leading-tight">{metric.label}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>

        {/* Right Layout Column: Interactive Dotted Globe (floating naturally, borderless and vertically balanced) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 h-[400px] lg:h-[500px] w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing lg:-translate-y-12 lg:-mt-6"
        >
          <ThreeCanvas className="w-full h-full">
            <HeroScene />
          </ThreeCanvas>
          
          {/* Extremely subtle floating label */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/5 pointer-events-none">
            <span className="h-1 w-1 rounded-full bg-charcoal/30 animate-pulse" />
            <span className="text-[9px] font-mono text-soft-gray uppercase tracking-widest font-bold">Global Network Graph</span>
          </div>
        </motion.div>
      </div>

      {/* Atmospheric cinematic gradual blur at the bottom boundary */}
      <GradualBlur
        position="bottom"
        height="8rem"
        strength={1}
        divCount={6}
        curve="bezier"
        opacity={0.7}
        animated="scroll"
      />
    </section>
  );
}
export { HeroSection };
