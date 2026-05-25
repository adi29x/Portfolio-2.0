"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Custom event to trigger CMD+K command menu programmatically
  const triggerCommandMenu = () => {
    setIsOpen(false); // Close the mobile overlay
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 bg-[#FFFFFF] border-b border-black/[0.05] transition-all duration-300 ${
          scrolled 
            ? "shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md" 
            : "shadow-[0_1px_12px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 py-4">
          {/* Brand Logo / Identity */}
          <Link href="/" onClick={() => setIsOpen(false)} className="group flex items-center gap-2 relative z-50">
            <span className="font-display font-bold tracking-tight text-xl text-charcoal">
              ADITYA<span className="text-accent-blue font-light">KAPOOR</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue opacity-80 group-hover:scale-150 transition-all duration-300" />
          </Link>

          {/* Center Navigation Links (Desktop Only) */}
          <nav className="hidden lg:flex items-center gap-1 font-sans">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="relative px-4 py-2 text-[14px] font-medium tracking-tight text-[#111111] transition-opacity duration-300 hover:opacity-70"
                >
                  <span className={isActive ? "font-semibold" : ""}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent-blue rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Interactions */}
          <div className="flex items-center gap-3 relative z-50">
            {/* Command Palette Trigger */}
            <button 
              onClick={triggerCommandMenu}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-black/[0.08] bg-[#FAFAF9] hover:bg-black/[0.02] text-charcoal/60 hover:text-charcoal transition-all duration-300 cursor-pointer shadow-premium-sm"
              aria-label="Search navigation"
            >
              <Search className="h-3.5 w-3.5 text-charcoal/50" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded border border-black/[0.08] bg-white text-[10px] font-mono shadow-premium-sm text-charcoal/50">
                ⌘K
              </kbd>
            </button>

            {/* Premium Action CTA (Desktop Only) */}
            <Link href="/contact" passHref legacyBehavior>
              <a
                className="hidden lg:inline-block px-5 py-2 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/85 border border-transparent hover:border-charcoal/10 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md hover:opacity-90"
              >
                Collaborate
              </a>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="lg:hidden flex items-center justify-center p-2 rounded-full hover:bg-black/[0.03] transition-colors duration-300 cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                <motion.span
                  style={{ position: "absolute", top: "calc(50% - 0.75px)", left: 0 }}
                  animate={isOpen ? { rotate: 45, width: "100%", backgroundColor: "#111111" } : { rotate: 0, y: -6, width: "100%", backgroundColor: "#111111" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.5px] rounded-full origin-center"
                />
                <motion.span
                  style={{ position: "absolute", top: "calc(50% - 0.75px)", left: 0 }}
                  animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, y: 0, width: "70%", backgroundColor: "#111111" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.5px] rounded-full origin-left"
                />
                <motion.span
                  style={{ position: "absolute", top: "calc(50% - 0.75px)", left: 0 }}
                  animate={isOpen ? { rotate: -45, width: "100%", backgroundColor: "#111111" } : { rotate: 0, y: 6, width: "100%", backgroundColor: "#111111" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.5px] rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen bg-[#FFFFFF] z-30 flex flex-col justify-between pt-36 pb-12 px-6 sm:px-12"
          >
            {/* Grain Texture Overlay */}
            <div className="noise-overlay opacity-[0.12] pointer-events-none" />

            {/* Ambient sand radial glow */}
            <div className="absolute top-[10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-br from-accent-sand/15 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-accent-blue/5 to-transparent blur-[120px] pointer-events-none" />

            {/* Main Navigation links */}
            <motion.div 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6 sm:gap-7 max-w-xl mt-16 relative z-10"
            >
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="group inline-flex items-center gap-4 py-1 text-2xl sm:text-3xl font-display font-light uppercase tracking-tight text-soft-gray hover:text-charcoal transition-colors duration-300 relative"
                    >
                      <span className="font-mono text-xs text-accent-blue/70 font-semibold select-none">
                        0{index + 1}
                      </span>
                      <span className={isActive ? "text-charcoal font-medium" : ""}>
                        {link.label}
                      </span>
                      {/* Subtle hover slash line reveal */}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent-blue group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Info Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full border-t border-border-gray/30 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-12 relative z-10"
            >
              {/* Active Indicator & Quick connect */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-charcoal uppercase">
                    Open for Collaborations
                  </span>
                </div>
                <p className="text-[10px] text-soft-gray font-mono tracking-wider">
                  Jaipur, IN [ 26.91° N, 75.78° E ]
                </p>
              </div>

              {/* Social Channels List */}
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "GitHub", href: "https://github.com" },
                  { label: "X", href: "https://twitter.com" },
                  { label: "Behance", href: "https://behance.net" }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold uppercase tracking-wider text-soft-gray hover:text-charcoal transition-colors duration-300"
                  >
                    {social.label}
                  </a>
                ))}
              </div>

              {/* Action Button */}
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/85 border border-transparent rounded-full text-center transition-all duration-300 shadow-premium-sm"
              >
                Collaborate
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { Header };
