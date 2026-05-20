"use client";
import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";
import { projects } from "@/data/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ProjectDetailPage({ params }) {
  // Safe extraction of params in Next.js 15
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  // Find project
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-soft-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-display font-bold text-charcoal">Experiment Not Found</h1>
        <p className="text-soft-gray mt-2">The requested incubator research paper is currently offline.</p>
        <Link href="/projects" className="mt-6 px-6 py-3 bg-charcoal text-soft-white rounded-full text-xs font-bold uppercase tracking-wider shadow-premium-md">
          Return to Lab
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-soft-white pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Dynamic ambient color background highlight */}
      <div 
        className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[130px] pointer-events-none opacity-10 transition-colors duration-1000"
        style={{ backgroundColor: project.color }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Back Link Button */}
        <Link href="/projects" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-soft-gray hover:text-charcoal transition-colors duration-300 mb-8">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          Innovation Lab
        </Link>

        {/* Hero Meta block */}
        <div className="flex flex-col gap-4 max-w-3xl mb-12 sm:mb-16">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block"
          >
            [ CASE STUDY: {project.category} ]
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10}
            baseRotation={1}
            className="font-display font-bold text-5xl sm:text-6xl tracking-tight text-charcoal leading-none block"
          >
            {project.title}
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            blurStrength={4}
            baseRotation={0}
            className="font-display font-light text-2xl text-soft-gray leading-relaxed mt-2 block"
          >
            {project.subtitle}
          </ScrollReveal>
        </div>

        {/* Big cinematic case study hero banner */}
        <div className="w-full aspect-[21/9] rounded-premium-xl overflow-hidden mb-16 shadow-premium-lg border border-border-gray/5 bg-warm-white">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale-[15%]"
          />
        </div>

        {/* Split grid details block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Main Case study narrative content (Left Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-10 sm:gap-12">
            <div>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={false}
                baseRotation={0}
                className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase mb-3 block"
              >
                [ THE CHALLENGE ]
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0.4}
                blurStrength={3}
                baseRotation={0}
                className="text-base sm:text-lg text-charcoal leading-relaxed block"
              >
                {project.challenge}
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={false}
                baseRotation={0}
                className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase mb-3 block"
              >
                [ STRATEGY & ARCHITECTURE ]
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0.4}
                blurStrength={3}
                baseRotation={0}
                className="text-base sm:text-lg text-soft-gray leading-relaxed block"
              >
                {project.strategy}
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={false}
                baseRotation={0}
                className="text-xs font-mono font-bold tracking-widest text-accent-blue uppercase mb-3 block"
              >
                [ INCUBATION PROCESS ]
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0.4}
                blurStrength={3}
                baseRotation={0}
                className="text-base sm:text-lg text-soft-gray leading-relaxed block"
              >
                {project.process}
              </ScrollReveal>
            </div>
          </div>

          {/* Performance benchmarks side columns (Right Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            <GlassCard className="flex flex-col gap-6 p-6 sm:p-8 border border-border-gray/10 shadow-premium-md bg-warm-white/45">
              <h3 className="text-xs font-mono font-bold tracking-widest text-charcoal border-b border-border-gray pb-3">
                BENCHMARKS DELIVERED
              </h3>
              
              <ul className="flex flex-col gap-4">
                {Object.entries(project.metrics).map(([key, val]) => (
                  <li key={key}>
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      blurStrength={5}
                      className="flex items-start gap-3 block"
                    >
                      <CheckCircle className="h-4 w-4 text-accent-blue shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-soft-gray uppercase tracking-widest leading-none font-bold">{key}</span>
                        <span className="text-base font-bold text-charcoal mt-1 leading-tight">{val}</span>
                      </div>
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <a 
              href="mailto:aditya@hexora.in"
              className="flex items-center justify-between px-6 py-4 rounded-premium-md bg-charcoal text-soft-white hover:bg-accent-navy transition-colors duration-300 text-xs font-bold uppercase tracking-widest shadow-premium-sm"
            >
              Inquire venture details
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Next Case Study CTA */}
        <div className="border-t border-border-gray pt-16 mt-16 flex items-center justify-between">
          <Link href="/projects" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue transition-colors duration-300">
            <span className="h-[1px] w-6 bg-charcoal group-hover:bg-accent-blue group-hover:w-8 transition-all duration-300" />
            Return to Lab
          </Link>
        </div>
      </div>
    </div>
  );
}
export { ProjectDetailPage };
