"use client";
import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/ui/CountUp";

const metricsData = [
  {
    value: 150,
    label: "Innovation Events",
    description: "Workshops, entrepreneurship challenges, startup events, and ecosystem-building initiatives."
  },
  {
    value: 50,
    label: "Founders Guided",
    description: "Supporting student founders from validation to pitch-ready execution."
  },
  {
    value: 200,
    label: "Design Assets Created",
    description: "Digital interfaces, branding systems, prototypes, presentations, and visual experiences."
  }
];

export default function FloatingMetrics() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-soft-white border-b border-charcoal/5 relative z-10 overflow-hidden">
      {/* Background elegant grid & spatial depth (Identical to Section 01 & 03) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

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
                [ 04 / ECOSYSTEM INSIGHTS ]
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.05]">
                Impact through<br className="hidden sm:inline" /> systems, leadership,<br className="hidden sm:inline" /> and execution.
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:max-w-[30%] shrink-0 w-full mb-1">
              <p className="text-soft-gray text-xs sm:text-sm lg:text-base leading-relaxed font-light">
                Measurable outcomes delivered through startup ecosystems, founder mentorship, digital products, and innovation-focused initiatives.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Architectural Grid of Animated Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-b border-charcoal/10 divide-y sm:divide-y-0 lg:divide-x divide-charcoal/10 mt-12 sm:mt-16 py-8">
          {metricsData.map((metric, index) => (
            <ScrollReveal
              key={index}
              baseOpacity={0}
              enableBlur={true}
              blurStrength={5}
              stagger={0.06}
              className="px-6 sm:px-8 py-6 sm:py-4 flex flex-col gap-4 first:pl-0 last:pr-0 border-t first:border-t-0 sm:border-t-0 block"
            >
              {/* Large numeric typography with animated CountUp */}
              <span className="font-display font-bold text-5xl sm:text-6xl text-charcoal tracking-tighter leading-none flex items-baseline">
                <CountUp 
                  from={0} 
                  to={metric.value} 
                  duration={2} 
                  separator="," 
                  startWhen={true} 
                />
                <span className="text-accent-blue ml-0.5 select-none">+</span>
              </span>
              
              <div className="flex flex-col gap-1.5">
                <h4 className="font-sans font-bold text-charcoal text-sm uppercase tracking-wider leading-snug">
                  {metric.label}
                </h4>
                <p className="text-soft-gray text-xs sm:text-sm leading-relaxed font-light">
                  {metric.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FloatingMetrics };
