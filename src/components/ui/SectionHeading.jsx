"use client";
import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function SectionHeading({ label, title, description, className = "" }) {
  return (
    <div className={`flex flex-col gap-4 max-w-3xl mb-16 sm:mb-20 ${className}`}>
      {/* Label Badge */}
      {label && (
        <ScrollReveal
          baseOpacity={0.3}
          enableBlur={false}
          baseRotation={0}
          className="text-xs font-mono font-bold tracking-widest text-soft-gray uppercase"
        >
          {`[ ${label} ]`}
        </ScrollReveal>
      )}

      {/* Animated Display Title */}
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        blurStrength={8}
        baseRotation={1}
        className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-charcoal leading-[1.1]"
      >
        {title}
      </ScrollReveal>

      {/* Narrative description */}
      {description && (
        <ScrollReveal
          baseOpacity={0.4}
          blurStrength={3}
          baseRotation={0}
          className="text-base sm:text-lg text-soft-gray leading-relaxed mt-2 block"
        >
          {description}
        </ScrollReveal>
      )}
    </div>
  );
}
export { SectionHeading };
