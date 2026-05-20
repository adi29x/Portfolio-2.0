"use client";
import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { metrics } from "@/data/metrics";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function FloatingMetrics() {
  return (
    <section className="py-12 sm:py-16 px-6 sm:px-12 bg-warm-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          label="04 / ECOSYSTEM INSIGHTS" 
          title="Impact built through systems, leadership, and execution."
          description="A quantitative overview of validated performance benchmarks across startup incubations, digital platforms, and system deliveries."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-charcoal/10 divide-y md:divide-y-0 md:divide-x divide-charcoal/10 mt-12 sm:mt-16 py-8">
          {metrics.map((metric, index) => (
            <ScrollReveal
              key={index}
              baseOpacity={0}
              enableBlur={true}
              blurStrength={5}
              stagger={0.06}
              className="px-6 sm:px-8 py-6 sm:py-4 flex flex-col gap-4 first:pl-0 last:pr-0 block"
            >
              <span className="font-display font-bold text-5xl sm:text-6xl text-accent-blue tracking-tighter leading-none block">
                {metric.value}
              </span>
              
              <div className="flex flex-col gap-1.5">
                <h4 className="font-sans font-bold text-charcoal text-sm uppercase tracking-wider leading-snug">
                  {metric.label}
                </h4>
                <p className="text-soft-gray text-xs sm:text-sm leading-relaxed">
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
