"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Mail, Calendar, Compass, X } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradualBlur } from "@/components/ui/GradualBlur";
import ThreeCanvas from "@/components/three/ThreeCanvas";
import EcosystemGlobe from "@/components/three/EcosystemGlobe";

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
  { role: "Founder & CEO", org: "HEXORA", tag: "Digital Agency", index: "01", accent: "from-accent-blue/10 to-accent-blue/5" },
  { role: "Founder & CEO", org: "EVOLVE", tag: "Venture Studio", index: "02", accent: "from-accent-sand/15 to-accent-sand/5" },
  { role: "Chief Student Advisor", org: "PU-iNCENT", tag: "Innovation Program", index: "03", accent: "from-accent-navy/10 to-accent-navy/5" },
];

// ─── Collaboration Areas ──────────────────────────────────────────────────────
// ─── Constellation Graph Data ──────────────────────────────────────────────────
const CENTER_NODE = {
  id: "center",
  label: "ADITYA KAPOOR",
  role: "Founder Ecosystem",
  desc: "Root coordinator linking startup ecosystems, digital studios, and collegiate pipelines.",
  type: "Root Node",
  accent: "#223047",
  overview: "Direct connection headquarters representing Aditya's active ventures, digital assets, and advisor coordinates.",
  contributions: "Guiding PU-iNCENT advisors, running Hexora operations, and scaling venture studio spin-offs.",
  metrics: "All Initiatives Active",
  related: "HEXORA, EVOLVE, PU-iNCENT",
  x: 0,
  y: 0
};

const SURROUNDING_NODES = [
  // Primary Venture Hubs
  { id: "hexora", label: "HEXORA", type: "Venture", x: 0.45, y: -0.25, desc: "Digital solutions company focused on branding, web systems, automation, and startup growth.", isHub: true, accent: "#6E8FB3" },
  { id: "evolve", label: "EVOLVE", type: "Venture", x: -0.50, y: 0.0, desc: "Founder-led initiative focused on innovation, growth, and future digital ventures.", isHub: true, accent: "#D9C7A2" },
  { id: "pu-incent", label: "PU-iNCENT", type: "Ecosystem", x: 0.45, y: 0.25, desc: "University startup incubation ecosystem empowering student founders and innovators.", isHub: true, accent: "#223047" },
  
  // Secondary Focus Nodes
  { id: "startup-ecosystems", label: "Startup Ecosystems", type: "Focus", x: -0.30, y: -0.68, desc: "Fostering regional entrepreneurship and scaling incubator models.", accent: "#8A8A8A" },
  { id: "digital-products", label: "Digital Products", type: "Focus", x: 0.80, y: -0.05, desc: "Designing and engineering robust SaaS, dashboards, and complex web systems.", accent: "#6E8FB3" },
  { id: "modern-websites", label: "Modern Websites", type: "Focus", x: -0.45, y: 0.65, desc: "Creating high-fidelity, motion-rich editorial web experiences.", accent: "#D9C7A2" },
  { id: "brand-systems", label: "Brand Systems", type: "Focus", x: 0.82, y: -0.52, desc: "Crafting minimalist corporate identities, type systems, and digital guidelines.", accent: "#6E8FB3" },
  { id: "innovation-programs", label: "Innovation Programs", type: "Focus", x: 0.58, y: 0.65, desc: "Designing accelerator tracks, hackathons, and cohort operations.", accent: "#223047" },
  { id: "student-communities", label: "Student Communities", type: "Focus", x: -0.78, y: -0.42, desc: "Mobilizing tech clubs, developers, and collegiate innovation pipelines.", accent: "#8A8A8A" },
  { id: "founder-mentorship", label: "Founder Mentorship", type: "Focus", x: -0.80, y: 0.35, desc: "Advising early-stage founders on product-market fit and tech architecture.", accent: "#D9C7A2" },
  { id: "creative-collabs", label: "Creative Collaborations", type: "Focus", x: 0.05, y: 0.72, desc: "Engaging in cross-disciplinary projects at the intersection of design and tech.", accent: "#8A8A8A" },
  { id: "innovation-events", label: "Innovation Events", type: "Focus", x: 0.15, y: -0.70, desc: "Organizing and producing tech conferences and startup summits.", accent: "#223047" }
];

