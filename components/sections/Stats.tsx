"use client";

import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";

const stats = [
  {
    number: "100+",
    label: "Creative Services",
  },
  {
    number: "50+",
    label: "Branding Projects",
  },
  {
    number: "75+",
    label: "Content Campaigns",
  },
  {
    number: "98+",
    label: "Client Satisfaction %",
  },
];

export function Stats() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-charcoal/50 border-y border-gold-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="font-serif text-5xl md:text-6xl font-light text-gold-500 mb-3">
                {stat.number}
              </p>
              <p className="font-sans text-sm md:text-base text-warmgray uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
