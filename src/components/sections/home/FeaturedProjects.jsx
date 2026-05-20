"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function FeaturedProjects() {
  return (
    <section className="py-12 sm:py-16 px-6 sm:px-12 bg-soft-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          label="01 / FEATURED ECOSYSTEMS" 
          title={`Building ventures,
systems,
and digital experiences.`}
          description="A curated collection of startups, platforms, innovation systems, and digital experiences designed across incubation ecosystems, educational initiatives, and modern product environments."
        />

        {/* Asymmetrical Bento Grid of Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 sm:mt-20">
          {/* Project 1: Hexora (Full-width Split-content Bento Card) */}
          {projects
            .filter((p) => p.id === "hexora")
            .map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="lg:col-span-12 group block p-8 sm:p-12 bg-warm-white/10 hover:bg-warm-white/40 border border-charcoal/5 hover:border-accent-blue/20 rounded-premium-xl transition-all duration-500 shadow-premium-sm hover:shadow-premium-md relative overflow-hidden"
              >
                {/* Background ambient editorial grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />
                
                {/* A very subtle radial gradient highlight in the top-right corner */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-accent-blue/5 to-transparent blur-[80px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative z-10">
                  {/* Left: Text Content */}
                  <div className="lg:col-span-6 flex flex-col items-start">
                    <ScrollReveal
                      baseOpacity={0.3}
                      enableBlur={false}
                      baseRotation={0}
                      className="flex items-center gap-3 mb-4"
                    >
                      <span className="text-xs font-mono font-bold tracking-widest text-accent-blue">[ 01 ]</span>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                        {project.category}
                      </span>
                    </ScrollReveal>

                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      blurStrength={6}
                      baseRotation={0.5}
                      className="font-display font-bold text-3xl sm:text-4xl text-charcoal group-hover:text-accent-blue transition-colors duration-300 leading-tight mb-4 tracking-tight block"
                    >
                      {project.title}
                    </ScrollReveal>

                    <ScrollReveal
                      baseOpacity={0.4}
                      blurStrength={3}
                      baseRotation={0}
                      className="text-soft-gray text-sm sm:text-base leading-relaxed mb-6 block"
                    >
                      {project.description}
                    </ScrollReveal>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Technical Spec Panel (Typography Focused Grid) */}
                  <div className="lg:col-span-6 w-full h-full flex flex-col justify-between p-6 sm:p-8 rounded-premium-lg border border-charcoal/5 bg-soft-white/60 backdrop-blur-md relative overflow-hidden">
                    {/* Technical frame corners */}
                    <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-charcoal/15 pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-charcoal/15 pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-charcoal/15 pointer-events-none" />
                    <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-charcoal/15 pointer-events-none" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                      {/* Left half: Metrics */}
                      <div className="flex flex-col gap-4">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase border-b border-charcoal/5 pb-2 block">
                          SYSTEM METRICS
                        </span>
                        <ScrollReveal
                          baseOpacity={0.4}
                          blurStrength={3}
                          className="flex flex-col gap-3"
                        >
                          {Object.entries(project.metrics).map(([key, val]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-[10px] font-mono text-soft-gray/70 uppercase tracking-wider leading-none">{key}</span>
                              <span className="text-xs font-bold text-charcoal mt-1 leading-normal">{val}</span>
                            </div>
                          ))}
                        </ScrollReveal>
                      </div>

                      {/* Right half: Strategy */}
                      <div className="flex flex-col gap-4">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase border-b border-charcoal/5 pb-2 block">
                          CORE STRATEGY
                        </span>
                        <ScrollReveal
                          baseOpacity={0.4}
                          blurStrength={3}
                          className="flex flex-col gap-3"
                        >
                          <div>
                            <span className="text-[10px] font-mono text-soft-gray/70 uppercase tracking-wider block">OBJECTIVE</span>
                            <p className="text-[11px] text-soft-gray leading-relaxed mt-1">
                              {project.strategy}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-soft-gray/70 uppercase tracking-wider block">EXECUTION</span>
                            <p className="text-[11px] text-soft-gray leading-relaxed mt-1">
                              {project.process}
                            </p>
                          </div>
                        </ScrollReveal>
                      </div>
                    </div>

                    {/* Reveal indicator in right corner */}
                    <div className="flex items-center justify-between border-t border-charcoal/5 pt-4 mt-6 w-full">
                      <span className="text-[9px] font-mono text-accent-blue uppercase tracking-widest font-bold">SYSTEM LOG LOCKED</span>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-charcoal group-hover:text-accent-blue transition-colors duration-300 font-bold">
                        SYSTEM ARCHITECTURE
                        <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          {/* Project 2: PU-iNCENT Website (Half-width Bento Card) */}
          {projects
            .filter((p) => p.id === "pu-incent")
            .map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="lg:col-span-6 group block p-8 sm:p-10 bg-warm-white/10 hover:bg-warm-white/40 border border-charcoal/5 hover:border-accent-blue/20 rounded-premium-xl transition-all duration-500 shadow-premium-sm hover:shadow-premium-md relative overflow-hidden flex flex-col justify-between min-h-[460px]"
              >
                {/* Background ambient editorial grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

                <div className="flex flex-col items-start w-full relative z-10">
                  <ScrollReveal
                    baseOpacity={0.3}
                    enableBlur={false}
                    baseRotation={0}
                    className="flex items-center gap-3 mb-4"
                  >
                    <span className="text-xs font-mono font-bold tracking-widest text-accent-blue">[ 02 ]</span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                      {project.category}
                    </span>
                  </ScrollReveal>

                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    blurStrength={6}
                    baseRotation={0.5}
                    className="font-display font-bold text-2xl sm:text-3xl text-charcoal group-hover:text-accent-blue transition-colors duration-300 leading-tight mb-3 tracking-tight block"
                  >
                    {project.title}
                  </ScrollReveal>

                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={3}
                    baseRotation={0}
                    className="text-soft-gray text-xs sm:text-sm leading-relaxed mb-6 block"
                  >
                    {project.description}
                  </ScrollReveal>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-full bg-charcoal/5 text-[8px] font-mono font-bold tracking-widest text-charcoal uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower Technicalspec dashboard panel */}
                <div className="w-full relative z-10 border border-charcoal/5 bg-soft-white/60 backdrop-blur-md p-5 rounded-premium-lg flex flex-col justify-between overflow-hidden">
                  {/* Technical frame corners */}
                  <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-charcoal/15 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-1 h-1 border-t border-r border-charcoal/15 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-1 h-1 border-b border-l border-charcoal/15 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-charcoal/15 pointer-events-none" />

                  <span className="text-[8px] font-mono font-bold tracking-widest text-soft-gray uppercase border-b border-charcoal/5 pb-2 mb-3 block">
                    ECOSYSTEM BENCHMARKS
                  </span>
                  
                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={3}
                    className="grid grid-cols-2 gap-4"
                  >
                    {Object.entries(project.metrics).slice(0, 2).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[9px] font-mono text-soft-gray/70 uppercase tracking-wider leading-none">{key}</span>
                        <span className="text-[11px] font-bold text-charcoal mt-1 leading-normal">{val}</span>
                      </div>
                    ))}
                  </ScrollReveal>

                  <div className="flex items-center justify-between border-t border-charcoal/5 pt-3 mt-4 w-full">
                    <span className="text-[8px] font-mono text-accent-blue uppercase tracking-widest font-bold">VERIFIED COHORT</span>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-charcoal group-hover:text-accent-blue transition-colors duration-300 font-bold">
                      EXPLORE INTERACTIVE PORTAL
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          {/* Project 3: Lakshya 2026 (Half-width Bento Card) */}
          {projects
            .filter((p) => p.id === "lakshya-2026")
            .map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="lg:col-span-6 group block p-8 sm:p-10 bg-warm-white/10 hover:bg-warm-white/40 border border-charcoal/5 hover:border-accent-blue/20 rounded-premium-xl transition-all duration-500 shadow-premium-sm hover:shadow-premium-md relative overflow-hidden flex flex-col justify-between min-h-[460px]"
              >
                {/* Background ambient editorial grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />

                <div className="flex flex-col items-start w-full relative z-10">
                  <ScrollReveal
                    baseOpacity={0.3}
                    enableBlur={false}
                    baseRotation={0}
                    className="flex items-center gap-3 mb-4"
                  >
                    <span className="text-xs font-mono font-bold tracking-widest text-accent-blue">[ 03 ]</span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                      {project.category}
                    </span>
                  </ScrollReveal>

                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    blurStrength={6}
                    baseRotation={0.5}
                    className="font-display font-bold text-2xl sm:text-3xl text-charcoal group-hover:text-accent-blue transition-colors duration-300 leading-tight mb-3 tracking-tight block"
                  >
                    {project.title}
                  </ScrollReveal>

                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={3}
                    baseRotation={0}
                    className="text-soft-gray text-xs sm:text-sm leading-relaxed mb-6 block"
                  >
                    {project.description}
                  </ScrollReveal>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-full bg-charcoal/5 text-[8px] font-mono font-bold tracking-widest text-charcoal uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lower Technicalspec dashboard panel */}
                <div className="w-full relative z-10 border border-charcoal/5 bg-soft-white/60 backdrop-blur-md p-5 rounded-premium-lg flex flex-col justify-between overflow-hidden">
                  {/* Technical frame corners */}
                  <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-charcoal/15 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-1 h-1 border-t border-r border-charcoal/15 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-1 h-1 border-b border-l border-charcoal/15 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-charcoal/15 pointer-events-none" />

                  <span className="text-[8px] font-mono font-bold tracking-widest text-soft-gray uppercase border-b border-charcoal/5 pb-2 mb-3 block">
                    SYSTEM BENCHMARKS
                  </span>
                  
                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={3}
                    className="grid grid-cols-2 gap-4"
                  >
                    {Object.entries(project.metrics).slice(0, 2).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[9px] font-mono text-soft-gray/70 uppercase tracking-wider leading-none">{key}</span>
                        <span className="text-[11px] font-bold text-charcoal mt-1 leading-normal">{val}</span>
                      </div>
                    ))}
                  </ScrollReveal>

                  <div className="flex items-center justify-between border-t border-charcoal/5 pt-3 mt-4 w-full">
                    <span className="text-[8px] font-mono text-accent-blue uppercase tracking-widest font-bold">SYSTEM CONCEPT</span>
                    <div className="flex items-center gap-1 text-[9px] font-mono text-charcoal group-hover:text-accent-blue transition-colors duration-300 font-bold">
                      EXPLORE INTERACTIVE PORTAL
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className="flex justify-center mt-12 sm:mt-16">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
          >
            <Link href="/projects" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue transition-colors duration-300">
              Explore All Projects
              <span className="h-[1px] w-6 bg-charcoal group-hover:bg-accent-blue group-hover:w-8 transition-all duration-300" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
export { FeaturedProjects };
