"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollStack, ScrollStackItem } from "@/components/ui/ScrollStack";

const ECOSYSTEMS = [
  {
    id: "hexora",
    title: "HEXORA",
    category: "Digital Systems & Brand Engineering",
    description: "Building modern websites, startup systems, branding frameworks, and immersive digital experiences for startups, organizations, and future-driven ventures.",
    tags: ["Founder-Led", "Digital Experiences", "Startup Systems"],
    slug: "hexora",
    indexStr: "01",
  },
  {
    id: "pu-incent",
    title: "PU-iNCENT",
    category: "Startup Ecosystem & Innovation Platform",
    description: "Leading and supporting innovation-driven startup ecosystems through founder mentorship, incubation programs, institutional systems, and entrepreneurial initiatives.",
    tags: ["50+ Founders Guided", "Innovation Ecosystem", "Leadership Platform"],
    slug: "pu-incent",
    indexStr: "02",
  },
  {
    id: "evolve",
    title: "EVOLVE",
    category: "Startup Growth & Creative Systems",
    description: "Building creator-focused growth systems, immersive brand experiences, and scalable digital frameworks designed for modern communities and emerging ventures.",
    tags: ["Growth Systems", "Creative Ecosystem", "Digital Innovation"],
    slug: "evolve",
    indexStr: "03",
  }
];

export default function FeaturedProjects() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-soft-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          label="01 / FEATURED ECOSYSTEMS" 
          title={
            <>
              <span className="block sm:whitespace-nowrap">
                Building ventures, <span className="block sm:inline">systems,</span>
              </span>
              <span className="block">and digital experiences.</span>
            </>
          }
          description="A curated collection of startups, platforms, innovation systems, and digital experiences designed across incubation ecosystems, educational initiatives, and modern product environments."
        />

        {/* High-Performance Scroll Stack Interaction System */}
        <div className="relative mt-8 sm:mt-12 w-full">
          <ScrollStack
            itemDistance={70}
            itemScale={0.02}
            itemStackDistance={24}
            stackPosition="18%"
            scaleEndPosition="10%"
            baseScale={0.94}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll={true}
          >
            {ECOSYSTEMS.map((project, index) => {
              return (
                <ScrollStackItem key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block w-full h-full min-h-[350px] sm:min-h-[400px] lg:min-h-[480px] bg-warm-white/20 backdrop-blur-xl border border-charcoal/10 hover:border-accent-blue/20 rounded-[2rem] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-premium-sm hover:shadow-premium-md transition-all duration-500 ease-out hover:-translate-y-[3px] hover:bg-warm-white/40 group cursor-pointer select-none"
                  >
                    {/* Background ambient editorial grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25 pointer-events-none" />
                    
                    {/* Soft glowing ambient lighting in top-right corner */}
                    <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-accent-blue/5 to-transparent blur-[90px] pointer-events-none" />

                    <div className="h-full flex flex-col justify-between relative z-10">
                      {/* TOP ROW: Ecosystem Category & Small Label */}
                      <div className="flex items-center justify-between">
                        <ScrollReveal
                          baseOpacity={0.4}
                          enableBlur={false}
                          className="flex items-center gap-2"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
                          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-accent-blue uppercase">
                            {project.category}
                          </span>
                        </ScrollReveal>
                        <ScrollReveal
                          baseOpacity={0.3}
                          enableBlur={false}
                          className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-soft-gray"
                        >
                          [ {project.indexStr} ]
                        </ScrollReveal>
                      </div>

                      {/* Editorial Divider */}
                      <div className="w-full h-[1px] bg-charcoal/5 my-6 sm:my-8" />

                      {/* CENTER ROW: Large Title with Editorial Typography */}
                      <div className="flex-grow flex items-center py-4">
                        <ScrollReveal
                          baseOpacity={0}
                          enableBlur={true}
                          blurStrength={8}
                          className="w-full"
                        >
                          <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight text-charcoal group-hover:text-accent-blue transition-colors duration-500 leading-[1.05]">
                            {project.title}
                          </h3>
                        </ScrollReveal>
                      </div>

                      {/* Editorial Divider */}
                      <div className="w-full h-[1px] bg-charcoal/5 my-6 sm:my-8" />

                      {/* BOTTOM ROW: Description & Strategy Tags */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
                        <div className="lg:col-span-8">
                          <ScrollReveal
                            baseOpacity={0.4}
                            blurStrength={3}
                            className="text-soft-gray text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl"
                          >
                            {project.description}
                          </ScrollReveal>
                        </div>
                        <div className="lg:col-span-4 flex flex-wrap justify-start lg:justify-end gap-2">
                          {project.tags.map((tag, idx) => (
                            <ScrollReveal
                              key={idx}
                              baseOpacity={0.3}
                              enableBlur={false}
                              delay={idx * 0.05}
                            >
                              <span className="px-3.5 py-1.5 rounded-full bg-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase border border-charcoal/5 group-hover:border-accent-blue/10 group-hover:bg-accent-blue/5 transition-all duration-500">
                                {tag}
                              </span>
                            </ScrollReveal>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
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
