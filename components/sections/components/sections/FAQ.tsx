"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { faqItems } from "@/lib/data/faq";
import { MOTION } from "@/lib/motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-charcoal">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services, process, and how to get started."
          centered
        />

        {/* Accordion */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.normal }}
        >
          {faqItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="border border-gold-500/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: MOTION.normal,
                delay: idx * 0.05,
              }}
            >
              {/* Question */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full px-6 py-4 md:px-8 md:py-5 flex items-center justify-between hover:bg-charcoal/50 transition-colors"
              >
                <h3 className="font-serif text-lg font-light text-ivory text-left">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-gold-500" />
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedId === item.id ? "auto" : 0,
                  opacity: expandedId === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gold-500/20"
              >
                <p className="px-6 py-4 md:px-8 md:py-5 font-sans text-warmgray leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
