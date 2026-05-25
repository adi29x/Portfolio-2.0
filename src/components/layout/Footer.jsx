"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { GradualBlur } from "@/components/ui/GradualBlur";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Custom inline SVG for LinkedIn icon to prevent deprecation issues in newer lucide versions
const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-warm-white relative overflow-hidden z-10">
      {/* Atmospheric transition blur before footer starts */}
      <GradualBlur preset="footer" strength={1} opacity={0.5} divCount={5} />

      {/* Minimal divider line above footer */}
      <div className="w-full h-[1px] bg-charcoal/5" />

      <div className="pt-14 pb-8 sm:pt-16 sm:pb-10 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Background soft radial highlight */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-sand/5 to-transparent blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Brand & Focus Details (40% Span Column 1) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4 sm:gap-5">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={5}
              className="block"
            >
              <Link 
                href="/" 
                className="font-display font-bold tracking-tight text-charcoal block"
                style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}
              >
                ADITYA<span className="text-accent-blue font-light">KAPOOR</span>
              </Link>
            </ScrollReveal>
            
            <ScrollReveal
              baseOpacity={0.4}
              blurStrength={3}
              className="text-soft-gray text-[15px] leading-relaxed max-w-[500px] block"
            >
              Founder, Designer, Developer & Startup Ecosystem Builder focused on creating immersive digital systems, modern experiences, and innovation-driven platforms.
            </ScrollReveal>

            {/* Founder Inbox Status */}
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              className="flex items-center gap-2.5 mt-1 block"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-charcoal tracking-widest uppercase select-none">
                Founder Inbox — Open for Collaborations
              </span>
            </ScrollReveal>
          </div>

          {/* Navigation & Social columns stacked side-by-side (25% Span Column 2) */}
          <div className="md:col-span-6 lg:col-span-3 grid grid-cols-2 gap-6 lg:gap-8">
            {/* Navigation Directory links */}
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              className="flex flex-col gap-3 block"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal border-b border-border-gray pb-2 mb-1">
                Operating System
              </h4>
              <ul className="flex flex-col gap-2.5 text-[15px]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-soft-gray hover:text-charcoal transition-colors duration-300 font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Social connections links */}
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              className="flex flex-col gap-3 block"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal border-b border-border-gray pb-2 mb-1">
                Digital Connects
              </h4>
              <ul className="flex flex-col gap-2.5 text-[15px]">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-kapoor-168914290" },
                  { label: "GitHub", href: "https://github.com" },
                  { label: "X / Twitter", href: "https://twitter.com" },
                  { label: "Behance", href: "https://behance.net" }
                ].map((social) => (
                  <li key={social.label}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center justify-between text-soft-gray hover:text-charcoal transition-colors duration-300 font-medium"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* LinkedIn Connection Panel (35% Span Column 3) */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={5}
            className="md:col-span-12 lg:col-span-4 block w-full"
          >
            <div className="flex flex-col justify-between p-6 rounded-[24px] bg-gradient-to-br from-[#0A66C2] to-[#004182] text-white min-h-[145px] max-w-[560px] lg:ml-auto shadow-premium-sm hover:shadow-[0_8px_30px_rgba(10,102,194,0.25)] hover:border-white/10 border border-white/5 transition-all duration-500 group relative overflow-hidden">
              {/* Subtle background glow effect inside the card */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none transition-transform duration-700 group-hover:scale-110" />
              
              <div>
                {/* TOP: Logo & Label */}
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-white" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-white/70 uppercase">
                    PROFESSIONAL NETWORK
                  </span>
                </div>

                {/* CENTER: Title */}
                <h4 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight leading-snug mt-3">
                  Let's connect on LinkedIn
                </h4>

                {/* BOTTOM: Supporting description */}
                <p className="text-white/80 text-[13px] leading-relaxed font-light mt-2 max-w-sm">
                  Follow my journey as I build startup ecosystems, digital products, innovation systems, and founder-led ventures.
                </p>
              </div>

              {/* View LinkedIn Profile CTA Button */}
              <a 
                href="https://www.linkedin.com/in/aditya-kapoor-168914290"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 h-12 px-[20px] rounded-full bg-white text-[#0A66C2] text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out select-none hover:bg-white/90 hover:opacity-95 hover:shadow-premium-md"
              >
                View LinkedIn Profile
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Structural Bottom Bar */}
        <ScrollReveal
          baseOpacity={0.4}
          blurStrength={3}
          className="border-t border-border-gray/50 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 w-full text-[12px] sm:text-[13px]"
        >
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-soft-gray font-semibold">
              &copy; {currentYear} Aditya Kapoor. Designed & Developed by HEXORA.
            </p>
            <p className="text-[11px] text-soft-gray font-mono italic max-w-xl">
              Building immersive digital ecosystems through design, motion, storytelling, and scalable web systems.
            </p>
          </div>
          <p className="text-soft-gray font-mono tracking-widest">
            [ 26.9124° N, 75.7873° E ]
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
export { Footer };
