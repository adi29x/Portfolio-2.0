"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { HeroScene } from "@/components/three/HeroScene";

export default function HeroSection() {
  const stats = [
    { val: "50+", label: "Startup Founders Guided" },
    { val: "150+", label: "Innovation & Startup Events" },
    { val: "Founder & CEO", label: "Hexora / Evolve" },
    { val: "Chief Student Advisor", label: "PU-iNCENT" }
  ];

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
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-4 block"
          >
            [ FOUNDER ECOSYSTEM / STARTUP BUILDER ]
          </motion.span>

          {/* Large Cinematic Title */}
          <div className="mb-4 max-w-xl sm:max-w-2xl lg:max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[7.2vw] xs:text-[6.2vw] sm:text-4.5xl lg:text-5.5xl xl:text-6xl tracking-tight text-charcoal leading-[1.05]"
            >
              <span className="block sm:whitespace-nowrap">
                Building startup <span className="block sm:inline">ecosystems,</span>
              </span>
              <span className="block">digital products, and</span>
              <span className="block">next-generation digital experiences.</span>
            </motion.h1>
          </div>

          {/* Editorial Sub-line Divider Below Heading */}
          <motion.div 
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 0.15 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[1.5px] bg-accent-blue my-6"
          />

          {/* Immersive Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-soft-gray/90 leading-relaxed max-w-xl sm:max-w-2xl mb-8"
          >
            Founder & CEO at Hexora and Evolve, and Chief Student Advisor at PU-iNCENT — building scalable digital systems, startup ecosystems, modern web platforms, and innovation-driven experiences through technology, design, and strategy.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4"
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

          {/* Premium Ecosystem Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-12 p-6 sm:p-8 rounded-2xl border border-charcoal/[0.06] bg-soft-white/60 backdrop-blur-md shadow-premium-sm relative overflow-hidden"
          >
            {/* Ambient internal gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-sand/5 via-transparent to-accent-blue/5 pointer-events-none" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center md:items-start text-center md:text-left ${
                    idx !== 0 ? "md:border-l md:border-charcoal/[0.08] md:pl-6 lg:pl-8" : ""
                  }`}
                >
                  <span className={`font-bold font-display tracking-tight text-charcoal leading-none mb-1.5 ${
                    stat.val.length > 12 ? "text-base sm:text-lg" : stat.val.length > 8 ? "text-lg sm:text-xl" : "text-2xl"
                  }`}>
                    {stat.val}
                  </span>
                  <span className="text-[10px] font-mono text-soft-gray uppercase tracking-widest font-bold leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Layout Column: Interactive Dotted Globe (aligned upward on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 h-[400px] lg:h-[500px] w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing lg:-translate-y-24 lg:-mt-8"
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
    </section>
  );
}

export { HeroSection };
