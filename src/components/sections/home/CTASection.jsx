"use client";
import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section id="contact" className="py-12 sm:py-16 px-6 sm:px-12 bg-soft-white relative z-10 overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-accent-sand/5 to-transparent blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-16 rounded-premium-xl border border-border-gray/10 relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8 shadow-premium-lg bg-warm-white/20">
        {/* Active Status Badge */}
        <ScrollReveal
          baseOpacity={0.3}
          enableBlur={false}
          baseRotation={0}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-accent-blue/5 border border-accent-blue/10 text-xs font-mono font-bold tracking-widest text-accent-blue uppercase block"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
          Inbox Open for Collaborations
        </ScrollReveal>

        {/* Cinematic Heading */}
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          blurStrength={8}
          baseRotation={1}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-tight max-w-3xl block"
        >
          Let’s build future-ready digital experiences together.
        </ScrollReveal>
        
        <ScrollReveal
          baseOpacity={0.4}
          blurStrength={3}
          baseRotation={0}
          className="text-soft-gray text-base sm:text-lg leading-relaxed max-w-2xl block"
        >
          Whether it’s a startup ecosystem, modern website, immersive digital platform, or scalable innovation system — let’s collaborate to build experiences that combine strategy, storytelling, design, and technology.
        </ScrollReveal>

        {/* Buttons Row */}
        <ScrollReveal
          baseOpacity={0.2}
          enableBlur={false}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center block"
        >
          <Link href="/contact" passHref legacyBehavior>
            <a className="w-full sm:w-auto">
              <button
                className="w-full px-8 py-4 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/85 border border-transparent hover:border-charcoal/10 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md flex items-center justify-center gap-2.5 hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                Book a Collaboration
              </button>
            </a>
          </Link>

          <Link href="/ecosystem" passHref legacyBehavior>
            <a className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue border border-border-gray hover:bg-warm-white/80 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md hover:opacity-90">
              <Calendar className="h-4 w-4 text-soft-gray" />
              Explore Ecosystem
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
export { CTASection };
