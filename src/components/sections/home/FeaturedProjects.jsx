"use client";
import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const ECOSYSTEMS = [
  {
    id: "hexora",
    title: "HEXORA",
    category: "DIGITAL ARCHITECTURE & SYSTEMS",
    bgColor: "bg-[#F4F3EF]",
    borderColor: "border-charcoal/[0.08] hover:border-accent-blue/30",
    theme: "light",
    status: "SYSTEMS COHORT // ONLINE",
    blueprint: [
      {
        label: "01 / THE FOUNDRY",
        value: "Architecting custom, high-fidelity frontends, tailored WebGL spaces, and light-speed core systems that elevate brand authority."
      },
      {
        label: "02 / TECH ENGINE",
        value: "Next.js 15.2 App Router • React 19 • WebGL Physics • GSAP ScrollTrigger • Tailwind CSS 4.0."
      },
      {
        label: "03 / IMPACT METRIC",
        value: "100/100 Lighthouse performance score paired with lightning-fast sprint delivery."
      }
    ],
    description: "An elite digital engineering engine crafting premium frontends and immersive WebGL platforms. We bridge high-performance code with luxury design to scale digital presence for visionary brands.",
    tags: ["SYSTEMS FOUNDRY", "WEBGL PLATFORMS", "VENTURE SCALE"],
    slug: "hexora",
  },
  {
    id: "pu-incent",
    title: "PU-iNCENT",
    category: "VENTURE INCUBATION & PORTALS",
    bgColor: "bg-[#F4F3EF]",
    borderColor: "border-charcoal/[0.08] hover:border-accent-blue/30",
    theme: "light",
    status: "INCUBATOR SYSTEM // ACTIVE",
    blueprint: [
      {
        label: "01 / PORTALS",
        value: "Structuring administrative workflows, mentor databases, and interactive milestones to track founder trajectories."
      },
      {
        label: "02 / FOUNDER NETWORK",
        value: "Uniting over 50 early-stage student ventures, seasoned mentors, and institutional talent into a singular ecosystem."
      },
      {
        label: "03 / CAPITAL BRIDGES",
        value: "Building digital bridges that connect raw university innovation with regional angel hubs and pre-seed capital."
      }
    ],
    description: "Fostering entrepreneurial energy by building cohesive digital portals, connecting academic talent with angel investors, and nurturing early-stage startups.",
    tags: ["50+ FOUNDERS COHORT", "INCUBATION OS", "ANGEL BRIDGE"],
    slug: "pu-incent",
  },
  {
    id: "evolve",
    title: "EVOLVE",
    category: "CREATOR ECONOMY & BRAND SYSTEMS",
    bgColor: "bg-[#F4F3EF]",
    borderColor: "border-charcoal/[0.08] hover:border-accent-blue/30",
    theme: "light",
    status: "GROWTH CORE // SCALING",
    blueprint: [
      {
        label: "01 / RETENTION FUNNELS",
        value: "Architecting highly tailored audience loops, dynamic analytics dashboard layouts, and low-latency interaction mechanics."
      },
      {
        label: "02 / CINEMATIC UX",
        value: "Blending premium modern typography, high-velocity motion assets, and lazy-loaded immersive showcases."
      },
      {
        label: "03 / GROWTH IMPACT",
        value: "Engineered for 10x community acceleration, global Edge distribution, and high-dwell interaction index."
      }
    ],
    description: "Designing creator-focused growth systems and community-led digital environments. We combine high-retention analytics dashboards with rich spatial design to scale communities.",
    tags: ["10X COMMUNITY SCALE", "CREATOR SYSTEMS", "EDGE METRICS"],
    slug: "evolve",
  }
];

