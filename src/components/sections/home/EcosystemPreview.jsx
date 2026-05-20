"use client";
import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Palette 
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { ecosystemVentures } from "@/data/ecosystem";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function EcosystemPreview() {
  const icons = {
    hexora: Layers,
    "pu-incent": Cpu,
    "lakshya-2026": Sparkles,
    "icmmes-2026": BookOpen,
    doodleverse: Palette
  };

  // Define custom column span layouts for the 5 items to form an elegant asymmetric grid
  const getColSpan = (id) => {
    if (id === "hexora") {
      return "md:col-span-2";
    }
    return "md:col-span-1";
  };

  return (
    <section className="py-12 sm:py-16 px-6 sm:px-12 bg-soft-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          label="03 / VENTURE ECOSYSTEM" 
          title={`Building startup ecosystems,
digital systems,
and modern experiences.`}
          description="A curated dashboard of active systems, incubation networks, creative experiments, and operational software pipelines."
        />

        <BentoGrid className="mt-16 sm:mt-24 gap-8 md:gap-10">
          {ecosystemVentures.map((venture) => {
            const Icon = icons[venture.id] || Cpu;
            return (
              <BentoGridItem 
                key={venture.id}
                colSpan={getColSpan(venture.id)}
                className="group flex flex-col justify-between min-h-[340px] p-8 sm:p-10 border border-border-gray/10 bg-warm-white/30 hover:bg-warm-white/70 transition-all duration-500 rounded-premium-xl shadow-premium-sm hover:shadow-premium-md hover:border-charcoal/25"
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
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      blurStrength={5}
                      className="font-display font-bold text-xl sm:text-2xl text-charcoal block"
                    >
                      {venture.title}
                    </ScrollReveal>
                  </div>
                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={3}
                    className="text-soft-gray text-xs sm:text-sm leading-relaxed max-w-xl block"
                  >
                    {venture.description}
                  </ScrollReveal>
                </div>

                {/* Bottom Metric & Funding Data */}
                <ScrollReveal
                  baseOpacity={0.4}
                  blurStrength={2}
                  className="flex items-center justify-between border-t border-border-gray/50 pt-4 w-full block"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Funding State</span>
                    <span className="text-xs font-semibold text-charcoal mt-0.5">{venture.funding}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Volume Benchmark</span>
                    <span className="text-xs font-bold text-accent-blue mt-0.5">{venture.metrics}</span>
                  </div>
                </ScrollReveal>
              </BentoGridItem>
            );
          })}
        </BentoGrid>

        <div className="flex justify-center mt-16 sm:mt-20">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
          >
            <Link href="/ecosystem" passHref legacyBehavior>
              <a className="group flex items-center gap-2.5 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/85 border border-transparent hover:border-charcoal/10 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md hover:opacity-90">
                Explore Ecosystem
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
export { EcosystemPreview };
