"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MOTION } from "@/lib/motion";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check sessionStorage to skip loading screen on subsequent page navigations
    const hasSeenLoader = sessionStorage.getItem("designsByJeninnePing");
    if (hasSeenLoader) {
      setIsVisible(false);
      return;
    }

    // Mark that we've shown the loader
    sessionStorage.setItem("designsByJeninnePing", "true");

    // Auto-hide after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-ink flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: MOTION.ease }}
        >
          <motion.div className="text-center">
            {/* Wordmark reveal animation */}
            <motion.div
              className="font-serif text-6xl font-light tracking-luxury text-ivory mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Designs by Jeninne
            </motion.div>

            {/* Gold underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-gold-100 via-gold-500 to-gold-900 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: MOTION.ease }}
              style={{ originX: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
