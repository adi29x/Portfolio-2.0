"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Compass, FolderOpen, ArrowRight } from "lucide-react";
import { commandMenuItems } from "@/data/navigation";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (action) => {
    setOpen(false);
    if (action.startsWith("http") || action.endsWith(".pdf")) {
      window.open(action, "_blank");
    } else {
      router.push(action);
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-charcoal/45 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div 
        className="w-full max-w-xl glass-panel shadow-premium-xl rounded-2xl overflow-hidden border border-border-gray/10 max-h-[450px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Global Command Menu" className="flex flex-col h-full bg-soft-white/95">
          {/* Command Input */}
          <div className="flex items-center gap-3 px-4 border-b border-border-gray py-3">
            <Search className="h-4.5 w-4.5 text-soft-gray shrink-0" />
            <Command.Input 
              placeholder="Search shortcuts, projects, and actions..." 
              className="w-full bg-transparent border-0 outline-0 text-sm text-charcoal placeholder:text-soft-gray focus:ring-0"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded border border-border-gray bg-warm-white text-[10px] font-mono text-soft-gray">
              ESC
            </kbd>
          </div>

          {/* Command Results */}
          <Command.List className="overflow-y-auto p-2 scrollbar-none max-h-[300px] flex-1">
            <Command.Empty className="text-xs text-soft-gray py-6 text-center">
              No results found for that search query.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group 
              heading={
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-soft-gray uppercase px-3 py-2">
                  <Compass className="h-3 w-3" /> Navigation Directories
                </span>
              }
            >
              {commandMenuItems.filter(item => item.category === "Navigation").map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.title}
                  onSelect={() => runCommand(item.action)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-charcoal hover:bg-warm-white cursor-pointer transition-colors duration-200"
                >
                  <span className="font-medium">{item.title}</span>
                  {item.shortcut && (
                    <span className="flex gap-1">
                      {item.shortcut.map((s, idx) => (
                        <kbd key={idx} className="px-1.5 py-0.5 rounded border border-border-gray bg-soft-white text-[9px] font-mono text-soft-gray shadow-premium-sm">
                          {s}
                        </kbd>
                      ))}
                    </span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>

            {/* Projects Group */}
            <Command.Group 
              heading={
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-soft-gray uppercase px-3 py-2 mt-3">
                  <FolderOpen className="h-3 w-3" /> Incubation Showcase
                </span>
              }
            >
              {commandMenuItems.filter(item => item.category === "Projects").map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.title}
                  onSelect={() => runCommand(item.action)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-charcoal hover:bg-warm-white cursor-pointer transition-colors duration-200"
                >
                  <span className="font-medium">{item.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-soft-gray" />
                </Command.Item>
              ))}
            </Command.Group>

            {/* Actions Group */}
            <Command.Group 
              heading={
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-soft-gray uppercase px-3 py-2 mt-3">
                  System Commands
                </span>
              }
            >
              {commandMenuItems.filter(item => item.category === "Actions").map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.title}
                  onSelect={() => runCommand(item.action)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-charcoal hover:bg-warm-white cursor-pointer transition-colors duration-200"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="text-xs text-accent-blue font-semibold uppercase tracking-wider">Execute</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
export { CommandMenu };
