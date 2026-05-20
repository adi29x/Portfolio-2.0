"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AnimatedText({ text, className = "", el: Element = "h1", once = true }) {
  if (typeof text !== "string") {
    return <Element className={className}>{text}</Element>;
  }
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Element className={`overflow-hidden flex flex-wrap ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className="flex flex-wrap gap-x-[0.25em] gap-y-[0.05em] w-full"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden relative py-[0.1em] -my-[0.1em]">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Element>
  );
}
export { AnimatedText };
