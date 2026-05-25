"use client";
import React, { useState } from "react";
import HeroSection from "@/components/sections/home/HeroSection";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import FounderStatement from "@/components/sections/home/FounderStatement";
import EcosystemPreview from "@/components/sections/home/EcosystemPreview";
import FloatingMetrics from "@/components/sections/home/FloatingMetrics";
import CTASection from "@/components/sections/home/CTASection";
import FloatingDock from "@/components/ui/FloatingDock";
import Preloader from "@/components/ui/Preloader";
import { motion } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col w-full relative">
      {/* Premium Cinematic Preloader */}
      <Preloader onComplete={() => setLoading(false)} />

      {/* Main Homepage Fades In softly once preloaded */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col w-full"
      >
        {/* Cinematic 3D interactive hero */}
        <HeroSection />

        {/* Flagship innovations showreel */}
        <FeaturedProjects />

        {/* Philosophy block */}
        <FounderStatement />

        {/* Modular asymmetric bento ventures ecosystem */}
        <EcosystemPreview />

        {/* Dynamic performance indicators */}
        <FloatingMetrics />

        {/* Magnetic bookings CTA */}
        <CTASection />

        {/* Real-time active status dock */}
        <FloatingDock />
      </motion.div>
    </div>
  );
}
