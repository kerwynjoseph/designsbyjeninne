"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { ContactForm } from "./ContactForm";
import { MOTION } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Create Something Exceptional"
          subtitle="Ready to bring your vision to life? We'd love to hear about your project. Reach out and let's start a conversation."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mt-16">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.slow }}
          >
            {/* Email */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-gold-500" />
                <h3 className="font-serif text-lg font-light text-ivory">
                  Email
                </h3>
              </div>
              <p className="font-sans text-warmgray leading-relaxed">
                info@designsbyjeninne.com
              </p>
              <p className="font-sans text-xs text-warmgray/60 mt-2">
                We typically respond within 24 hours.
              </p>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-5 h-5 text-gold-500" />
                <h3 className="font-serif text-lg font-light text-ivory">
                  Phone
                </h3>
              </div>
              <p className="font-sans text-warmgray leading-relaxed">
                +1 (868) 344-5101
              </p>
              <p className="font-sans text-xs text-warmgray/60 mt-2">
                Available for inquiries and project consultations
              </p>
            </div>

            {/* Response Time */}
            <motion.div
              className="pt-8 border-t border-gold-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.2 }}
            >
              <h4 className="font-sans text-xs font-medium text-gold-500 uppercase tracking-wider mb-2">
                Response Time
              </h4>
              <p className="font-sans text-sm text-warmgray">
                We value every inquiry and promise thoughtful, personalized
                responses. Our team is dedicated to understanding your vision
                and providing strategic direction.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.slow }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
