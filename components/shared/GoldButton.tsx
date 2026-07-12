"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "filled" | "outline";
  className?: string;
  disabled?: boolean;
}

export function GoldButton({
  children,
  onClick,
  href,
  variant = "outline",
  className,
  disabled = false,
}: GoldButtonProps) {
  const baseClasses =
    "px-8 py-3 rounded-sm font-sans font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer";

  const variantClasses =
    variant === "filled"
      ? "bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 gold-glow"
      : "border border-gold-500 text-ivory hover:border-gold-300 hover:bg-gold-500 hover:bg-opacity-10";

  const combinedClasses = cn(baseClasses, variantClasses, className, {
    "opacity-50 cursor-not-allowed": disabled,
  });

  const Component = href ? "a" : "button";

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <Component
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={`${combinedClasses} inline-block`}
        data-cursor="hover"
      >
        {children}
      </Component>
    </motion.div>
  );
}
