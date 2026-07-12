"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function RevealText({
  children,
  className = "",
  delay = 0,
}: RevealTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
