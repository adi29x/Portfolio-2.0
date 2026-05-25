"use client";
import React from "react";
import Link from "next/link";
import { 
  Cpu, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Palette 
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { ecosystemVentures } from "@/data/ecosystem";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradualBlur } from "@/components/ui/GradualBlur";

export default function EcosystemPreview() {
  const icons = {
    hexora: Layers,
    "pu-incent": Cpu,
    evolve: Sparkles,
    "icmmes-2026": BookOpen,
    doodleverse: Palette
  };

  // Define custom column span layouts for the 5 items to form an elegant asymmetric bento grid
  const getColSpan = (id) => {
    if (id === "hexora") {
      return "md:col-span-2";
    }
    return "md:col-span-1";
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Full-Width Header Block - Structured exactly like Section 01 */}
        <ScrollReveal
          baseOpacity={0.2}
          enableBlur={false}
          className="block"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-20 gap-8">
            <div className="lg:max-w-[65%] w-full">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block mb-4">
                [ 03 / VENTURE ECOSYSTEM ]
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.05]">
                Building startup ecosystems,<br className="hidden sm:inline" /> digital systems and<br className="hidden sm:inline" /> modern experiences.
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:max-w-[30%] shrink-0 w-full mb-1">
              <p className="text-soft-gray text-xs sm:text-sm lg:text-base leading-relaxed font-light">
                From startup incubation and founder mentorship to digital products and growth-focused ventures, I build ecosystems that connect people, ideas, technology, and execution into meaningful real-world impact.
              </p>
              <Link href="/projects" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue transition-colors duration-300 w-fit">
                Explore All Projects
                <span className="h-[1px] w-6 bg-charcoal group-hover:bg-accent-blue group-hover:w-8 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Full-Width Bento Grid of Venture Cards */}
        <BentoGrid className="mt-16 sm:mt-24 gap-8 md:gap-10">
          {ecosystemVentures.map((venture, index) => {
            const Icon = icons[venture.id] || Cpu;
            return (
              <BentoGridItem 
                key={venture.id}
                colSpan={getColSpan(venture.id)}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between min-h-[340px] p-8 sm:p-10 border border-charcoal/[0.06] bg-warm-white/40 hover:bg-warm-white/80 transition-all duration-500 rounded-[32px] shadow-premium-sm hover:shadow-premium-md hover:border-charcoal/20 relative overflow-hidden"
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
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal">
                      {venture.title}
                    </h3>
                  </div>
                  <p className="text-soft-gray text-xs sm:text-sm leading-relaxed max-w-xl font-light">
                    {venture.description}
                  </p>
                </div>

                {/* Bottom Metric & Funding Data */}
                <div className="flex items-center justify-between border-t border-border-gray/50 pt-4 w-full text-[11px]">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Funding State</span>
                    <span className="text-xs font-semibold text-charcoal mt-0.5">{venture.funding}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Volume Benchmark</span>
                    <span className="text-xs font-bold text-accent-blue mt-0.5">{venture.metrics}</span>
                  </div>
                </div>
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

export { EcosystemPreview };
