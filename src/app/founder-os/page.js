"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import EcosystemCubes from "@/components/three/EcosystemCubes";
import { 
  Compass, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Terminal, 
  Map, 
  Briefcase, 
  Zap,
  ArrowDown,
  ArrowRight
} from "lucide-react";

export default function FounderOSPage() {
  const [mounted, setMounted] = useState(false);
  const goalsSectionRef = useRef(null);
  const learningSectionRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeGoals = [
    { title: "Hexora Strategic Scale", category: "Startup", progress: 75, metric: "10/15 Active Clients", desc: "Expanding Hexora's professional partner base, deploying robust web backends, and refining client dashboards.", icon: Briefcase },
    { title: "Ecosystem Integration", category: "Incubation", progress: 90, metric: "2026 Cohort Launch", desc: "Finalizing the incubation pipeline structures, scheduling events, and conducting startup validation panels.", icon: Compass },
    { title: "Full-Stack Mastery", category: "Technical", progress: 85, metric: "NextJS 15 & Three.js", desc: "Mastering custom WebGL point systems, complex state shaders, and micro-motion lerps for spatial rendering.", icon: Terminal },
    { title: "Lakshya 2026 Prep", category: "Leadership", progress: 60, metric: "Design Sandbox Complete", desc: "Structuring student committees, logistics schedules, and custom interactive registration frameworks.", icon: Calendar }
  ];

  const timeBlocks = [
    { time: "08:00 - 10:00", block: "Core Focus (Engineering)", desc: "Coding high-performance frontend interfaces, R3F scenes, and optimizing backend endpoints." },
    { time: "10:30 - 13:00", block: "Ecosystem Ops (PU-iNCENT)", desc: "Incubator cohort management, reviewing student startup pipelines, and log plans." },
    { time: "14:00 - 16:30", block: "Client & Sprints (Hexora)", desc: "Agency team standups, product design review sessions, and client deliverables." },
    { time: "17:00 - 18:30", block: "Learning & Sandbox", desc: "Experimenting with creative coding libraries, typography, and paper layout concepts." }
  ];

  const readingList = [
    { title: "High Output Management", author: "Andrew Grove", status: "Active reading", category: "Leadership" },
    { title: "The Design of Everyday Things", author: "Don Norman", status: "Completed", category: "Design" },
    { title: "Refactoring UI", author: "Steve Schoger", status: "Active reference", category: "UI/UX" },
    { title: "Zero to One", author: "Peter Thiel", status: "Completed", category: "Startup" }
  ];

  const scrollToGoals = () => {
    goalsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLearning = () => {
    learningSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full bg-soft-white relative overflow-hidden">
      {/* Cinematic background layouts */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-accent-sand/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[45%] h-[50%] rounded-full bg-gradient-to-tr from-accent-blue/4 to-transparent blur-[130px] pointer-events-none" />

      {/* ── HERO SECTION: 3D FOUNDER DESK ───────────────────────────────── */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 px-6 sm:px-12 relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px]">
          
          {/* LEFT COLUMN: Premium Editorial Content */}
          <div className="flex flex-col items-start lg:col-span-5 relative z-30">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-6 block"
            >
              [ FOUNDER OS ]
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-[46px] tracking-tight text-charcoal leading-[1.08] mb-6"
            >
              Inside the workspace<br />
              <span className="text-charcoal/50 font-light">behind every venture,</span><br />
              system and idea.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-light text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-lg mb-10"
            >
              Explore the routines, frameworks, learning systems, projects, and strategic thinking that power my work across startups, innovation ecosystems, and digital products.
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={scrollToGoals}
                className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-charcoal text-white hover:bg-accent-navy hover:shadow-premium-md text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                Explore Systems
                <ArrowDown className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all duration-300" />
              </button>
              <button
                onClick={scrollToLearning}
                className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-transparent text-charcoal border border-charcoal/15 hover:border-charcoal/35 hover:bg-white text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                View Roadmaps
                <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Interactive 3D Desk Canvas */}
          <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] lg:col-span-7 relative z-20 flex items-center justify-center select-none mt-6 lg:mt-0">
            {mounted && (
              <ThreeCanvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                className="w-full h-full"
              >
                <ambientLight intensity={1.6} />
                <pointLight position={[-6, -5, -3]} intensity={1.2} color="#8EA8C3" />
                <pointLight position={[6, 5, 3]} intensity={1.2} color="#6E8FB3" />
                <EcosystemCubes />
              </ThreeCanvas>
            )}

            {/* Interactive hint */}
            <div className="absolute top-4 right-4 bg-charcoal/[0.03] backdrop-blur-[3px] border border-charcoal/[0.05] px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase text-soft-gray pointer-events-none">
              Hover Modules to Explore
            </div>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-charcoal/5 mx-auto max-w-7xl px-6 sm:px-12">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-charcoal/8 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 sm:px-12">
        {/* Section 1: Strategic Goals */}
        <div ref={goalsSectionRef} className="py-20 sm:py-24 scroll-mt-24">
          <SectionHeading
            label="01 / ACTIVE PIPELINE"
            title="Strategic coordinates and venture progress."
            description="A systematic view of current milestone goals across digital agency delivery, incubation management, and technical research."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {activeGoals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlassCard className="flex flex-col gap-6 p-6 sm:p-8 h-full justify-between hover:border-accent-blue/20 transition-all duration-300">
                    <div className="flex flex-col gap-4">
                      {/* Badge and Title */}
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-charcoal/5 text-[9px] font-mono font-bold tracking-widest text-charcoal uppercase">
                          {goal.category}
                        </span>
                        <span className="text-xs font-semibold text-accent-blue font-mono">{goal.metric}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-charcoal/5 text-charcoal">
                          <Icon className="h-4 w-4" />
                        </span>
                        <ScrollReveal
                          baseOpacity={0}
                          enableBlur={true}
                          blurStrength={5}
                          baseRotation={0.5}
                          className="font-display font-bold text-xl text-charcoal block"
                        >
                          {goal.title}
                        </ScrollReveal>
                      </div>
                      
                      <ScrollReveal
                        baseOpacity={0.4}
                        blurStrength={3}
                        baseRotation={0}
                        className="text-soft-gray text-xs sm:text-sm leading-relaxed mt-1 block"
                      >
                        {goal.desc}
                      </ScrollReveal>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-2 mt-6">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-soft-gray">
                        <span>Milestone Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-border-gray rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent-blue transition-all duration-1000 ease-out" 
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Time Blocking & Reading Systems (Split Grid) */}
        <div ref={learningSectionRef} className="py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 scroll-mt-24 border-t border-charcoal/5">
          {/* Time Blocking Column */}
          <div className="lg:col-span-7">
            <SectionHeading
              label="02 / TIME BLOCKING"
              title="Daily architectural routines."
              description="Structuring my day around high-focus technical sprints, incubator operations, and strategic client design pipelines."
            />

            <div className="flex flex-col gap-4 mt-8">
              {timeBlocks.map((block, index) => (
                <GlassCard key={index} className="flex items-start gap-4 p-5 hover:bg-warm-white transition-colors duration-300">
                  <span className="px-3 py-1.5 rounded-lg bg-accent-sand/15 text-accent-navy font-mono font-bold text-xs shrink-0 tracking-tight">
                    {block.time}
                  </span>
                  <div className="flex flex-col gap-1">
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      blurStrength={5}
                      baseRotation={0.5}
                      className="font-sans font-bold text-sm text-charcoal block"
                    >
                      {block.block}
                    </ScrollReveal>
                    <ScrollReveal
                      baseOpacity={0.4}
                      blurStrength={3}
                      baseRotation={0}
                      className="text-soft-gray text-xs leading-relaxed block"
                    >
                      {block.desc}
                    </ScrollReveal>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Learning & Reading Column */}
          <div className="lg:col-span-5">
            <SectionHeading
              label="03 / INDEXED LEARNING"
              title="Current reading library."
              description="A curated catalog of strategic books and design guides that inform my founder worldview."
            />

            <div className="flex flex-col gap-4 mt-8">
              {readingList.map((book, index) => (
                <GlassCard key={index} className="flex flex-col gap-3 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                      {book.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide ${
                      book.status === "Completed" 
                        ? "bg-emerald-500/10 text-emerald-600" 
                        : "bg-accent-blue/10 text-accent-blue"
                    }`}>
                      {book.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col">
                    <ScrollReveal
                      baseOpacity={0}
                      enableBlur={true}
                      blurStrength={5}
                      baseRotation={0.5}
                      className="font-display font-bold text-base text-charcoal block"
                    >
                      {book.title}
                    </ScrollReveal>
                    <ScrollReveal
                      baseOpacity={0.4}
                      blurStrength={3}
                      baseRotation={0}
                      className="text-xs text-soft-gray font-light mt-0.5 block"
                    >
                      {`by ${book.author}`}
                    </ScrollReveal>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
