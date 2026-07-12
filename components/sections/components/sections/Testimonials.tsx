"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { MOTION } from "@/lib/motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-12 bg-ink">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Testimonials"
          title="Client Love"
          subtitle="Coming soon — real client testimonials will appear here."
          centered
        />

        {/* Placeholder Message */}
        <motion.div
          className="max-w-2xl mx-auto bg-charcoal/50 border border-gold-500/20 rounded-lg p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.normal }}
        >
          <p className="font-sans text-warmgray leading-relaxed">
            Our clients' feedback and success stories will be featured here soon.
            If you've worked with us and would like to share your experience, we'd
            love to hear from you!
          </p>
          <p className="font-sans text-sm text-gold-500 mt-6 uppercase tracking-wider">
            Real testimonials coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
