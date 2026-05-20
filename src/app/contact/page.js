"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Mail, Calendar, ArrowRight, ArrowUpRight, Compass, Users } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    org: "",
    collaboration: "Venture Incubation",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, submit the form here
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col w-full bg-soft-white pt-32 pb-24 px-6 sm:px-12 relative overflow-hidden">
      {/* Background soft highlights */}
      <div className="absolute top-[15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-accent-blue/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Page Header */}
        <div className="flex flex-col gap-6 max-w-3xl mb-20">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block"
          >
            [ SECURE A SESSION ]
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10}
            baseRotation={1}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-charcoal leading-none block"
          >
            Collaborate
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={true}
            blurStrength={4}
            baseRotation={0}
            className="font-display font-light text-2xl text-soft-gray leading-relaxed mt-2 block"
          >
            Let’s align on venture validation, digital dashboard engineering, or student community initiatives.
          </ScrollReveal>
        </div>

        {/* Form and Side Info Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Side details */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <SectionHeading
                label="01 / COORDINATES"
                title="Direct connects."
                description="Secure a direct channel or book a dedicated session via calendar integration."
              />
            </div>

            <div className="flex flex-col gap-6 mt-4">
              {/* Email Card */}
              <GlassCard className="flex flex-col gap-3 p-6">
                <ScrollReveal
                  baseOpacity={0.3}
                  enableBlur={false}
                  baseRotation={0}
                  className="text-[10px] font-mono font-bold tracking-widest text-soft-gray uppercase block"
                >
                  DIRECT CHANNELS
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  blurStrength={5}
                  baseRotation={0.5}
                  className="block"
                >
                  <a 
                    href="mailto:aditya@hexora.in"
                    className="font-display font-bold text-lg text-charcoal hover:text-accent-blue transition-colors duration-300 flex items-center gap-2"
                  >
                    aditya@hexora.in
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </a>
                </ScrollReveal>
              </GlassCard>

              {/* Calendly Card */}
              <GlassCard className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent-blue" />
                  <ScrollReveal
                    baseOpacity={0.3}
                    enableBlur={false}
                    baseRotation={0}
                    className="text-[10px] font-mono font-bold tracking-widest text-soft-gray uppercase"
                  >
                    OFFICIAL SYNC
                  </ScrollReveal>
                </div>
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  blurStrength={5}
                  baseRotation={0.5}
                  className="font-display font-bold text-base text-charcoal block"
                >
                  Book a 30-min validation review
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0.4}
                  blurStrength={3}
                  baseRotation={0}
                  className="text-soft-gray text-xs leading-relaxed block"
                >
                  Review student startups, client digital requirements, or operational logistics.
                </ScrollReveal>
                <ScrollReveal
                  baseOpacity={0.4}
                  blurStrength={3}
                  baseRotation={0}
                  className="block mt-2"
                >
                  <a 
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue transition-all duration-300"
                  >
                    Calendly Dashboard
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </ScrollReveal>
              </GlassCard>
            </div>
          </div>

          {/* Right Column: Collaborative Intake Form */}
          <div className="lg:col-span-7">
            <GlassCard className="p-8 sm:p-12 w-full border border-border-gray/5 bg-white/40">
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur={false}
                baseRotation={0}
                className="text-[10px] font-mono font-bold tracking-widest text-accent-blue uppercase block mb-4"
              >
                02 / COLLABORATIVE INTAKE
              </ScrollReveal>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                blurStrength={8}
                baseRotation={1}
                className="font-display font-bold text-2xl sm:text-3xl text-charcoal leading-tight mb-8 block"
              >
                Draft a project narrative.
              </ScrollReveal>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <span className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xl">✓</span>
                  <h4 className="font-display font-bold text-xl text-charcoal">Narrative received.</h4>
                  <p className="text-soft-gray text-sm leading-relaxed max-w-sm">
                    Thank you. Your strategic intake log has been locked. I will review and follow up within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-mono font-bold uppercase text-soft-gray">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Aditya Kapoor"
                      className="w-full bg-soft-white border border-border-gray hover:border-charcoal focus:border-accent-blue outline-none rounded-lg px-4 py-3 text-sm text-charcoal transition-all duration-300"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-mono font-bold uppercase text-soft-gray">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="aditya@hexora.in"
                      className="w-full bg-soft-white border border-border-gray hover:border-charcoal focus:border-accent-blue outline-none rounded-lg px-4 py-3 text-sm text-charcoal transition-all duration-300"
                    />
                  </div>

                  {/* Organization field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="org" className="text-[10px] font-mono font-bold uppercase text-soft-gray">
                      Organization / Venture (Optional)
                    </label>
                    <input 
                      type="text" 
                      id="org"
                      name="org"
                      value={formState.org}
                      onChange={handleInputChange}
                      placeholder="Hexora / PU-iNCENT"
                      className="w-full bg-soft-white border border-border-gray hover:border-charcoal focus:border-accent-blue outline-none rounded-lg px-4 py-3 text-sm text-charcoal transition-all duration-300"
                    />
                  </div>

                  {/* Collaboration dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="collaboration" className="text-[10px] font-mono font-bold uppercase text-soft-gray">
                      Collaboration Area
                    </label>
                    <select 
                      id="collaboration"
                      name="collaboration"
                      value={formState.collaboration}
                      onChange={handleInputChange}
                      className="w-full bg-soft-white border border-border-gray hover:border-charcoal focus:border-accent-blue outline-none rounded-lg px-4 py-3 text-sm text-charcoal transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="Venture Incubation">Venture Incubation (PU-iNCENT)</option>
                      <option value="Digital Agency Sprints">Digital Agency Sprints (Hexora)</option>
                      <option value="Custom Technical Architecture">Custom Technical Architecture</option>
                      <option value="Speaking / Mentorship Booking">Speaking / Mentorship Booking</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] font-mono font-bold uppercase text-soft-gray">
                      Venture Narrative
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Please draft a brief overview of your startup idea, technical specifications, or timeline goals..."
                      className="w-full bg-soft-white border border-border-gray hover:border-charcoal focus:border-accent-blue outline-none rounded-lg px-4 py-3 text-sm text-charcoal transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/85 border border-transparent hover:border-charcoal/10 rounded-full transition-all duration-300 ease-out shadow-premium-md hover:shadow-premium-lg flex items-center justify-center gap-2.5 hover:opacity-90"
                    >
                      Lock Narrative Intake
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