const CONNECTIONS = [
  // Root to Primary Hubs
  { from: "center", to: "hexora" },
  { from: "center", to: "evolve" },
  { from: "center", to: "pu-incent" },
  
  // Hexora Connections
  { from: "hexora", to: "digital-products" },
  { from: "hexora", to: "modern-websites" },
  { from: "hexora", to: "brand-systems" },
  
  // Evolve Connections
  { from: "evolve", to: "startup-ecosystems" },
  { from: "evolve", to: "founder-mentorship" },
  { from: "evolve", to: "creative-collabs" },
  
  // PU-iNCENT Connections
  { from: "pu-incent", to: "innovation-programs" },
  { from: "pu-incent", to: "student-communities" },
  { from: "pu-incent", to: "innovation-events" },

  // Constellation Cross-Connections
  { from: "startup-ecosystems", to: "innovation-programs" },
  { from: "founder-mentorship", to: "student-communities" },
  { from: "creative-collabs", to: "modern-websites" },
  { from: "brand-systems", to: "innovation-events" }
];

const NODE_CARDS = {
  hexora: {
    label: "HEXORA",
    role: "Founder & CEO",
    desc: "Building modern websites, digital systems, branding frameworks, and startup solutions.",
    type: "Venture Hub",
    accent: "#6E8FB3",
    overview: "Leading development teams to deliver enterprise systems, custom branding systems, and startup solutions.",
    contributions: "Architected modern design systems, built secure SaaS structures, guided seed-stage funding operations.",
    metrics: "25+ Deployed Systems",
    related: "EVOLVE, Modern Websites, Brand Systems"
  },
  evolve: {
    label: "EVOLVE",
    role: "Founder & CEO",
    desc: "Building future-focused ventures, creative systems, and growth platforms.",
    type: "Venture Studio",
    accent: "#D9C7A2",
    overview: "Forming high-growth startup ideas, investing in creative developer pipelines, and incubating innovation platforms.",
    contributions: "Accelerated brand-creation frameworks, coached startup operations, built community partnerships.",
    metrics: "5+ Active Spin-offs",
    related: "HEXORA, Startup Ecosystems, Founder Mentorship"
  },
  "pu-incent": {
    label: "PU-iNCENT",
    role: "Chief Student Advisor",
    desc: "Leading startup incubation initiatives, founder programs, and innovation ecosystems.",
    type: "Incubation Portal",
    accent: "#223047",
    overview: "Managing the official student incubator, cohort operational targets, and venture advisor programs at Poornima University.",
    contributions: "Coordinated regional pitch pipelines, guided collegiate incubation platforms, scaled bootcamp cohorts.",
    metrics: "50+ Guidances Completed",
    related: "Student Communities, Innovation Programs"
  },
  "startup-ecosystems": {
    label: "Startup Ecosystems",
    role: "Ecosystem Architect",
    desc: "Fostering regional entrepreneurship and scaling incubator models.",
    type: "Focus Node",
    accent: "#8A8A8A",
    overview: "Structuring incubation frameworks to foster startup ecosystems, seed funding pipelines, and student entrepreneurship.",
    contributions: "Co-authored incubation blueprints, designed regional tech clubs, built investor relationships.",
    metrics: "10+ Incubators Guided",
    related: "EVOLVE, Innovation Programs"
  },
  "digital-products": {
    label: "Digital Products",
    role: "Lead Product Designer",
    desc: "Designing and engineering robust SaaS, dashboards, and complex web systems.",
    type: "Focus Node",
    accent: "#6E8FB3",
    overview: "Designing secure client dashboards, enterprise SaaS platforms, and optimized visual structures.",
    contributions: "Customized state management pipelines, unified interface guidelines, created visual telemetry components.",
    metrics: "15+ Deployed Dashboards",
    related: "HEXORA, Brand Systems"
  },
  "modern-websites": {
    label: "Modern Websites",
    role: "Creative Technologist",
    desc: "Creating high-fidelity, motion-rich editorial web experiences.",
    type: "Focus Node",
    accent: "#D9C7A2",
    overview: "Engineering motion-heavy portfolio frameworks, custom 3D point systems, and interactive spatial websites.",
    contributions: "Engineered high-performance scroll-linked stacking layers, fluid Lenis smooth scroll models, custom R3F canvases.",
    metrics: "40+ Portals Built",
    related: "HEXORA, Creative Collaborations"
  },
  "brand-systems": {
    label: "Brand Systems",
    role: "Brand Strategist",
    desc: "Crafting minimalist corporate identities, type systems, and digital guidelines.",
    type: "Focus Node",
    accent: "#6E8FB3",
    overview: "Curating minimal editorial guidelines, responsive color theories, typography grids, and spatial templates.",
    contributions: "Created signature visual parameters for Hexora and PU-iNCENT, structured architectural design systems.",
    metrics: "30+ Identities Built",
    related: "HEXORA, Digital Products"
  },
  "innovation-programs": {
    label: "Innovation Programs",
    role: "Program Director",
    desc: "Designing accelerator tracks, hackathons, and cohort operations.",
    type: "Focus Node",
    accent: "#223047",
    overview: "Coordinating cohort tracks, competitive bootcamps, startup summits, and hackathon schedules.",
    contributions: "Coordinated Lakshya 2026 and regional incubation tracks, designed pitch blueprints.",
    metrics: "150+ Cohort Graduates",
    related: "PU-iNCENT, Startup Ecosystems"
  },
  "student-communities": {
    label: "Student Communities",
    role: "Community Lead",
    desc: "Mobilizing tech clubs, developers, and collegiate innovation pipelines.",
    type: "Focus Node",
    accent: "#8A8A8A",
    overview: "Unifying student developer pipelines, incubation captains, and high-performance tech squads.",
    contributions: "Organized regional developer circles, coached high-performance hackathon squads.",
    metrics: "1200+ Members Engaged",
    related: "PU-iNCENT, Founder Mentorship"
  },
  "founder-mentorship": {
    label: "Founder Mentorship",
    role: "Venture Mentor",
    desc: "Advising early-stage founders on product-market fit and tech architecture.",
    type: "Focus Node",
    accent: "#D9C7A2",
    overview: "Giving hours to early-stage student founders on code structures, pitch prep, and early operations.",
    contributions: "Advised 50+ student ventures on minimum viable products and technical architectures.",
    metrics: "100+ Hours Contributed",
    related: "EVOLVE, Student Communities"
  },
  "creative-collabs": {
    label: "Creative Collaborations",
    role: "Creative Director",
    desc: "Engaging in cross-disciplinary projects at the intersection of design and tech.",
    type: "Focus Node",
    accent: "#8A8A8A",
    overview: "Synthesizing cross-disciplinary projects combining spatial graphics, code architectures, and tactile web models.",
    contributions: "Partnered with visual artists, illustrative designers, and next-generation agencies.",
    metrics: "12+ Labs Active",
    related: "EVOLVE, Modern Websites"
  },
  "innovation-events": {
    label: "Innovation Events",
    role: "Lead Coordinator",
    desc: "Organizing and producing tech conferences and startup summits.",
    type: "Focus Node",
    accent: "#223047",
    overview: "Orchestrating regional technology conferences, startup pitch summits, and hackathons.",
    contributions: "Directed department conferences and regional startup coordinate tracks.",
    metrics: "40+ Summits Coordinated",
    related: "PU-iNCENT, Brand Systems"
  }
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeTabNode, setActiveTabNode] = useState(null); // Touch support for mobile tap
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const networkRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeNodeInfo = hoveredNode 
    ? (hoveredNode === "center" ? CENTER_NODE : NODE_CARDS[hoveredNode])
    : (activeTabNode ? (activeTabNode === "center" ? CENTER_NODE : NODE_CARDS[activeTabNode]) : null);
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
              className="block"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-charcoal tracking-widest uppercase select-none">
                  Founder Inbox — Open for Collaborations
                </span>
              </div>
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
              const isLinkedin = channel.id === "linkedin";
              const cardClass = isLinkedin
                ? "group flex flex-col justify-between p-6 sm:p-7 rounded-[20px] bg-white border border-charcoal/6 hover:border-transparent hover:bg-gradient-to-br hover:from-[#0A66C2] hover:to-[#004182] hover:text-white shadow-premium-sm hover:shadow-[0_12px_40px_rgba(10,102,194,0.25)] transition-all duration-500 ease-out h-full min-h-[240px] cursor-pointer"
                : "group flex flex-col justify-between p-6 sm:p-7 rounded-[20px] bg-white border border-charcoal/6 hover:border-charcoal/12 shadow-premium-sm hover:shadow-premium-lg transition-all duration-500 ease-out h-full min-h-[240px] cursor-pointer";
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
                      className={cardClass}
                    >
                      <ChannelCardContent channel={channel} Icon={Icon} />
                    </a>
                  ) : (
                    <Link
                      href={channel.href}
                      className={cardClass}
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
            className="block"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-[1px] bg-white/20 mb-4 mx-auto" />
              <span className="font-display font-bold text-sm text-white/90 tracking-tight">
                Aditya Kapoor
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase">
                Founder, Designer & Ecosystem Builder
              </span>
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {POSITIONS.map((pos, i) => (
              <motion.div
                key={pos.org}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="group p-8 sm:p-10 rounded-[32px] bg-white/70 border border-charcoal/[0.06] hover:border-charcoal/15 shadow-premium-sm hover:shadow-premium-xl transition-all duration-500 ease-out flex flex-col justify-between min-h-[260px] relative overflow-hidden backdrop-blur-md"
              >
                {/* Subtle gradient hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pos.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Big Display Index in background */}
                <div className="absolute bottom-6 right-8 font-display text-8xl font-black text-charcoal/[0.02] group-hover:text-charcoal/[0.04] select-none pointer-events-none transition-colors duration-500 font-mono">
                  {pos.index}
                </div>

                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                      {pos.tag}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-soft-gray/40 group-hover:text-charcoal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-soft-gray tracking-wider uppercase mb-1">{pos.role}</p>
                    <h3 className="font-display font-bold text-3xl sm:text-4xl text-charcoal tracking-tight leading-none">
                      {pos.org}
                    </h3>
                  </div>
                </div>

                <div className="relative z-10 mt-8 pt-4 border-t border-charcoal/[0.05] flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                    </span>
                    Active Node
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray/60 uppercase">
                    SECURE INTAKE
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM NETWORK EXPERIENCE ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 bg-soft-white border-t border-b border-charcoal/5 relative z-10 overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-accent-blue/5 to-transparent blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-start w-full relative z-10">
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={false}
            className="w-full mb-12 sm:mb-16"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
              <div className="max-w-3xl">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-soft-gray uppercase block mb-4">
                  [ ECOSYSTEM NETWORK ]
                </span>
                <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.05] select-none">
                  Building connections<br className="hidden sm:inline" /> between people,<br className="hidden sm:inline" /> systems and ideas.
                </h2>
              </div>
              <div className="flex flex-col gap-4 max-w-sm shrink-0">
                <p className="text-soft-gray text-xs sm:text-sm lg:text-base leading-relaxed font-light">
                  Every venture, initiative, product, and collaboration contributes to a larger ecosystem focused on innovation, learning, technology, and execution.
                </p>
                <Link href="/ecosystem" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue transition-colors duration-300 w-fit">
                  Explore Ecosystem
                  <span className="h-[1px] w-6 bg-charcoal group-hover:bg-accent-blue group-hover:w-8 transition-colors duration-300" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive 3D Network Graph Globe Frame */}
          <div 
            ref={networkRef}
            className="w-full h-[600px] bg-white border border-charcoal/[0.06] rounded-[32px] shadow-premium-lg relative overflow-hidden flex items-center justify-center select-none"
          >
            {/* Very subtle coordinate grid overlay inside */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
            <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-accent-blue/[0.02] blur-[110px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent-sand/[0.02] blur-[110px] pointer-events-none" />

            {/* Three.js / R3F Canvas Container */}
            <div className="w-full h-full relative z-20">
              {mounted && (
                <ThreeCanvas 
                  camera={{ position: [0, 0, 7.6], fov: 45 }} 
                  className="w-full h-full"
                >
                  <ambientLight intensity={1.6} />
                  <directionalLight position={[5, 8, 5]} intensity={1.0} />
                  <pointLight position={[-8, -5, -3]} intensity={1.5} color="#6E8FB3" />
                  <spotLight 
                    position={[2, 10, 2]} 
                    angle={0.4} 
                    penumbra={1} 
                    intensity={2.0} 
                    color="#D9C7A2" 
                  />
                  <EcosystemGlobe
                    onHoverNode={setHoveredNode}
                    onClickNode={(id) => {
                      setActiveTabNode(id);
                      if (id && !isMobile) {
                        setIsModalOpen(true);
                      }
                    }}
                    activeNodeId={activeTabNode}
                  />
                </ThreeCanvas>
              )}
            </div>

            {/* Interactive Info Panel Overlay - Desktop Only */}
            <AnimatePresence mode="popLayout">
              {!isMobile && activeNodeInfo && (
                <motion.div
                  key={`info-card-${activeNodeInfo.id || hoveredNode}`}
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-white/95 border border-charcoal/[0.08] rounded-2xl shadow-premium-xl p-5 backdrop-blur-md z-30 select-none flex flex-col gap-2.5 hover:border-charcoal/15 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[9px] font-mono font-bold tracking-widest uppercase"
                      style={{ color: activeNodeInfo.accent || "#6E8FB3" }}
                    >
                      [ {activeNodeInfo.type || "DIRECTORY"} ]
                    </span>
                    <button 
                      onClick={() => {
                        setActiveTabNode(null);
                        setHoveredNode(null);
                      }}
                      className="text-soft-gray hover:text-charcoal text-[10px] font-mono tracking-widest uppercase cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-soft-gray uppercase tracking-wider mb-1 block">
                      {activeNodeInfo.role}
                    </span>
                    <h4 className="font-display font-bold text-lg text-charcoal tracking-tight leading-none mb-1.5 uppercase">
                      {activeNodeInfo.label}
                    </h4>
                    <p className="text-xs text-soft-gray leading-relaxed font-light">
                      {activeNodeInfo.desc}
                    </p>
                  </div>
                  
                  {/* Card bottom details link */}
                  <div className="pt-3 border-t border-charcoal/[0.05] flex items-center justify-between">
                    <span className="text-[9.5px] font-mono font-bold text-soft-gray/50 uppercase tracking-widest">
                      {activeNodeInfo.metrics || "01 Active Point"}
                    </span>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="group inline-flex items-center gap-1.5 text-[9.5px] font-bold text-charcoal hover:text-accent-blue uppercase tracking-widest transition-colors duration-300 cursor-pointer"
                    >
                      Explore Details
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Default directory instruction card - Desktop Only */}
              {!isMobile && !activeNodeInfo && (
                <motion.div
                  key="default-directory-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-white/95 border border-charcoal/[0.08] rounded-2xl shadow-premium-md p-5 backdrop-blur-md z-30 select-none hidden sm:flex flex-col gap-2"
                >
                  <span className="text-[9px] font-mono font-bold tracking-widest text-soft-gray uppercase">
                    [ CONSTELLATION DIRECTORY ]
                  </span>
                  <h4 className="font-display font-bold text-base text-charcoal tracking-tight mt-1">
                    Ecosystem 3D Constellation
                  </h4>
                  <p className="text-xs text-soft-gray leading-relaxed font-light">
                    Hover over any focus area or venture node in the 3D constellation globe to explore active initiatives and dynamic connections.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile panning overlay info badge */}
            <div className="absolute top-4 right-4 sm:hidden bg-charcoal/5 px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase text-soft-gray pointer-events-none z-30">
              Drag to Orbit • Tap Nodes
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGH-FIDELITY SPATIAL OVERLAY MODAL ── */}
      <AnimatePresence>
        {isModalOpen && activeNodeInfo && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/30 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="bg-white border border-charcoal/10 rounded-[32px] shadow-premium-2xl max-w-lg w-full p-8 relative overflow-hidden select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle coordinate grid pattern inside */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-charcoal/10 hover:border-charcoal/30 bg-white text-soft-gray hover:text-charcoal transition-all cursor-pointer z-10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content Panel */}
              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <span 
                    className="text-[9px] font-mono font-bold tracking-widest uppercase"
                    style={{ color: activeNodeInfo.accent || "#6E8FB3" }}
                  >
                    [ {activeNodeInfo.type || "VENTURE PORTAL"} ]
                  </span>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-xs font-mono text-soft-gray uppercase tracking-widest leading-none">
                      {activeNodeInfo.role}
                    </span>
                    <h3 className="font-display font-extrabold text-3xl text-charcoal tracking-tight leading-none uppercase mt-1">
                      {activeNodeInfo.label}
                    </h3>
                  </div>
                </div>

                <div className="h-[1px] bg-charcoal/[0.06] w-full" />

                {/* Details layout Grid */}
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <span className="text-[9.5px] font-mono font-bold tracking-widest text-soft-gray uppercase mb-1 block">
                      Overview
                    </span>
                    <p className="text-sm text-charcoal/80 font-light leading-relaxed">
                      {activeNodeInfo.overview || activeNodeInfo.desc}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9.5px] font-mono font-bold tracking-widest text-soft-gray uppercase mb-1 block">
                      Core Contributions
                    </span>
                    <p className="text-sm text-charcoal/80 font-light leading-relaxed">
                      {activeNodeInfo.contributions || "Coordinating pipeline frameworks, designing brand systems, and developing digital venture platforms."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="text-[9.5px] font-mono font-bold tracking-widest text-soft-gray uppercase mb-1 block">
                        Impact metrics
                      </span>
                      <span className="text-sm font-semibold text-charcoal tracking-tight uppercase">
                        {activeNodeInfo.metrics || "01 ACTIVE HUB"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9.5px] font-mono font-bold tracking-widest text-soft-gray uppercase mb-1 block">
                        Related focus nodes
                      </span>
                      <span className="text-[11px] font-mono text-soft-gray block leading-snug">
                        {activeNodeInfo.related || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-charcoal/[0.06] w-full" />

                {/* Footer CTA */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[9px] font-mono font-bold text-soft-gray/40 uppercase tracking-widest">
                    SYSTEM INDEX INDEXED
                  </span>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-charcoal text-white hover:bg-[#6E8FB3] text-[9.5px] font-bold uppercase tracking-widest transition-all duration-300 shadow-premium-sm cursor-pointer"
                  >
                    Acknowledge Node
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE SLIDE-UP BOTTOM SHEET ── */}
      <AnimatePresence>
        {isMobile && activeNodeInfo && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 rounded-t-[32px] bg-white border-t border-charcoal/10 shadow-premium-2xl p-6 z-[100] flex flex-col gap-4 select-none pb-10"
          >
            {/* Grab drag indicator */}
            <div className="w-12 h-1 rounded-full bg-charcoal/10 mx-auto mb-1" />
            
            <div className="flex items-center justify-between">
              <span 
                className="text-[9px] font-mono font-bold tracking-widest uppercase"
                style={{ color: activeNodeInfo.accent || "#6E8FB3" }}
              >
                [ {activeNodeInfo.type || "VENTURE CONSTELLATION"} ]
              </span>
              <button 
                onClick={() => {
                  setActiveTabNode(null);
                  setHoveredNode(null);
                }}
                className="p-1.5 rounded-full bg-charcoal/5 text-soft-gray hover:text-charcoal transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-soft-gray uppercase tracking-wider leading-none">
                {activeNodeInfo.role}
              </span>
              <h4 className="font-display font-extrabold text-2xl text-charcoal tracking-tight leading-none uppercase mt-1">
                {activeNodeInfo.label}
              </h4>
            </div>

            <div className="h-[1px] bg-charcoal/[0.05] w-full" />

            <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-1">
              <div>
                <span className="text-[8px] font-mono font-bold tracking-widest text-soft-gray/60 uppercase block mb-1">
                  Overview
                </span>
                <p className="text-xs text-charcoal/80 font-light leading-relaxed">
                  {activeNodeInfo.overview || activeNodeInfo.desc}
                </p>
              </div>

              <div>
                <span className="text-[8px] font-mono font-bold tracking-widest text-soft-gray/60 uppercase block mb-1">
                  Core Contributions
                </span>
                <p className="text-xs text-charcoal/80 font-light leading-relaxed">
                  {activeNodeInfo.contributions || "Designing pipeline frameworks, coordinating ecosystems, launching platform spun-offs."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] font-mono font-bold tracking-widest text-soft-gray/60 uppercase mb-0.5 block">
                    Impact Metrics
                  </span>
                  <span className="text-xs font-semibold text-charcoal tracking-tight uppercase">
                    {activeNodeInfo.metrics || "Active Node"}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-mono font-bold tracking-widest text-soft-gray/60 uppercase mb-0.5 block">
                    Related
                  </span>
                  <span className="text-[10px] font-mono text-soft-gray whitespace-nowrap overflow-hidden text-ellipsis block leading-none pt-0.5">
                    {activeNodeInfo.related || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="block"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a
                href="https://www.linkedin.com/in/aditya-kapoor-168914290"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-charcoal text-soft-white text-xs font-bold uppercase tracking-widest hover:bg-[#0A66C2] hover:shadow-[0_8px_30px_rgba(10,102,194,0.35)] transition-all duration-300 ease-out shadow-premium-md"
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
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// ─── Channel Card Content (inner) ────────────────────────────────────────────
function ChannelCardContent({ channel, Icon }) {
  const isLinkedin = channel.id === "linkedin";
  
  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLinkedin 
              ? "bg-charcoal/5 group-hover:bg-white/15 text-charcoal group-hover:text-white" 
              : "bg-charcoal/5 group-hover:bg-charcoal/8 text-charcoal"
          }`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className={`text-[9px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 ${
            isLinkedin 
              ? "text-soft-gray group-hover:text-white/70" 
              : "text-soft-gray"
          }`}>
            {channel.label}
          </span>
        </div>
        <h3 className={`font-display font-bold text-xl tracking-tight mb-3 leading-tight transition-colors duration-300 ${
          isLinkedin 
            ? "text-charcoal group-hover:text-white" 
            : "text-charcoal"
        }`}>
          {channel.title}
        </h3>
        <p className={`text-sm leading-relaxed font-light transition-colors duration-300 ${
          isLinkedin 
            ? "text-soft-gray group-hover:text-white/80" 
            : "text-soft-gray"
        }`}>
          {channel.description}
        </p>
      </div>
      <div className={`mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
        isLinkedin 
          ? "text-charcoal group-hover:text-white" 
          : "text-charcoal group-hover:text-charcoal"
      }`}>
        {channel.cta}
        <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </div>
    </>
  );
}
