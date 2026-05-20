"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ecosystemVentures } from "@/data/ecosystem";
import { Calendar, Users, Award, TrendingUp, Compass, ArrowUpRight } from "lucide-react";

export default function EcosystemPage() {
  const stats = [
    { label: "Total Startup Cohorts", value: "20+", desc: "Active teams incubated within the campus center.", icon: Users },
    { label: "Community Events Led", value: "150+", desc: "Hackathons, pitch days, speaker series, and validation bootcamps.", icon: Calendar },
    { label: "Active Student Founders", value: "50+", desc: "Mentored directly from concepts to pre-seed validations.", icon: Award },
    { label: "Successful Launch Rate", value: "85%", desc: "Of cohort projects deployed live on public domains.", icon: TrendingUp }
  ];

  return (
    <div className="flex flex-col w-full bg-soft-white pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Soft spatial highlight */}
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-accent-blue/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Page Header */}
        <div className="flex flex-col gap-6 max-w-3xl mb-20 animate-fade-in">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block"
          >
            [ PU-INCENT INCUBATION CENTRE ]
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10}
            baseRotation={1}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-charcoal leading-none block"
          >
            Startup Ecosystem
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            blurStrength={4}
            baseRotation={0}
            className="font-display font-light text-2xl text-soft-gray leading-relaxed mt-2 block"
          >
            Managing the flagship incubation pipeline at Poornima University, Jaipur. Empowering young minds to validate, build, and deploy.
          </ScrollReveal>
        </div>

        {/* Section 1: Dynamic Metrics Grid */}
        <div className="mb-24">
          <SectionHeading
            label="01 / ECOSYSTEM BENCHMARKS"
            title="Incubator metrics and event coordinates."
            description="Our structural operational benchmarks managing student validation workflows, resource distribution, and event frameworks."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlassCard className="flex flex-col gap-4 p-6 sm:p-8 h-full justify-between hover:border-accent-blue/20 transition-all duration-300">
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      blurStrength={5}
                      className="font-display font-bold text-4xl sm:text-5xl text-accent-blue tracking-tighter leading-none block"
                    >
                      {stat.value}
                    </ScrollReveal>
                    <ScrollReveal
                      baseOpacity={0.4}
                      blurStrength={3}
                      baseRotation={0}
                      className="flex flex-col gap-1.5 mt-4 block"
                    >
                      <h4 className="font-sans font-bold text-charcoal text-sm uppercase tracking-wider flex items-center gap-2">
                        <Icon className="h-4 w-4 text-soft-gray" />
                        {stat.label}
                      </h4>
                      <p className="text-soft-gray text-xs sm:text-sm leading-relaxed mt-0.5">
                        {stat.desc}
                      </p>
                    </ScrollReveal>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Active Cohort Ventures */}
        <div className="mb-24">
          <SectionHeading
            label="02 / VENTURE SHAPE SHIFT"
            title="Flagship student startups and projects."
            description="A curated overview of incubated ventures and strategic design concepts scaling within our sandbox environments."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {ecosystemVentures.map((venture, index) => (
              <motion.div
                key={venture.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="flex flex-col justify-between p-6 sm:p-8 h-full relative group hover:shadow-premium-lg transition-all duration-500">
                  <div>
                    {/* Top badging */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase">
                        {venture.type}
                      </span>
                      <span className="text-[10px] font-semibold text-accent-blue tracking-wide uppercase">
                        {venture.status}
                      </span>
                    </div>

                    {/* Middle Info */}
                    <div className="my-8 flex flex-col gap-3">
                      <ScrollReveal
                        baseOpacity={0}
                        enableBlur={true}
                        blurStrength={6}
                        baseRotation={0.5}
                        className="font-display font-bold text-2xl text-charcoal group-hover:text-accent-blue transition-colors duration-300 block"
                      >
                        {venture.title}
                      </ScrollReveal>
                      <ScrollReveal
                        baseOpacity={0.4}
                        blurStrength={3}
                        baseRotation={0}
                        className="text-soft-gray text-sm leading-relaxed max-w-md block"
                      >
                        {venture.description}
                      </ScrollReveal>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <ScrollReveal
                    baseOpacity={0.4}
                    blurStrength={2}
                    className="flex items-center justify-between border-t border-border-gray/50 pt-5 w-full block"
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Funding model</span>
                      <span className="text-xs font-semibold text-charcoal mt-0.5">{venture.funding}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-mono text-soft-gray tracking-wider uppercase font-bold">Growth metrics</span>
                      <span className="text-xs font-bold text-accent-blue mt-0.5">{venture.metrics}</span>
                    </div>
                  </ScrollReveal>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Ecosystem Mission Statement */}
        <div className="bg-warm-white rounded-premium-lg border border-border-gray/60 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-12 relative z-10 shadow-premium-sm">
          <div className="flex flex-col gap-4 max-w-2xl">
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              baseRotation={0}
              className="text-xs font-mono font-bold text-accent-blue tracking-widest uppercase block"
            >
              [ DIRECTORS NOTE ]
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={8}
              baseRotation={1}
              className="font-display font-bold text-3xl sm:text-4xl text-charcoal leading-tight block"
            >
              Let's validate your next big idea.
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.4}
              blurStrength={3}
              baseRotation={0}
              className="text-soft-gray text-sm sm:text-base leading-relaxed block"
            >
              We provide structural mentor pathways, regulatory incubation support, spatial workspace access, and pre-seed pitch sessions. If you are a student builder at Poornima, our office doors are always open.
            </ScrollReveal>
          </div>

          <a
            href="/contact"
            className="px-6 py-4 bg-charcoal hover:bg-accent-navy text-soft-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-premium-md shrink-0 flex items-center gap-2 group"
          >
            Apply for Incubation
            <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}
