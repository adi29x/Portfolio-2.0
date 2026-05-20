"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom event to trigger CMD+K command menu programmatically
  const triggerCommandMenu = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-12 py-6 transition-all duration-500">
      <div 
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
          scrolled 
            ? "glass-panel shadow-premium-md py-3 translate-y-2 border-border-gray"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Brand Logo / Identity */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display font-bold tracking-tight text-xl text-charcoal">
            ADITYA<span className="text-accent-blue font-light">KAPOOR</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue opacity-80 group-hover:scale-150 transition-all duration-300" />
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300">
                <span className={isActive ? "text-charcoal font-semibold" : "text-soft-gray hover:text-charcoal"}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent-blue rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Interactions */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          <button 
            onClick={triggerCommandMenu}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-full border border-border-gray hover:bg-warm-white text-soft-gray hover:text-charcoal transition-all duration-300 cursor-pointer shadow-premium-sm"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded border border-border-gray bg-soft-white text-[10px] font-mono shadow-premium-sm">
              ⌘K
            </kbd>
          </button>

          {/* Premium Action CTA */}
          <Link href="/contact" passHref legacyBehavior>
            <a
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-soft-white bg-charcoal hover:bg-charcoal/85 border border-transparent hover:border-charcoal/10 rounded-full transition-all duration-300 ease-out shadow-premium-sm hover:shadow-premium-md hover:opacity-90"
            >
              Collaborate
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
export { Header };
