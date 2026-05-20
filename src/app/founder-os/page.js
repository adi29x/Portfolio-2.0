"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { 
  Compass, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Terminal, 
  Map, 
  Briefcase, 
  Zap 
} from "lucide-react";

export default function FounderOSPage() {
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

  return (
    <div className="flex flex-col w-full bg-soft-white pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background soft highlights */}
      <div className="absolute top-[30%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-accent-sand/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Page Header */}
        <div className="flex flex-col gap-6 max-w-3xl mb-20">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block"
          >
            [ PERSONAL OPERATING SYSTEM ]
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10}
            baseRotation={1}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-charcoal leading-none block"
          >
            Founder OS
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            blurStrength={4}
            baseRotation={0}
            className="font-display font-light text-2xl text-soft-gray leading-relaxed mt-2 block"
          >
            A real-time window into my active coordinates, strategic progress logs, and learning schedules.
          </ScrollReveal>
        </div>

        {/* Section 1: Strategic Goals */}
        <div className="mb-24">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
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
