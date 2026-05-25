"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({
  from = 0,
  to = 100,
  duration = 2,
  separator = ",",
  startWhen = true,
  className = ""
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing curve - easeOutQuad: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (to - from) + from);
      
      setCount(currentValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, startWhen, from, to, duration]);

  // Format count with separator
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  );
}

export { CountUp };
