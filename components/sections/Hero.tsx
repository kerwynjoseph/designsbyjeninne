"use client";

import { motion } from "framer-motion";
import { RevealText } from "../shared/RevealText";
import { GoldButton } from "../shared/GoldButton";
import { MOTION } from "@/lib/motion";
import { useLenis } from "@/lib/lenis";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const lenis = useLenis();

  const handleScroll = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection && lenis) {
      lenis.lenis?.scrollTo(servicesSection, { duration: 1.2 });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink flex items-center justify-center px-6 pt-28 md:pt-0">
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-ink to-ink" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center">
        {/* Eyebrow */}
        <motion.div
          className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Designs by Jeninne
        </motion.div>

        {/* Main Headline */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-light leading-tight text-ivory mb-8 tracking-tight">
          <RevealText
            className="block"
            delay={0.3}
          >
            Luxury Creative Design for Brands That Want to Stand Out
          </RevealText>
        </h1>

        {/* Subheading */}
        <motion.p
          className="font-sans text-lg md:text-xl text-warmgray max-w-3xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Designs by Jeninne creates elegant visuals, digital content, and brand
          experiences for businesses, events, and creatives who want a polished
          and professional presence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <GoldButton
            variant="filled"
            onClick={() => window.location.href = "/contact"}
          >
            Start Your Project
          </GoldButton>
          <GoldButton
            variant="outline"
            onClick={() => window.location.href = "/pricing"}
          >
            View Services
          </GoldButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-sans text-warmgray uppercase tracking-wide">
          Scroll to explore
        </span>
        <ChevronDown className="w-5 h-5 text-gold-500" />
      </motion.div>
    </section>
  );
}
