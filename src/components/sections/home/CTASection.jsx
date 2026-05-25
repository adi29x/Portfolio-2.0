"use client";
import React from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Mail, Calendar, ArrowRight, Target, Briefcase } from "lucide-react";
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


export default function CTASection() {
  const containerRef = React.useRef(null);
  const [maxDrag, setMaxDrag] = React.useState(180);
  const [isSwiped, setIsSwiped] = React.useState(false);
  const x = useMotionValue(0);

  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setMaxDrag(containerRef.current.offsetWidth - 56 - 16);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textColor = useTransform(x, [0, maxDrag * 0.8], ["#111111", "#ffffff"]);
  const subtextColor = useTransform(x, [0, maxDrag * 0.8], ["rgba(17,17,17,0.6)", "rgba(255,255,255,0.85)"]);
  const indicatorOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);
  const indicatorX = useTransform(x, [0, maxDrag * 0.5], [0, 8]);
  const fillWidth = useTransform(x, (val) => `${val + 56 + 16}px`);
  const iconScale = useTransform(x, [0, maxDrag], [1, 1.08]);
  const arrowOffset = useTransform(x, [0, maxDrag * 0.5], [0, 4]);

  const handleDragEnd = (event, info) => {
    const currentX = x.get();
    const threshold = maxDrag * 0.8;
    
    if (currentX >= threshold) {
      setIsSwiped(true);
      animate(x, maxDrag, { type: "spring", stiffness: 200, damping: 25 });
      
      setTimeout(() => {
        window.open("https://www.linkedin.com/in/aditya-kapoor-168914290", "_blank");
        setTimeout(() => {
          setIsSwiped(false);
          animate(x, 0, { type: "tween", duration: 0.3 });
        }, 1000);
      }, 500);
    } else {
      animate(x, 0, { type: "spring", stiffness: 250, damping: 22 });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-6 sm:px-12 bg-soft-white border-b border-charcoal/5 relative z-10 overflow-hidden">
      {/* Background elegant grid & spatial depth (Identical to previous sections) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-accent-sand/5 to-transparent blur-[110px] pointer-events-none" />

      {/* Subtle floating architectural line */}
      <div className="absolute left-12 right-12 top-0 h-[1px] bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.05)_20%,rgba(0,0,0,0.05)_80%,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start relative z-10">
        {/* LEFT COLUMN: Editorial Content (55%) */}
        <div className="flex flex-col items-start w-full">
          {/* Label Badge */}
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
            className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase mb-8 block"
          >
            [ 05 / COLLABORATION ]
          </ScrollReveal>

          {/* Cinematic Scroll-Revealed Title */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={8}
            baseRotation={1}
            yOffset={35}
            stagger={0.06}
            className="mb-10 sm:mb-12 max-w-4xl block"
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal leading-[1.05]">
              Let's build meaningful<br />digital experiences<br />together.
            </h2>
          </ScrollReveal>

          {/* Narrative Description */}
          <ScrollReveal
            baseOpacity={0.4}
            blurStrength={3}
            baseRotation={0}
            className="font-sans font-light text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-xl mb-10 sm:mb-12 block"
          >
            From startup ecosystems and modern websites to digital products and scalable platforms — let's create experiences that combine strategy, technology, design, and execution.
          </ScrollReveal>

          {/* Buttons Row - Side by Side */}
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur={false}
            className="w-full block"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full justify-start">
              <Link href="/contact" passHref legacyBehavior>
                <a className="w-full sm:w-auto">
                  <button
                    className="w-full px-8 py-4 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/90 border border-transparent rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md hover:opacity-95 flex items-center justify-center gap-2.5"
                  >
                    <Mail className="h-4 w-4" />
                    Book a Collaboration
                  </button>
                </a>
              </Link>

              <Link href="/ecosystem" passHref legacyBehavior>
                <a className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-accent-blue border border-charcoal/10 hover:border-accent-blue/30 bg-warm-white/20 hover:bg-warm-white/80 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md hover:opacity-95">
                  <Calendar className="h-4 w-4 text-soft-gray" />
                  View Ecosystem
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                </a>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN: Founder Availability Panel (45%) */}
        <div className="w-full flex flex-col gap-6">
          {/* CARD 01: Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col p-6 sm:p-8 border border-charcoal/[0.06] bg-warm-white/40 rounded-2xl shadow-premium-sm relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-accent-blue/5 border border-accent-blue/10 text-[10px] font-mono font-bold tracking-widest text-accent-blue uppercase w-fit select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
              Available for Collaborations
            </div>
            <p className="text-soft-gray text-xs sm:text-sm leading-relaxed mt-4 font-light">
              Open to startup ecosystems, digital products, innovation platforms, branding systems, and strategic partnerships.
            </p>
          </motion.div>

          {/* CARD 02: Current Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col p-6 sm:p-8 border border-charcoal/[0.06] bg-warm-white/40 rounded-2xl shadow-premium-sm relative overflow-hidden"
          >
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-soft-gray uppercase select-none border-b border-charcoal/[0.06] pb-3 mb-4">
              <Briefcase className="h-4 w-4 text-soft-gray" />
              Current Positions
            </div>
            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-charcoal/[0.03] pb-2 last:border-0 last:pb-0">
                <span className="font-sans text-charcoal font-normal">Founder & CEO</span>
                <span className="font-mono text-[10px] font-bold tracking-widest text-soft-gray uppercase">Hexora</span>
              </div>
              <div className="flex justify-between items-center border-b border-charcoal/[0.03] pb-2 last:border-0 last:pb-0">
                <span className="font-sans text-charcoal font-normal">Founder & CEO</span>
                <span className="font-mono text-[10px] font-bold tracking-widest text-soft-gray uppercase">Evolve</span>
              </div>
              <div className="flex justify-between items-center border-b border-charcoal/[0.03] pb-2 last:border-0 last:pb-0">
                <span className="font-sans text-charcoal font-normal">Chief Student Advisor</span>
                <span className="font-mono text-[10px] font-bold tracking-widest text-soft-gray uppercase">PU-iNCENT</span>
              </div>
            </div>
          </motion.div>

          {/* CARD 03: Premium LinkedIn Connection Swipe Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full mt-2"
          >
            {/* Draggable Swipe Card Container */}
            <div 
              ref={containerRef}
              className="h-[72px] w-full rounded-full bg-white border border-charcoal/[0.08] relative flex items-center select-none overflow-hidden transition-all duration-300 shadow-premium-sm hover:shadow-premium-md"
            >
              {/* Dynamic Blue Fill behind the handle */}
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0A66C2] to-[#004182] z-10 rounded-full origin-left"
                style={{ width: fillWidth }}
              />

              {/* Draggable Handle */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: maxDrag }}
                dragElastic={0.02}
                dragMomentum={false}
                style={{ x }}
                onDragEnd={handleDragEnd}
                className="h-14 w-14 rounded-full bg-white shadow-premium-md border border-charcoal/[0.06] flex items-center justify-center absolute left-2 top-2 cursor-grab active:cursor-grabbing z-30 select-none transition-shadow duration-300 hover:shadow-premium-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, cursor: "grabbing" }}
              >
                <motion.div style={{ scale: iconScale }} className="flex items-center justify-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                </motion.div>
              </motion.div>

              {/* CENTER: Text Content (Fades out when swiped) */}
              <div className="absolute inset-0 flex items-center z-20 pointer-events-none pr-20 pl-20">
                {isSwiped ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="text-white text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center gap-2 mx-auto justify-center"
                  >
                    <span className="text-sm">✓</span> Connected
                  </motion.div>
                ) : (
                  <div className="flex flex-col justify-center text-left">
                    <motion.span 
                      style={{ color: textColor }} 
                      className="font-display font-semibold text-xs sm:text-sm tracking-tight leading-none"
                    >
                      Connect with me on LinkedIn
                    </motion.span>
                    <motion.p 
                      style={{ color: subtextColor }} 
                      className="font-sans text-[9px] sm:text-[10px] mt-1 font-light leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px] sm:max-w-[240px] md:max-w-none"
                    >
                      Follow my startup journey, projects, ecosystem updates & insights.
                    </motion.p>
                  </div>
                )}
              </div>

              {/* RIGHT: Swipe Indicator (Fades out during swipe) */}
              {!isSwiped && (
                <motion.div 
                  style={{ opacity: indicatorOpacity, x: indicatorX }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#0A66C2] z-20 flex items-center gap-1.5 pointer-events-none select-none"
                >
                  SWIPE
                  <motion.span style={{ x: arrowOffset }}>→</motion.span>
                </motion.div>
              )}
            </div>

            {/* ACCESSIBILITY: Button Fallback */}
            <div className="mt-3 text-center">
              <a 
                href="https://www.linkedin.com/in/aditya-kapoor-168914290" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-soft-gray hover:text-[#0A66C2] transition-colors duration-300 flex items-center justify-center gap-1 group"
              >
                Prefer clicking? Open LinkedIn
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-300 text-soft-gray/70 group-hover:text-[#0A66C2]" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { CTASection };
