"use client";

import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface ImageRevealProps extends ImageProps {
  variant?: "scale" | "clipPath";
}

export function ImageReveal({
  variant = "scale",
  className = "",
  ...props
}: ImageRevealProps) {
  const variants = {
    scale: {
      hidden: { scale: 0.9, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: MOTION.slow,
          ease: MOTION.ease,
        },
      },
    },
    clipPath: {
      hidden: { clipPath: "inset(0% 100% 0% 0%)" },
      visible: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
          duration: MOTION.slow,
          ease: MOTION.ease,
        },
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants[variant]}
      className="overflow-hidden"
    >
      <Image {...props} className={className} />
    </motion.div>
  );
}
