// Shared animation constants to keep Framer Motion & GSAP easing/timing consistent
export const MOTION = {
  // Easing: luxury slow-out feel (ease-out-expo-ish)
  ease: "easeOut" as const, // Framer Motion easing string
  easeArray: [0.16, 1, 0.3, 1], // cubic-bezier equivalent of gsap power3.out
  easingGsap: "power3.out", // GSAP easing string

  // Durations (seconds, for Framer)
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slowest: 1,

  // Scroll smooth scroll config
  lenisDuration: 0.6, // seconds, the feel of smooth scroll decay (reduced for faster nav)
  lenisEasing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo

  // Reveal animation defaults
  revealDuration: 0.6,
  revealStagger: 0.08,

  // Hover/micro-interaction defaults
  hoverDuration: 0.3,
  hoverScale: 1.05,
};
