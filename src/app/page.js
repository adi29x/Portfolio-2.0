import React from "react";
import HeroSection from "@/components/sections/home/HeroSection";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import FounderStatement from "@/components/sections/home/FounderStatement";
import EcosystemPreview from "@/components/sections/home/EcosystemPreview";
import FloatingMetrics from "@/components/sections/home/FloatingMetrics";
import CTASection from "@/components/sections/home/CTASection";
import FloatingDock from "@/components/ui/FloatingDock";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
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
    </div>
  );
}
