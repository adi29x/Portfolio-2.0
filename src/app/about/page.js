"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { timelineData } from "@/data/timeline";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Cpu, Palette, Code, Brain } from "lucide-react";

export default function AboutPage() {
  const skills = [
    { title: "Experience Architecture", desc: "Crafting highly spatial, interactive, and grid-aligned visual portals inspired by modernist structural aesthetics.", icon: Palette },
    { title: "Venture Automation", desc: "Constructing modular smart contracts, active AI node flows, and intelligent B2B productivity infrastructures.", icon: Cpu },
    { title: "Creative Frontend Engineering", desc: "Writing highly fluid WebGL scenes, interactive canvas shaders, and fast scrolling timelines utilizing GSAP/Lenis.", icon: Code },
    { title: "System Architectures", desc: "Developing server-side rendering routes, optimized database layers, and zero-latency custom API graphs.", icon: Brain }
  ];

  return (
    <div className="flex flex-col w-full bg-soft-white pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background soft highlights */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-accent-sand/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section 1: Cinematic About Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start mb-24">
          <div className="lg:col-span-7 flex flex-col gap-6 animate-fade-in">
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              baseRotation={0}
              className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block"
            >
              [ THE FOUNDER ]
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={10}
              baseRotation={1}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-charcoal leading-none block"
            >
              Aditya Kapoor
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur={true}
              blurStrength={4}
              baseRotation={0}
              className="font-display font-light text-2xl sm:text-3xl text-soft-gray leading-relaxed max-w-xl block"
            >
              Fostering the next generation of startup ecosystems and crafting high-performance digital architectures.
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 pt-0 lg:pt-14">
            <ScrollReveal
              baseOpacity={0.4}
              blurStrength={3}
              baseRotation={0}
              className="text-base sm:text-lg text-soft-gray leading-relaxed block"
            >
              I operate as an entrepreneur, ecosystem leader, and creative developer. As the Chief Student Advisor at PU-iNCENT Incubation Centre, I have had the privilege of guiding 50+ student founders across 20+ active startup cohorts and leading over 150 community events.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.4}
              blurStrength={3}
              baseRotation={0}
              className="text-base sm:text-lg text-soft-gray leading-relaxed block"
            >
              In parallel, I serve as the Founder & CEO of Hexora, a digital products agency that engineers high-performance web systems, bespoke UI systems, and brand strategies for modern enterprises and academic institutions.
            </ScrollReveal>
          </div>
        </div>

        {/* Section 2: Core Philosophy */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading 
            label="01 / PHILOSOPHY" 
            title="Surgical execution meets artistic intent."
            description="We build spaces that command focus. Modern interfaces should not fight for user attention; they must hold it with architectural grace and structural peace."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <GlassCard className="flex flex-col gap-4 p-6 sm:p-8">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                blurStrength={5}
                baseRotation={0.5}
                className="font-display font-bold text-xl sm:text-2xl text-charcoal block"
              >
                Structural Integrity First
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0.4}
                blurStrength={3}
                baseRotation={0}
                className="text-soft-gray text-sm sm:text-base leading-relaxed block"
              >
                We construct digital sites using mathematical spatial alignments. Every element occupies a deliberate coordinate, avoiding standard templates to ensure an unforgettable, original visual journey.
              </ScrollReveal>
            </GlassCard>

            <GlassCard className="flex flex-col gap-4 p-6 sm:p-8">
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                blurStrength={5}
                baseRotation={0.5}
                className="font-display font-bold text-xl sm:text-2xl text-charcoal block"
              >
                Intuitive Human Flow
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0.4}
                blurStrength={3}
                baseRotation={0}
                className="text-soft-gray text-sm sm:text-base leading-relaxed block"
              >
                Fluid scroll triggers and custom magnetic attraction cues guide visitors with zero friction. We believe spatial micro-interactions are highly effective in cultivating professional trust.
              </ScrollReveal>
            </GlassCard>
          </div>
        </div>

        {/* Section 3: Chronological Journey Timeline */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading 
            label="02 / CHRONOLOGY" 
            title="Venture history and leadership milestones."
            description="A journey driven by constant startup incubation, system optimization, and creative development honors."
          />

          <div className="relative border-l border-border-gray ml-2 sm:ml-8 pl-6 sm:pl-12 flex flex-col gap-12 sm:gap-16 max-w-4xl mt-12 sm:mt-16">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Timeline node */}
                <span className="absolute -left-[31px] sm:-left-[55px] top-1.5 h-4 w-4 rounded-full bg-soft-white border-2 border-accent-blue" />
                <span className="absolute -left-[27px] sm:-left-[51px] top-[10px] h-2 w-2 rounded-full bg-accent-blue/40 animate-ping" />

                {/* Content block */}
                <div className="flex flex-col gap-2">
                  <ScrollReveal
                    baseOpacity={0.3}
                    enableBlur={false}
                    baseRotation={0}
                    className="font-mono text-xs font-bold text-accent-blue tracking-wider uppercase block"
                  >
                    {item.year}
                  </ScrollReveal>
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    blurStrength={6}
                    baseRotation={0.5}
                    className="font-display font-bold text-xl sm:text-2xl text-charcoal block"
                  >
                    {item.role} <span className="font-light text-soft-gray">at</span> {item.company}
                  </ScrollReveal>
                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={3}
                    baseRotation={0}
                    className="text-soft-gray text-sm sm:text-base leading-relaxed max-w-2xl mt-1 block"
                  >
                    {item.description}
                  </ScrollReveal>
                  
                  {/* Technology tokens */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 rounded-full bg-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 4: Expertise Bento System */}
        <div className="mb-8">
          <SectionHeading 
            label="03 / CAPABILITIES" 
            title="Disciplines forged in high-scale projects."
            description="Our core design methodologies and specialized software frameworks deployed to solve complex digital hurdles."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <GlassCard key={index} className="flex flex-col gap-4 p-6 sm:p-8 hover:border-accent-blue/20 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-charcoal/5 text-accent-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      blurStrength={5}
                      baseRotation={0.5}
                      className="font-display font-bold text-lg sm:text-xl text-charcoal block"
                    >
                      {skill.title}
                    </ScrollReveal>
                  </div>
                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={3}
                    baseRotation={0}
                    className="text-soft-gray text-xs sm:text-sm leading-relaxed mt-1 block"
                  >
                    {skill.desc}
                  </ScrollReveal>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export { AboutPage };
