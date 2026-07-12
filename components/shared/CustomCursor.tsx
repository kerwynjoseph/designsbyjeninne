"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Spring smoothing for cursor follow
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if user has fine pointer (not touch)
    const hasFinPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinPointer) return;

    setIsVisible(true);

    let throttleTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        cursorX.set(e.clientX - 8);
        cursorY.set(e.clientY - 8);
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null as any;
        }, 16); // ~60fps throttle
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOverElement = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isCursorTarget = target.closest("[data-cursor='hover']");
      setIsHovering(!!isCursorTarget);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOverElement);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOverElement);
      clearTimeout(throttleTimeout);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-gradient-to-br from-gold-100 to-gold-500 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  );
}
