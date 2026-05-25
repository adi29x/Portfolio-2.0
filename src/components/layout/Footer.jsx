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

      <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Background soft radial highlight */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-sand/5 to-transparent blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
          {/* Brand & Focus Details */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-6">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={5}
              className="block"
            >
              <Link href="/" className="font-display font-bold tracking-tight text-2xl text-charcoal block">
                ADITYA<span className="text-accent-blue font-light">KAPOOR</span>
              </Link>
            </ScrollReveal>
            
            <ScrollReveal
              baseOpacity={0.4}
              blurStrength={3}
              className="text-soft-gray text-base leading-relaxed max-w-md block"
            >
              Founder, Designer, Developer & Startup Ecosystem Builder focused on creating immersive digital systems, modern experiences, and innovation-driven platforms.
            </ScrollReveal>

            {/* Founder Inbox Status */}
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              className="flex items-center gap-3 mt-2 block"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-charcoal tracking-widest uppercase">
                Founder Inbox — Open for Collaborations
              </span>
            </ScrollReveal>

            {/* LinkedIn Connection Panel under Founder Inbox */}
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={5}
              className="w-full block mt-2"
            >
              <div className="flex flex-col justify-between p-[28px] sm:p-[32px] rounded-[24px] bg-gradient-to-br from-[#0A66C2] to-[#004182] text-white min-h-[180px] shadow-premium-sm hover:shadow-[0_8px_30px_rgba(10,102,194,0.25)] hover:border-white/10 border border-white/5 transition-all duration-500 group relative overflow-hidden">
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
                  <h4 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight leading-snug mt-4">
                    Let's connect<br />on LinkedIn
                  </h4>

                  {/* BOTTOM: Supporting description */}
                  <p className="text-white/85 text-xs leading-relaxed font-light mt-3 max-w-xs">
                    Follow my journey as I build startup ecosystems, digital products, innovation systems, and founder-led ventures.
                  </p>
                </div>

                {/* View LinkedIn Profile CTA Button */}
                <a 
                  href="https://www.linkedin.com/in/aditya-kapoor-168914290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full flex items-center justify-center gap-2 h-12 px-[20px] rounded-full bg-white text-[#0A66C2] text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-out select-none hover:bg-white/90 hover:opacity-95 hover:shadow-premium-md"
                >
                  View LinkedIn Profile
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Navigation Directory links */}
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            className="flex flex-col gap-4 md:col-span-3 lg:col-span-3 block"
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal border-b border-border-gray pb-2">
              Operating System
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-soft-gray hover:text-charcoal transition-colors duration-300 text-sm font-medium">
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
            className="flex flex-col gap-4 md:col-span-3 lg:col-span-3 block"
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal border-b border-border-gray pb-2">
              Digital Connects
            </h4>
            <ul className="flex flex-col gap-2.5">
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
                    className="group flex items-center justify-between text-soft-gray hover:text-charcoal transition-colors duration-300 text-sm font-medium"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        {/* Structural Bottom Bar */}
        <ScrollReveal
          baseOpacity={0.4}
          blurStrength={3}
          className="border-t border-border-gray/50 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 w-full block"
        >
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-xs text-soft-gray font-semibold">
              &copy; {currentYear} Aditya Kapoor. Designed & Developed by HEXORA.
            </p>
            <p className="text-[10px] text-soft-gray font-mono italic max-w-xl">
              Building immersive digital ecosystems through design, motion, storytelling, and scalable web systems.
            </p>
          </div>
          <p className="text-xs text-soft-gray font-mono tracking-widest">
            [ 26.9124° N, 75.7873° E ]
          </p>
        </ScrollReveal>
      </div>
    </footer>
  );
}
export { Footer };
