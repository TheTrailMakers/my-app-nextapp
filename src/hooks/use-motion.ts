/**
 * Motion utilities for the Trail Makers design system.
 *
 * Provides:
 *  - CSS class helpers for common motion patterns
 *  - A React hook for reduced-motion awareness
 *  - Stagger-delay calculator for orchestrated entrances
 *
 * All animations use transform + opacity only (GPU-composited).
 * Reduced-motion users get instant state changes via the global
 * @media rule in globals.css — these helpers respect that automatically.
 */

import { useSyncExternalStore } from "react";

/* -------------------------------------------------------
   Reduced motion hook
   ------------------------------------------------------- */

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
}

/* -------------------------------------------------------
   Stagger delay for orchestrated entrance sequences.
   Returns a CSS style object: { animationDelay: "Xms" }
   ------------------------------------------------------- */

export function staggerDelay(
  index: number,
  baseMs = 80,
  maxMs = 600,
): React.CSSProperties {
  return {
    animationDelay: `${Math.min(index * baseMs, maxMs)}ms`,
  };
}

/* -------------------------------------------------------
   Transition class presets.
   Use with Tailwind's `className` directly:
     className={`${motionPreset.fadeInUp} ...`}
   ------------------------------------------------------- */

export const motionPreset = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  fadeInDown: "animate-fade-in-down",
  scaleIn: "animate-scale-in",
} as const;
