"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedText({ text, className = "", el: Element = "h1", once = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  if (typeof text !== "string") {
    return <Element className={className}>{text}</Element>;
  }

  return (
    <Element className={className} ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block w-full"
      >
        {text}
      </motion.span>
    </Element>
  );
}

export { AnimatedText };
