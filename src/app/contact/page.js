"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight, Mail, Calendar, Compass } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradualBlur } from "@/components/ui/GradualBlur";

// ─── Inline LinkedIn SVG ──────────────────────────────────────────────────────
const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Interactive Network Sphere ───────────────────────────────────────────────
function NetworkSphere() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const clicksRef = useRef([]);
  const rotationRef = useRef({ x: 0.3, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const RADIUS = 160;
    const NODE_COUNT = 72;
    const CONNECTION_DIST = 95;

    // Generate evenly distributed sphere points via Fibonacci lattice
    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.cos(phi),
        oz: Math.sin(phi) * Math.sin(theta),
        x: 0, y: 0, z: 0,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.01,
        size: 1.8 + Math.random() * 1.4,
      };
    });

    let rx = 0.3, ry = 0;
    let targetRx = 0.3, targetRy = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = Math.min(canvas.parentElement.offsetWidth, 460);
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current = { x: mx, y: my };
      targetRy = mx * 1.8;
      targetRx = 0.3 - my * 1.2;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      clicksRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        life: 1,
        speed: 0.02 + Math.random() * 0.01,
        maxRadius: 60 + Math.random() * 40,
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      const cx = W / 2, cy = H / 2;

      ctx.clearRect(0, 0, W, H);

      // Ease rotation
      rx += (targetRx - rx) * 0.04;
      ry += (targetRy - ry) * 0.04;
      ry += 0.003; // auto-rotate

      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      // Transform nodes
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        const x1 = n.ox * cosY + n.oz * sinY;
        const z1 = -n.ox * sinY + n.oz * cosY;
        const y1 = n.oy * cosX - z1 * sinX;
        const z2 = n.oy * sinX + z1 * cosX;
        n.x = cx + x1 * RADIUS;
        n.y = cy + y1 * RADIUS;
        n.z = z2;
      });

      // Sort back-to-front
      const sorted = [...nodes].sort((a, b) => a.z - b.z);

      // Draw connections
      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const a = sorted[i], b = sorted[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const depthFade = ((a.z + b.z) / 2 + 1) / 2;
            const alpha = (1 - dist / CONNECTION_DIST) * depthFade * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(110, 143, 179, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      sorted.forEach((n) => {
        const depthScale = (n.z + 1) / 2;
        const pulseFactor = 0.85 + Math.sin(n.pulse) * 0.15;
        const r = n.size * depthScale * pulseFactor;
        const alpha = 0.35 + depthScale * 0.65;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 143, 179, ${alpha})`;
        ctx.fill();

        // Glow for front nodes
        if (depthScale > 0.8) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(110, 143, 179, ${0.06 * depthScale})`;
          ctx.fill();
        }
      });

      // Draw click ripples
      clicksRef.current = clicksRef.current.filter((c) => {
        c.life -= c.speed;
        if (c.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(c.x, c.y, (1 - c.life) * c.maxRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(110, 143, 179, ${c.life * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-[460px]">
        {/* Ambient glow behind sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/10 to-accent-sand/5 blur-[80px] pointer-events-none scale-110" />
        <canvas
          ref={canvasRef}
          className="w-full aspect-square cursor-crosshair rounded-full"
          style={{ touchAction: "none" }}
        />
        {/* Corner label */}
        <div className="absolute bottom-2 right-3 text-[9px] font-mono font-bold tracking-widest text-soft-gray/60 uppercase select-none">
          CLICK TO CONNECT
        </div>
      </div>
    </div>
  );
}

// ─── Connect Channel Cards ────────────────────────────────────────────────────
const CONNECT_CHANNELS = [
  {
    id: "linkedin",
    number: "01",
    label: "PROFESSIONAL NETWORK",
    icon: LinkedInIcon,
    title: "LinkedIn",
    description:
      "Follow my journey building startup ecosystems, digital ventures, and innovation initiatives.",
    cta: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/aditya-kapoor-168914290",
    external: true,
    accent: "#0A66C2",
  },
  {
    id: "email",
    number: "02",
    label: "DIRECT CHANNEL",
    icon: Mail,
    title: "Email",
    description:
      "For partnerships, speaking opportunities, startup collaborations, and strategic discussions.",
    cta: "Send an Email",
    href: "mailto:aditya@hexora.in",
    external: false,
    accent: "#6E8FB3",
  },
  {
    id: "schedule",
    number: "03",
    label: "BOOK A SESSION",
    icon: Calendar,
    title: "Schedule a Conversation",
    description:
      "Book a focused discussion around startups, digital products, ecosystems, or collaborations.",
    cta: "Schedule a Call",
    href: "https://calendly.com",
    external: true,
    accent: "#223047",
  },
  {
    id: "ecosystem",
    number: "04",
    label: "EXPLORE VENTURES",
    icon: Compass,
    title: "Community & Ecosystem",
    description:
      "Explore the initiatives, ventures, and innovation ecosystems I'm actively contributing to.",
    cta: "Explore Ecosystem",
    href: "/ecosystem",
    external: false,
    accent: "#8A8A8A",
  },
];

// ─── Current Positions ────────────────────────────────────────────────────────
const POSITIONS = [
  { role: "Founder & CEO", org: "HEXORA", tag: "Digital Agency" },
  { role: "Founder & CEO", org: "EVOLVE", tag: "Venture Studio" },
  { role: "Chief Student Advisor", org: "PU-iNCENT", tag: "Innovation Program" },
];

// ─── Collaboration Areas ──────────────────────────────────────────────────────
const COLLAB_AREAS = [
  { title: "Startup Ecosystems", span: "col-span-2 row-span-1" },
  { title: "Digital Products", span: "col-span-1 row-span-1" },
  { title: "Modern Websites", span: "col-span-1 row-span-1" },
  { title: "Brand Systems", span: "col-span-1 row-span-1" },
  { title: "Innovation Programs", span: "col-span-2 row-span-1" },
  { title: "Student Communities", span: "col-span-1 row-span-1" },
  { title: "Founder Mentorship", span: "col-span-1 row-span-1" },
  { title: "Creative Collaborations", span: "col-span-2 row-span-1" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-soft-white relative overflow-hidden">

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 sm:pt-36 sm:pb-24 px-6 sm:px-12 relative z-10 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        {/* Ambient radial */}
        <div className="absolute top-1/4 right-[-8%] w-[45%] h-[70%] rounded-full bg-gradient-to-br from-accent-blue/8 to-transparent blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-[5%] w-[30%] h-[40%] rounded-full bg-gradient-to-tr from-accent-sand/10 to-transparent blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* LEFT: Content */}
          <div className="flex flex-col items-start">
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-8 block"
            >
              [ COLLABORATION HUB ]
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              blurStrength={8}
              baseRotation={1}
              className="mb-8 block"
            >
              <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-charcoal leading-[1.04]">
                Let&apos;s build something<br className="hidden md:inline" />
                <span className="text-charcoal/50 font-light"> meaningful </span>together.
              </h1>
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0.4}
              blurStrength={3}
              className="font-sans font-light text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-xl mb-12 block"
            >
              Whether you&apos;re building a startup, scaling a digital product, creating an innovation initiative, or exploring a new idea — I&apos;m always open to meaningful conversations and ambitious collaborations.
            </ScrollReveal>

            {/* Status indicator */}
            <ScrollReveal
              baseOpacity={0.3}
              enableBlur={false}
              className="flex items-center gap-2.5 block"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-charcoal tracking-widest uppercase select-none">
                Founder Inbox — Open for Collaborations
              </span>
            </ScrollReveal>
          </div>

          {/* RIGHT: Interactive Network Sphere */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-full flex items-center justify-center"
          >
            <NetworkSphere />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-charcoal/5 mx-auto max-w-7xl px-6 sm:px-12">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-charcoal/8 to-transparent" />
      </div>

      {/* ── WAYS TO CONNECT ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-soft-white to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-4 block"
          >
            [ WAYS TO CONNECT ]
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={6}
            className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight mb-14 block"
          >
            Start a conversation.
          </ScrollReveal>

          {/* Channel Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CONNECT_CHANNELS.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                >
                  {channel.external ? (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between p-6 sm:p-7 rounded-[20px] bg-white border border-charcoal/6 hover:border-charcoal/12 shadow-premium-sm hover:shadow-premium-lg transition-all duration-500 ease-out h-full min-h-[240px] cursor-pointer"
                    >
                      <ChannelCardContent channel={channel} Icon={Icon} />
                    </a>
                  ) : (
                    <Link
                      href={channel.href}
                      className="group flex flex-col justify-between p-6 sm:p-7 rounded-[20px] bg-white border border-charcoal/6 hover:border-charcoal/12 shadow-premium-sm hover:shadow-premium-lg transition-all duration-500 ease-out h-full min-h-[240px] cursor-pointer"
                    >
                      <ChannelCardContent channel={channel} Icon={Icon} />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED QUOTE SECTION ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-charcoal relative z-10 overflow-hidden">
        {/* Subtle grid on dark bg */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-gradient-to-br from-accent-blue/8 to-transparent blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10}
            className="block"
          >
            <p className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-[1.1] mb-10">
              &ldquo;Great ideas grow faster when the right people, systems, and opportunities come together.&rdquo;
            </p>
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            className="flex flex-col items-center gap-1 block"
          >
            <div className="w-12 h-[1px] bg-white/20 mb-4 mx-auto" />
            <span className="font-display font-bold text-sm text-white/90 tracking-tight">
              Aditya Kapoor
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase">
              Founder, Designer & Ecosystem Builder
            </span>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CURRENT POSITIONS ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-4 block"
          >
            [ CURRENT POSITIONS ]
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={6}
            className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight mb-12 block"
          >
            Where I operate.
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {POSITIONS.map((pos, i) => (
              <motion.div
                key={pos.org}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="group p-6 sm:p-8 rounded-[20px] bg-white border border-charcoal/6 hover:border-charcoal/12 shadow-premium-sm hover:shadow-premium-md transition-all duration-500 ease-out flex flex-col gap-3"
              >
                <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                  {pos.tag}
                </span>
                <div>
                  <p className="text-xs font-mono text-soft-gray mb-1">{pos.role}</p>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-charcoal tracking-tight leading-none">
                    {pos.org}
                  </h3>
                </div>
                <div className="mt-auto pt-3 border-t border-charcoal/5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLABORATION AREAS (BENTO) ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-warm-white border-t border-b border-charcoal/5 relative z-10 overflow-hidden">
        <div className="absolute top-1/3 right-[-5%] w-[35%] h-[50%] rounded-full bg-gradient-to-br from-accent-sand/12 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-4 block"
          >
            [ WHAT I&apos;M OPEN TO ]
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={6}
            className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight mb-12 block"
          >
            Areas of collaboration.
          </ScrollReveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {COLLAB_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.055 }}
                whileHover={{ y: -2, transition: { duration: 0.3 } }}
                className="group p-5 sm:p-6 rounded-[16px] bg-white border border-charcoal/6 hover:border-charcoal/14 shadow-premium-sm hover:shadow-premium-md transition-all duration-400 ease-out cursor-default flex flex-col justify-between min-h-[90px] sm:min-h-[100px]"
              >
                <span className="font-display font-semibold text-base sm:text-lg text-charcoal tracking-tight leading-snug group-hover:text-charcoal transition-colors duration-300">
                  {area.title}
                </span>
                <div className="mt-3 w-4 h-[1.5px] bg-charcoal/15 group-hover:w-7 group-hover:bg-accent-blue/60 transition-all duration-400 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[60%] rounded-full bg-gradient-to-br from-accent-blue/6 to-transparent blur-[140px] pointer-events-none" />
        {/* Architectural line */}
        <div className="absolute left-12 right-12 top-0 h-[1px] bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.05)_80%,transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-8 block"
          >
            [ START THE CONVERSATION ]
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10}
            baseRotation={0.5}
            className="mb-6 block"
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.05]">
              Ready to start<br className="hidden sm:inline" />{" "}
              the conversation?
            </h2>
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0.4}
            blurStrength={3}
            className="font-sans font-light text-base sm:text-lg text-charcoal/65 leading-relaxed max-w-xl mx-auto mb-12 block"
          >
            Let&apos;s explore how technology, design, systems, and innovation can create meaningful impact together.
          </ScrollReveal>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={4}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 block"
          >
            <a
              href="https://www.linkedin.com/in/aditya-kapoor-168914290"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-charcoal text-soft-white text-xs font-bold uppercase tracking-widest hover:bg-charcoal/85 transition-all duration-300 ease-out shadow-premium-md hover:shadow-premium-lg"
            >
              <LinkedInIcon className="h-4 w-4" />
              Connect on LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </a>
            <a
              href="mailto:aditya@hexora.in"
              className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-transparent text-charcoal text-xs font-bold uppercase tracking-widest border border-charcoal/15 hover:border-charcoal/35 hover:bg-white transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md"
            >
              <Mail className="h-4 w-4" />
              Send an Email
              <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// ─── Channel Card Content (inner) ────────────────────────────────────────────
function ChannelCardContent({ channel, Icon }) {
  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-full bg-charcoal/5 group-hover:bg-charcoal/8 flex items-center justify-center transition-colors duration-300">
            <Icon className="h-4 w-4 text-charcoal" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase">
            {channel.label}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-charcoal tracking-tight mb-3 leading-tight">
          {channel.title}
        </h3>
        <p className="text-sm text-soft-gray leading-relaxed font-light">
          {channel.description}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-charcoal group-hover:text-charcoal transition-colors duration-300">
        {channel.cta}
        <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </div>
    </>
  );
}