export default function FeaturedProjects() {
  return (
    <section className="pt-14 pb-8 sm:pt-20 sm:pb-10 px-6 sm:px-12 bg-soft-white relative z-10 overflow-visible">
      {/* Premium Ambient Background Experience */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft gradient mesh */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-accent-blue/4 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-accent-sand/3 to-transparent blur-[160px]" />
        
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-gradient-to-bl from-accent-blue/5 to-transparent blur-[120px]" />
        
        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal
          baseOpacity={0.2}
          enableBlur={false}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
            <div className="max-w-3xl">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block mb-4">
                [ 01 / FEATURED ECOSYSTEMS ]
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.05]">
                Building ventures, systems,<br className="sm:hidden" /> and digital experiences.
              </h2>
            </div>
            <div className="flex flex-col gap-4 max-w-sm shrink-0">
              <p className="text-soft-gray text-xs sm:text-sm lg:text-base leading-relaxed font-light">
                A curated collection of startups, platforms, incubation systems, and digital experiences designed across modern product environments.
              </p>
              <Link href="/projects" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue transition-colors duration-300 w-fit">
                Explore All Projects
                <span className="h-[1px] w-6 bg-charcoal group-hover:bg-accent-blue group-hover:w-8 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* High-Performance Scroll Stack Interaction System */}
        <div className="relative w-full">
          <ScrollStack
            itemDistance={550}
            itemScale={0.02}
            itemStackDistance={35}
            stackPosition="10%"
            scaleEndPosition="4%"
            baseScale={0.95}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll={true}
          >
            {ECOSYSTEMS.map((project, index) => {
              return (
                <ScrollStackItem 
                  key={project.id}
                  itemClassName="h-[70vh] min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] max-w-5xl w-full"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    style={{ backfaceVisibility: "hidden", transform: "translate3d(0,0,0)", WebkitBackfaceVisibility: "hidden" }}
                    className={`block w-full h-full ${project.bgColor} border ${project.borderColor} rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 lg:p-10 relative overflow-hidden transition-colors duration-500 group cursor-pointer select-none`}
                  >
                    <div className="flex flex-col justify-between h-full relative z-10">
                      {/* TOP ROW: Category & Minimal Index */}
                      <div className="w-full">
                        <div className="flex justify-between items-start pb-4">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-accent-navy">
                              {project.category}
                            </span>
                          </div>
                          <div className="hidden md:flex items-center gap-4">
                            <span className="text-[9px] font-mono tracking-widest text-charcoal/50">
                              {project.status}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-charcoal/60">
                            / 0{index + 1}
                          </span>
                        </div>
                        <div className="w-full h-[1px] bg-charcoal/10" />
                      </div>

                      {/* MAIN ASYMMETRIC GRID AREA */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-4 sm:py-6">
                        {/* Left Column: Brand & Editorial Intro */}
                        <div className="lg:col-span-5 flex flex-col justify-between h-full">
                          <div>
                            <h3 
                              style={{ fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
                              className="font-bold tracking-tight text-charcoal group-hover:text-accent-blue text-3xl sm:text-4xl lg:text-5xl uppercase transition-colors duration-500 mb-4 sm:mb-6"
                            >
                              {project.title}
                            </h3>
                            <p className="text-xs sm:text-sm font-light leading-relaxed text-charcoal/70 max-w-sm">
                              {project.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-6 lg:mt-8">
                            {project.tags.map((tag, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase border border-charcoal/10 bg-charcoal/[0.03] text-charcoal/80 group-hover:border-accent-blue/30 group-hover:bg-accent-blue/5 group-hover:text-accent-navy transition-colors duration-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right Column: Blueprint Details */}
                        <div className="lg:col-span-7 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-charcoal/10 pt-6 lg:pt-0 lg:pl-10">
                          <div className="space-y-3 sm:space-y-4">
                            {project.blueprint.map((spec, sIdx) => (
                              <div key={sIdx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b border-charcoal/[0.08] pb-3 last:border-0 last:pb-0">
                                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-accent-navy sm:w-36 shrink-0 pt-0.5">
                                  {spec.label}
                                </span>
                                <p className="text-xs sm:text-[13px] font-light leading-relaxed tracking-wide text-charcoal/80">
                                  {spec.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>


                      {/* BOTTOM ROW: Immersive interactive indicator */}
                      <div className="w-full">
                        <div className="w-full h-[1px] bg-charcoal/10 mb-4" />
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono tracking-widest text-charcoal/40 uppercase">
                            Click to explore thesis
                          </span>
                          <span className="group-hover:translate-x-2 transition-transform duration-300 text-charcoal group-hover:text-accent-blue text-sm">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}

export { FeaturedProjects };


