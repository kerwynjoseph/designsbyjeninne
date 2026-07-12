"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PricingPackage } from "@/lib/data/pricing";
import { MOTION } from "@/lib/motion";

interface PricingCardProps {
  package: PricingPackage;
  index: number;
  isFeatured?: boolean;
  onClick?: () => void;
}

export function PricingCard({
  package: pkg,
  index,
  isFeatured = false,
  onClick,
}: PricingCardProps) {
  const tierColors = {
    bronze: "border-orange-500/30 hover:border-orange-500/60",
    silver: "border-gray-400/30 hover:border-gray-400/60",
    gold: "border-gold-500/60 hover:border-gold-300",
  };

  const tierBgColors = {
    bronze: "bg-charcoal/40",
    silver: "bg-charcoal/50",
    gold: "bg-charcoal/60 shadow-[0_0_30px_rgba(212,175,55,0.2)]",
  };

  const tierLabels = {
    bronze: "Bronze Package",
    silver: "Silver Package",
    gold: "Premium Package",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: MOTION.normal,
        delay: index * 0.1,
      }}
      whileHover={isFeatured ? { y: -8 } : { y: -4 }}
      className={`relative h-full ${isFeatured ? "md:col-span-full lg:col-span-1 lg:scale-105 lg:z-10" : ""}`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-4 py-1 bg-gold-500 text-ink rounded-full font-serif text-sm font-light tracking-wider">
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Card */}
      <div
        className={`relative h-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${tierColors[pkg.tier]} ${tierBgColors[pkg.tier]} backdrop-blur-sm`}
      >
        {/* Gradient overlay on featured */}
        {isFeatured && (
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />
        )}

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
          {/* Tier Label */}
          <div className="mb-6">
            <p className="text-xs font-sans font-medium text-gold-500 uppercase tracking-widest mb-2">
              {tierLabels[pkg.tier]}
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-ivory mb-2">
              {pkg.currency}
              <span className="text-4xl md:text-5xl font-light">{pkg.price}</span>
            </h3>
            <p className="text-xs text-warmgray font-sans">{pkg.description}</p>
          </div>

          {/* Features */}
          <div className="mb-8 flex-grow">
            <p className="text-xs font-sans font-medium text-gold-500 uppercase tracking-widest mb-4">
              What's Included
            </p>
            <ul className="space-y-3">
              {pkg.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: idx * 0.05,
                  }}
                >
                  <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-sans text-warmgray leading-relaxed">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Best For */}
          <div className="mb-8 py-6 border-t border-gold-500/20">
            <p className="text-xs font-sans font-medium text-gold-500 uppercase tracking-widest mb-3">
              Best For
            </p>
            <div className="flex flex-wrap gap-2">
              {pkg.bestFor.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-ivory font-sans"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            className={`w-full py-3 rounded-lg font-sans font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
              isFeatured
                ? "bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink hover:from-gold-300 hover:via-gold-700 hover:to-gold-900"
                : "border border-gold-500/50 text-ivory hover:bg-gold-500 hover:text-ink hover:border-gold-500"
            }`}
          >
            {pkg.cta}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
