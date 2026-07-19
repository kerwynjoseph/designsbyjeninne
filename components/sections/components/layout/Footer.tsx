"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { MOTION } from "@/lib/motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-gold-500/20 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal }}
          >
            <Image
              src="/logo.png"
              alt="Designs by Jeninne"
              width={200}
              height={80}
              className="h-16 w-auto mb-4"
            />
            <p className="font-sans text-sm text-warmgray">
              Luxury creative studio specializing in elegant design solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal, delay: 0.1 }}
          >
            <h4 className="font-sans font-medium text-ivory mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              {["Services", "Portfolio", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-warmgray hover:text-gold-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal, delay: 0.2 }}
          >
            <h4 className="font-sans font-medium text-ivory mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <a
                  href="mailto:info@designsbyjeninne.com"
                  className="text-warmgray hover:text-gold-500 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@designsbyjeninne.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+18683445101"
                  className="text-warmgray hover:text-gold-500 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +1 (868) 344-5101
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal, delay: 0.3 }}
          >
            <h4 className="font-sans font-medium text-ivory mb-4 text-sm uppercase tracking-wider">
              Follow
            </h4>
            <p className="font-sans text-sm text-warmgray">
              Coming soon on social media
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-gold-900 via-gold-500 to-gold-900 opacity-30 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: MOTION.ease }}
        />

        {/* Copyright */}
        <motion.p
          className="font-sans text-xs text-warmgray text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.normal }}
        >
          © {currentYear} Designs by Jeninne. All rights reserved. | Built with
          precision and elegance.
        </motion.p>
      </div>
    </footer>
  );
}
