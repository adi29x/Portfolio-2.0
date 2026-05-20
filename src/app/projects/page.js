"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Startup Systems", "Web Portals", "Personal Lab"];
  
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="flex flex-col w-full bg-soft-white pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-accent-blue/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Page Heading */}
        <SectionHeading 
          label="INNOVATION LAB" 
          title="Spatial products co-founded and designed."
          description="A chronological directory of smart contract protocols, high-performance visual timelines, and architectural UI design libraries."
        />

        {/* Categories filters filter pill row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-border-gray/50 pb-6 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? "bg-charcoal text-soft-white shadow-premium-md" 
                    : "bg-charcoal/5 hover:bg-charcoal/10 text-soft-gray hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <Link href={`/projects/${project.slug}`} className="group block">
                  <GlassCard className="flex flex-col gap-6 p-5 sm:p-6 h-full">
                    {/* Image container */}
                    <div className="relative aspect-[16/10] w-full rounded-premium-md overflow-hidden bg-warm-white">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out"
                      />
                      <span className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full glass-panel text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase shadow-premium-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <ScrollReveal
                          baseOpacity={0}
                          enableBlur={true}
                          blurStrength={6}
                          baseRotation={0.5}
                          className="font-display font-bold text-2xl sm:text-3xl text-charcoal group-hover:text-accent-blue transition-colors duration-300 block"
                        >
                          {project.title}
                        </ScrollReveal>
                        <span className="p-2 rounded-full border border-border-gray hover:bg-charcoal hover:text-soft-white transition-all duration-300">
                          <ArrowUpRight className="h-4.5 w-4.5 group-hover:rotate-45 transition-transform duration-300" />
                        </span>
                      </div>
                      
                      <ScrollReveal
                        baseOpacity={0.4}
                        blurStrength={3}
                        baseRotation={0}
                        className="text-soft-gray text-xs sm:text-sm leading-relaxed block"
                      >
                        {project.description}
                      </ScrollReveal>

                      {/* Tech Tags and volume benchmark */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 rounded bg-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <ScrollReveal
                        baseOpacity={0.4}
                        blurStrength={2}
                        className="flex items-center gap-3 border-t border-border-gray/50 mt-4 pt-4 block"
                      >
                        <span className="text-[10px] font-mono font-bold tracking-wider text-soft-gray uppercase">Efficiency metrics</span>
                        <span className="text-xs font-semibold text-accent-blue tracking-wide">{project.metric}</span>
                      </ScrollReveal>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
export { ProjectsPage };
