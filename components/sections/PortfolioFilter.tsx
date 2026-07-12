"use client";

import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

interface PortfolioFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function PortfolioFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: PortfolioFilterProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center md:justify-start mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION.normal }}
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? "bg-gold-500 text-ink"
              : "border border-gold-500/50 text-ivory hover:border-gold-500"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="hover"
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
