"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { MOTION } from "@/lib/motion";

interface AddOn {
  name: string;
  price: number;
  currency: string;
}

interface AddOnsProps {
  addOns: AddOn[];
}

export function AddOns({ addOns }: AddOnsProps) {
  return (
    <motion.div
      className="mt-12 pt-12 border-t border-gold-500/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION.normal, delay: 0.3 }}
    >
      <h4 className="font-serif text-2xl font-light text-ivory mb-8 text-center">
        Add-Ons
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addOns.map((addOn, idx) => (
          <motion.div
            key={idx}
            className="flex items-center justify-between p-4 rounded-lg bg-charcoal/50 border border-gold-500/20 hover:border-gold-500/40 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: MOTION.normal,
              delay: idx * 0.05,
            }}
          >
            <div className="flex items-center gap-3">
              <Plus className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span className="font-sans text-sm text-warmgray">{addOn.name}</span>
            </div>
            <span className="font-serif text-gold-500 font-light">
              {addOn.currency}
              {addOn.price}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
