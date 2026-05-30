"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, Clock, ArrowRight, X, ArrowDown } from "lucide-react";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import KnowledgeConstellation from "@/components/three/KnowledgeConstellation";

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [mounted, setMounted] = useState(false);
  const articlesSectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const articles = [
    {
      id: "modern-incubation",
      title: "Rethinking Student Incubation: Beyond the Pitch Deck",
      excerpt: "Why standard academic incubator templates fail early-stage student builders, and how we structured PU-iNCENT around active validation bootcamps.",
      date: "May 15, 2026",
      readTime: "6 min read",
      category: "Incubation",
      slug: "rethinking-student-incubation",
      tags: ["Startups", "Entrepreneurship", "Innovation", "Strategy"]
    },
    {
      id: "spatial-interfaces",
      title: "The Architecture of Spatial UI Design Systems",
      excerpt: "An editorial analysis of Apple, Linear, and Stripe layout frameworks. How spatial alignment, deliberate whitespace, and micro-movements build professional trust.",
      date: "April 28, 2026",
      readTime: "8 min read",
      category: "UI Design",
      slug: "architecture-spatial-ui",
      tags: ["Product Design", "Branding", "Web Experiences", "Systems"]
    },
    {
      id: "agency-scaling",
      title: "Bootstrapping Hexora: Lessons from a Student-Led Agency",
      excerpt: "Building high-performance client dashboards, co-ordinating agile design sprints, and managing stakeholder expectations without institutional venture capital.",
      date: "March 12, 2026",
      readTime: "10 min read",
      category: "Entrepreneurship",
      slug: "bootstrapping-hexora",
      tags: ["Startups", "Growth", "Leadership", "Entrepreneurship", "Strategy"]
    },
    {
      id: "developer-productivity",
      title: "Optimizing the Developer OS: Time Blocking & Sprints",
      excerpt: "A tactical breakdown of my daily personal operating system routine, balancing multi-agent tech research with active administrative operations.",
      date: "February 18, 2026",
      readTime: "5 min read",
      category: "Productivity",
      slug: "optimizing-developer-os",
      tags: ["Systems", "Strategy", "Technology", "AI"]
    }
  ];

  // Dynamic filter logic based on selected node/tag
  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags.includes(selectedTag))
    : articles;

  // Handles scrolling down to the articles index
  const scrollToArticles = () => {
    articlesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Node click handler from R3F canvas
  const handleNodeClick = (tagName) => {
    setSelectedTag(tagName);
    // Smooth scroll down to feed so user sees the filtered results instantly
    setTimeout(() => {
      scrollToArticles();
    }, 150);
  };

  return (
    <div className="flex flex-col w-full bg-soft-white relative overflow-hidden">
      {/* Cinematic background layouts */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-accent-sand/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute top-[5%] left-[-5%] w-[40%] h-[50%] rounded-full bg-gradient-to-br from-accent-blue/4 to-transparent blur-[120px] pointer-events-none" />

      {/* ── HERO SECTION WITH 3D KNOWLEDGE CONSTELLATION ────────────────── */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 px-6 sm:px-12 relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px]">
          
          {/* LEFT: Premium Editorial Copy */}
          <div className="flex flex-col items-start lg:col-span-5 relative z-30">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-6 block"
            >
              [ IDEAS LAB ]
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.06] mb-6"
            >
              Exploring ideas,<br />
              <span className="text-charcoal/50 font-light">building systems,</span><br />
              sharing insights.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-light text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-lg mb-10"
            >
              Thoughts on startups, digital products, branding, innovation, systems thinking, and the future of technology.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={scrollToArticles}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-charcoal text-white hover:bg-accent-navy hover:shadow-premium-md text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                Explore Articles
                <ArrowDown className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all duration-300" />
              </button>
              <button
                onClick={() => {
                  setSelectedTag("Strategy");
                  setTimeout(scrollToArticles, 150);
                }}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent text-charcoal border border-charcoal/15 hover:border-charcoal/35 hover:bg-white text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                View Research
                <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT: 3D R3F Knowledge Constellation Canvas */}
          <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] lg:col-span-7 relative z-20 flex items-center justify-center select-none mt-6 lg:mt-0">
            {mounted && (
              <ThreeCanvas
                camera={{ position: [0, 0, 5.8], fov: 45 }}
                className="w-full h-full"
              >
                <ambientLight intensity={1.5} />
                <directionalLight position={[3, 5, 2]} intensity={1.2} />
                <pointLight position={[-5, -4, -2]} intensity={1.0} color="#8EA8C3" />
                <KnowledgeConstellation onNodeClick={handleNodeClick} />
              </ThreeCanvas>
            )}
            
            {/* Interactive hint */}
            <div className="absolute top-4 right-4 bg-charcoal/[0.03] backdrop-blur-[3px] border border-charcoal/[0.05] px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase text-soft-gray pointer-events-none">
              Click Nodes to Filter
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-charcoal/5 mx-auto max-w-7xl px-6 sm:px-12">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-charcoal/8 to-transparent" />
      </div>

      {/* ── ARTICLES FEED SECTION ─────────────────────────────────────────── */}
      <section 
        ref={articlesSectionRef}
        className="py-20 sm:py-28 px-6 sm:px-12 relative z-10 w-full max-w-7xl mx-auto scroll-mt-24"
      >
        <div className="w-full">
          
          {/* Header & Dynamic Filter Alert */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <SectionHeading
                label="01 / INDEXED ARTICLES"
                title="Surgical essays drafted for active builders."
                description="Our documented operational frameworks and frontend coding methodologies compiled into spacious reading modules."
              />
            </div>

            {/* Selected Tag Active Filter Banner */}
            <AnimatePresence mode="wait">
              {selectedTag && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="flex items-center gap-3 px-4 py-2 bg-charcoal text-white rounded-full text-xs font-mono tracking-wider w-fit h-fit shadow-premium-sm"
                >
                  <span>TAG: {selectedTag.toUpperCase()}</span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="p-0.5 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
                    title="Clear filter"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Feed Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mt-12 min-h-[250px]">
            <AnimatePresence mode="popLayout">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-pointer h-full"
                  >
                    <GlassCard className="flex flex-col justify-between p-6 sm:p-8 h-full hover:shadow-premium-lg transition-all duration-500 border border-border-gray/5 bg-white/40">
                      <div className="flex flex-col gap-4">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
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
                        <p className="text-soft-gray text-sm leading-relaxed mt-2 line-clamp-3 font-light">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Tags Pillbox */}
                      <div className="flex flex-wrap gap-1.5 mt-6">
                        {article.tags.map((tag) => {
                          const isTagActive = selectedTag === tag;
                          return (
                            <span
                              key={tag}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNodeClick(tag);
                              }}
                              className={`text-[8.5px] font-mono px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                isTagActive
                                  ? "bg-charcoal text-white border-charcoal"
                                  : "bg-white/60 text-soft-gray border-charcoal/5 hover:border-charcoal/20 hover:text-charcoal"
                              }`}
                            >
                              #{tag.toLowerCase()}
                            </span>
                          );
                        })}
                      </div>

                      {/* Read Link */}
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal group-hover:text-accent-blue transition-colors duration-300 mt-6 border-t border-border-gray/50 pt-5">
                        Read Column
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </GlassCard>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  key="no-articles-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-2 flex flex-col items-center justify-center p-12 border border-charcoal/[0.05] rounded-3xl bg-white/40 text-center min-h-[300px]"
                >
                  <span className="text-[10px] font-mono tracking-widest text-soft-gray uppercase mb-2">
                    [ STATUS: UNCOMPILED ]
                  </span>
                  <h4 className="font-display font-bold text-lg text-charcoal mb-2">
                    Research drafts in progress
                  </h4>
                  <p className="text-sm text-soft-gray max-w-sm font-light leading-relaxed mb-6">
                    Articles tagged with &ldquo;{selectedTag}&rdquo; are currently drafted in research docs and will be compiled into public essays shortly.
                  </p>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="px-6 py-2.5 rounded-full bg-charcoal text-white hover:bg-accent-blue hover:shadow-premium-sm text-[9.5px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    Reset Categories
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
