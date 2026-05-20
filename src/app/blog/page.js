"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const articles = [
    {
      id: "modern-incubation",
      title: "Rethinking Student Incubation: Beyond the Pitch Deck",
      excerpt: "Why standard academic incubator templates fail early-stage student builders, and how we structured PU-iNCENT around active validation bootcamps.",
      date: "May 15, 2026",
      readTime: "6 min read",
      category: "Incubation",
      slug: "rethinking-student-incubation"
    },
    {
      id: "spatial-interfaces",
      title: "The Architecture of Spatial UI Design Systems",
      excerpt: "An editorial analysis of Apple, Linear, and Stripe layout frameworks. How spatial alignment, deliberate whitespace, and micro-movements build professional trust.",
      date: "April 28, 2026",
      readTime: "8 min read",
      category: "UI Design",
      slug: "architecture-spatial-ui"
    },
    {
      id: "agency-scaling",
      title: "Bootstrapping Hexora: Lessons from a Student-Led Agency",
      excerpt: "Building high-performance client dashboards, co-ordinating agile design sprints, and managing stakeholder expectations without institutional venture capital.",
      date: "March 12, 2026",
      readTime: "10 min read",
      category: "Entrepreneurship",
      slug: "bootstrapping-hexora"
    },
    {
      id: "developer-productivity",
      title: "Optimizing the Developer OS: Time Blocking & Sprints",
      excerpt: "A tactical breakdown of my daily personal operating system routine, balancing multi-agent tech research with active administrative operations.",
      date: "February 18, 2026",
      readTime: "5 min read",
      category: "Productivity",
      slug: "optimizing-developer-os"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-soft-white pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-accent-sand/5 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Page Header */}
        <div className="flex flex-col gap-6 max-w-3xl mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase">
            [ IDEAS LAB & RESEARCH ]
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-charcoal leading-none">
            Ideas Lab
          </h1>
          <p className="font-display font-light text-2xl text-soft-gray leading-relaxed mt-2">
            Editorial essays and tactical insights on startup operations, modern UI design systems, and product development strategy.
          </p>
        </div>

        {/* Section 1: Newspaper Editorial Columns */}
        <div>
          <SectionHeading
            label="01 / INDEXED ARTICLES"
            title="Surgical essays drafted for active builders."
            description="Our documented operational frameworks and frontend coding methodologies compiled into spacious reading modules."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mt-12">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <GlassCard className="flex flex-col justify-between p-6 sm:p-8 h-full hover:shadow-premium-lg transition-all duration-500 border border-border-gray/5 bg-white/40">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-3 text-soft-gray text-[10px] font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal group-hover:text-accent-blue transition-colors duration-300 leading-tight mt-2">
                      {article.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-soft-gray text-sm leading-relaxed mt-2 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read Link */}
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal group-hover:text-accent-blue transition-colors duration-300 mt-8 border-t border-border-gray/50 pt-5">
                    Read Column
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </GlassCard>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
