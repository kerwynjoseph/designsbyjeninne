import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin once
let isRegistered = false;

export function registerGsapPlugins() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
}

export { gsap, ScrollTrigger };
