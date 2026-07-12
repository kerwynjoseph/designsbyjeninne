"use client";

import { motion } from "framer-motion";
import { RevealText } from "./RevealText";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: MOTION.slow }}
      className={cn("mb-12 md:mb-16", centered && "text-center", className)}
    >
      {eyebrow && (
        <motion.div
          className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.normal, delay: 0.1, ease: MOTION.ease }}
        >
          {eyebrow}
        </motion.div>
      )}

      <h2 className="font-serif text-5xl md:text-7xl font-light leading-tight mb-4 text-ivory">
        <RevealText
          className="block"
        >
          {title}
        </RevealText>
      </h2>

      {subtitle && (
        <motion.p
          className="font-sans text-lg text-warmgray max-w-2xl mt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.normal, delay: 0.2, ease: MOTION.ease }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
