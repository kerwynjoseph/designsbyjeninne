"use client";

import { motion } from "framer-motion";
import { pricingSections } from "@/lib/data/pricing";
import { SectionHeading } from "../shared/SectionHeading";
import { PricingCard } from "./PricingCard";
import { AddOns } from "./AddOns";
import { MOTION } from "@/lib/motion";

export function PricingPage() {
  return (
    <main className="w-full bg-ink">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Services & Pricing
          </motion.div>

          <motion.h1
            className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Professional Videography Packages
          </motion.h1>

          <motion.p
            className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Choose the perfect package for your videography needs. All packages
            include professional editing, colour grading, and digital delivery.
          </motion.p>
        </div>
      </section>

      {/* Pricing Sections */}
      {pricingSections.map((section, sectionIdx) => (
        <section
          key={section.id}
          id={section.id}
          className="py-24 md:py-32 px-6 md:px-12 bg-charcoal/30"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <SectionHeading
              eyebrow="Videography Services"
              title={section.title}
              subtitle={section.description}
              centered
            />

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-12">
              {section.packages.map((pkg, idx) => (
                <PricingCard
                  key={pkg.tier}
                  package={pkg}
                  index={idx}
                  isFeatured={pkg.tier === "gold"}
                />
              ))}
            </div>

            {/* Add-ons */}
            {section.addOns.length > 0 && <AddOns addOns={section.addOns} />}
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-charcoal to-ink">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal }}
          >
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-6">
              Ready to Book?
            </h2>
            <p className="font-sans text-lg text-warmgray max-w-2xl mx-auto leading-relaxed mb-8">
              Contact us to discuss your project, get a custom quote, or book
              your preferred package.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-lg bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink font-sans font-medium text-lg uppercase tracking-wider hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 transition-all"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
