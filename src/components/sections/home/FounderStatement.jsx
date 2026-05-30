"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradualBlur } from "@/components/ui/GradualBlur";

const POOL_LOGS = [
  { type: "LOG", msg: "Analyzing Innovation Metrics for BCA Batch", time: "787ms" },
  { type: "LOG", msg: "System Cache Cleared - 1.2GB optimized", time: "355ms" },
  { type: "SYS", msg: "Ecosystem Kernel Initialized...", time: "0ms" },
  { type: "NET", msg: "Digital Registry Link Active", time: "+12ms" },
  { type: "LOG", msg: "Syncing PU-iNCENT startup cohorts...", time: "210ms" },
  { type: "SYS", msg: "Hexora Agency Pipeline synced successfully", time: "180ms" },
  { type: "NET", msg: "Jaipur Entrepreneur Node connection established", time: "+4ms" },
  { type: "LOG", msg: "Advising 50+ student founders in active queue", time: "520ms" },
  { type: "LOG", msg: "Generating digital experience blueprints", time: "95ms" },
  { type: "SYS", msg: "FounderOS Dashboard pipeline check complete", time: "15ms" },
  { type: "NET", msg: "Securing student incubator intake endpoints", time: "+18ms" },
  { type: "LOG", msg: "Compiling Lakshya 2026 conference schedule", time: "440ms" }
];

function LiveTerminal() {
  const [activeLogs, setActiveLogs] = useState([
    { id: 0, type: "LOG", msg: "Analyzing Innovation Metrics for BCA Batch", time: "787ms" },
    { id: 1, type: "LOG", msg: "System Cache Cleared - 1.2GB optimized", time: "355ms" },
    { id: 2, type: "SYS", msg: "Ecosystem Kernel Initialized...", time: "0ms" },
    { id: 3, type: "NET", msg: "Digital Registry Link Active", time: "+12ms" }
  ]);

  useEffect(() => {
    let logCounter = 4;
    const interval = setInterval(() => {
      setActiveLogs((prev) => {
        const next = prev.slice(1);
        const poolItem = POOL_LOGS[logCounter % POOL_LOGS.length];
        next.push({
          id: logCounter++,
          type: poolItem.type,
          msg: poolItem.msg,
          time: poolItem.time
        });
        return next;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0A0B11] border border-white/[0.06] rounded-2xl shadow-premium-lg px-5 py-5 sm:px-8 sm:py-6 flex flex-col justify-between h-[340px] sm:h-[360px] relative overflow-hidden select-none font-mono">
      {/* Terminal Header */}
      <div>
        <div className="flex justify-between items-center border-b border-white/[0.07] pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs tracking-[0.25em] text-white/55 font-bold uppercase">
              LIVE SYSTEM ACTIVITY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          {/* macOS window actions */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/20" />
          </div>
        </div>

        {/* Dynamic Logs Stack */}
        <div className="flex flex-col space-y-4">
          <AnimatePresence initial={false} mode="popLayout">
            {activeLogs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between py-1 text-[11px] sm:text-xs leading-normal"
              >
                <div className="flex items-start gap-4 sm:gap-6 min-w-0 flex-1 pr-4">
                  {/* Tag label (Red, Monospace, Bold) */}
                  <span className="text-[#FF453A] font-bold w-8 select-none shrink-0 tracking-wider">
                    {log.type}
                  </span>
                  {/* Message (Sleek light silver text) */}
                  <span className="text-[#E5E7EB]/90 leading-relaxed font-light truncate">
                    {log.msg}
                  </span>
                </div>
                {/* Time (Dim gray monospace) */}
                <span className="text-white/40 tracking-tight shrink-0 select-none text-right w-16">
                  {log.time}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Terminal Footer Info Overlay */}
      <div className="flex justify-between items-center border-t border-white/[0.05] pt-4 mt-4 text-[9px] text-white/30 tracking-widest uppercase select-none">
        <div>STATUS: ACTIVE</div>
        <div>NODE: JP_IN_COORD_26.9N</div>
      </div>
    </div>
  );
}

export default function FounderStatement() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-soft-white border-t border-b border-charcoal/5 relative z-10 overflow-hidden">
      {/* Background elegant grid & spatial depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-accent-sand/15 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-accent-blue/8 to-transparent blur-[100px] pointer-events-none" />

      {/* Cinematic smooth preset gradual blurs and background blending overlays (sits below content layer) */}
      <GradualBlur preset="smooth" strength={1.5} opacity={0.7} zIndex={5} />
      
      {/* Smooth solid-to-transparent color gradient overlays at boundaries to blend sections beautifully */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F7F7F5] via-[#F7F7F5]/50 to-transparent pointer-events-none z-[5]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7F7F5] via-[#F7F7F5]/50 to-transparent pointer-events-none z-[5]" />

      {/* Subtle floating architectural line */}
      <div className="absolute left-12 right-12 top-0 h-[1px] bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.05)_80%,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center relative z-10">
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
            className="mb-10 sm:mb-12 max-w-4xl block"
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.05]">
              Technology, design and<br className="hidden md:inline" /> storytelling — working seamlessly together.
            </h2>
          </ScrollReveal>

          {/* Narrative Description (max 3 lines on desktop, soft opacity) */}
          <ScrollReveal
            baseOpacity={0.4}
            blurStrength={3}
            baseRotation={0}
            className="font-sans font-light text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-xl mb-12 sm:mb-14 block"
          >
            Modern digital experiences should feel immersive, intentional, and emotionally connected. I build systems that combine design, motion, storytelling, and technology into experiences that feel alive and future-ready.
          </ScrollReveal>

          {/* Signature Block */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={4}
            baseRotation={0}
            className="block"
          >
            <div className="flex flex-col items-start w-full border-t border-charcoal/10 pt-6 max-w-xs">
              <span className="font-display font-bold text-sm sm:text-base text-charcoal tracking-tight block">
                Aditya Kapoor
              </span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase mt-1.5 block leading-relaxed">
                Founder, Designer & Ecosystem Builder
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN: Live System Activity Terminal (45%) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center"
        >
          <div className="w-full max-w-[550px] relative">
            {/* Dynamic Background glowing ambient circle */}
            <div className="absolute inset-0 -m-6 bg-gradient-to-br from-charcoal/5 to-transparent blur-[80px] pointer-events-none rounded-full" />
            <LiveTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { FounderStatement };
