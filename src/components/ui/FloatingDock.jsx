"use client";
import React from "react";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, Cpu, Inbox } from "lucide-react";

export default function FloatingDock() {
  const statuses = [
    { label: "Startup Centre", value: "PU-iNCENT", icon: Cpu, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Direct Mentorship", value: "50+ Founders", icon: Activity, color: "text-accent-blue bg-accent-blue/10" },
    { label: "Active Agency", value: "Hexora", icon: ShieldAlert, color: "text-accent-sand bg-accent-sand/10" },
    { label: "Founder Inbox", value: "Open", icon: Inbox, color: "text-charcoal bg-charcoal/10" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-2 px-5 py-2.5 glass-panel rounded-full shadow-premium-xl border border-border-gray/10 hover:shadow-premium-2xl transition-all duration-500"
    >
      {statuses.map((status, index) => {
        const Icon = status.icon;
        return (
          <div key={index} className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-warm-white transition-colors duration-300">
            <span className={`p-1 rounded-full ${status.color}`}>
              <Icon className="h-3 w-3" />
            </span>
            <div className="flex flex-col text-[10px]">
              <span className="font-mono text-soft-gray tracking-wider uppercase font-bold leading-none">{status.label}</span>
              <span className="font-sans font-bold text-charcoal leading-none mt-0.5">{status.value}</span>
            </div>
            {index < statuses.length - 1 && (
              <span className="h-4 w-[1px] bg-border-gray ml-2 shrink-0" />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
export { FloatingDock };
