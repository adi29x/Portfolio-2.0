"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Palette 
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { ecosystemVentures } from "@/data/ecosystem";

export default function EcosystemPreview() {
  const icons = {
    hexora: Layers,
    "pu-incent": Cpu,
    evolve: Sparkles,
    "icmmes-2026": BookOpen,
    doodleverse: Palette
  };

  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-soft-white border-b border-charcoal/5 relative z-10 overflow-hidden">
      {/* Background elegant grid & spatial depth (Identical to Section 02) */}
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start relative z-10">
        {/* LEFT COLUMN: Editorial Content (55%) - Wrapped in a Bento-styled Card, Sticky on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:sticky lg:top-28 self-start p-6 sm:p-8 md:p-9 border border-charcoal/[0.06] bg-warm-white/40 hover:bg-warm-white/60 transition-all duration-500 rounded-[32px] shadow-premium-sm hover:shadow-premium-md hover:border-charcoal/20 relative overflow-hidden flex flex-col justify-between min-h-[420px] lg:min-h-[460px]"
        >
          <div>
            {/* Label Badge (Identical to Section 02) */}
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              baseRotation={0}
              className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-4 sm:mb-5 block"
            >
              [ 03 / VENTURE ECOSYSTEM ]
            </ScrollReveal>

            {/* Cinematic Scroll-Revealed Title with Non-Breaking Spans */}
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={8}
              baseRotation={1}
              yOffset={35}
              stagger={0.06}
              className="mb-6 sm:mb-8 max-w-4xl block"
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-charcoal leading-[1.05]">
                Building startup ecosystems,<br />digital systems and<br />modern experiences.
              </h2>
            </ScrollReveal>

            {/* Narrative Description (max 3 lines on desktop, soft opacity) */}
            <ScrollReveal
              baseOpacity={0.4}
              blurStrength={3}
              baseRotation={0}
              className="font-sans font-light text-sm sm:text-base text-charcoal/70 leading-relaxed max-w-xl mb-6 sm:mb-8 block"
            >
              From startup incubation and founder mentorship to digital products and growth-focused ventures, I build ecosystems that connect people, ideas, technology, and execution into meaningful real-world impact.
            </ScrollReveal>
          </div>

          {/* Explore All Ventures CTA Button */}
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={false}
            className="block"
          >
            <Link href="/ecosystem" passHref legacyBehavior>
              <a className="group flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue border border-charcoal/10 hover:border-accent-blue/30 bg-warm-white/20 hover:bg-warm-white/85 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md hover:opacity-95 w-fit">
                Explore All Ventures
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </a>
            </Link>
          </ScrollReveal>
        </motion.div>

        {/* RIGHT COLUMN: Ecosystem Grid (45%) */}
        <div className="w-full flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
            {ecosystemVentures.map((venture, index) => {
              const Icon = icons[venture.id] || Cpu;
              return (
                <motion.div
                  key={venture.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col justify-between p-6 sm:p-8 border border-charcoal/[0.06] bg-warm-white/40 hover:bg-warm-white/80 transition-all duration-500 rounded-2xl shadow-premium-sm hover:shadow-premium-md hover:border-charcoal/20 relative overflow-hidden"
                >
                  {/* Top Status & Type Info */}
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal/5 border border-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase">
                      {venture.type}
                    </span>
                    <span className="text-[10px] font-bold text-accent-blue tracking-wide uppercase">
                      {venture.status}
                    </span>
                  </div>

                  {/* Main Middle Content */}
                  <div className="flex flex-col gap-3 my-6">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 rounded-lg bg-warm-white text-charcoal group-hover:bg-accent-blue group-hover:text-soft-white transition-colors duration-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-charcoal">
                        {venture.title}
                      </h3>
                    </div>
                    <p className="text-soft-gray text-xs sm:text-sm leading-relaxed font-light">
                      {venture.description}
                    </p>
                  </div>

                  {/* Bottom Metric & Funding Data */}
                  <div className="flex items-center justify-between border-t border-border-gray/50 pt-4 w-full text-[10px]">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Funding State</span>
                      <span className="text-xs font-semibold text-charcoal mt-0.5">{venture.funding}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Volume Benchmark</span>
                      <span className="text-xs font-bold text-accent-blue mt-0.5">{venture.metrics}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { EcosystemPreview };
