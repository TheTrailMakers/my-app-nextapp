"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-right" | "slide-left" | "scale-up";
  className?: string;
  offset?: any; // To allow flexibility and satisfy Framer Motion's ProgressIntersection type
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  className = "",
  offset = ["start 95%", "start 65%"],
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const fadeUpY = useTransform(smoothProgress, [0, 1], [50, 0]);
  const slideRightX = useTransform(smoothProgress, [0, 1], [-50, 0]);
  const slideLeftX = useTransform(smoothProgress, [0, 1], [50, 0]);
  const scaleUpScale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  
  const baseOpacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const scaleOpacity = useTransform(smoothProgress, [0, 1], [0.5, 1]);

  const getStyle = () => {
    switch (animation) {
      case "fade-up":
        return { opacity: baseOpacity, y: fadeUpY };
      case "fade-in":
        return { opacity: baseOpacity };
      case "slide-right":
        return { opacity: baseOpacity, x: slideRightX };
      case "slide-left":
        return { opacity: baseOpacity, x: slideLeftX };
      case "scale-up":
        return { opacity: scaleOpacity, scale: scaleUpScale };
      default:
        return {};
    }
  };

  return (
    <motion.div ref={ref} style={getStyle()} className={className}>
      {children}
    </motion.div>
  );
}
