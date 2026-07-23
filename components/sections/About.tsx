"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MOTION } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const AnimatedCounter = ({
  end,
  label,
}: {
  end: number;
  label: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <motion.p className="font-serif text-4xl md:text-5xl font-light text-gold-500 mb-2">
        {count}+
      </motion.p>
      <p className="font-sans text-sm text-warmgray uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

export function About({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" } = {}) {
  const HeadingTag = headingLevel;

  const router = useRouter();

  const handleScroll = () => {
    router.push("/contact");
  };

  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12 bg-ink">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start mb-20">
          {/* Image (Left) - Mobile: Top, Desktop: Left */}
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: MOTION.slow }}
          >
            <div className="relative">
              {/* Subtle shadow background */}
              <div className="absolute -inset-2 bg-gradient-to-b from-gold-500/10 to-transparent rounded-3xl blur-3xl" />

              {/* Image container with rounded corners and shadow */}
              <motion.div
                whileHover={{ scale: 1.01, y: -4 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-gold-500/20"
              >
                <Image
                  src="/images/jeninne-about.jpg"
                  alt="Jeninne Belfast - Founder & Creative Director"
                  width={500}
                  height={650}
                  className="w-full h-auto object-cover object-center"
                  priority
                  quality={95}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Content (Right) */}
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: MOTION.slow }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal }}
              className="inline-block mb-6"
            >
              <div className="px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full">
                <p className="font-sans text-xs text-gold-500 uppercase tracking-widest font-medium">
                  Creative Director • Founder
                </p>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.1 }}
            >
              <HeadingTag className="font-serif text-5xl md:text-6xl font-light text-ivory mb-8 leading-tight">
                Meet Jeninne Belfast
              </HeadingTag>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.2 }}
              className="space-y-6 text-warmgray font-sans leading-relaxed mb-8"
            >
              <p className="text-lg">
                At Designs by Jeninne, creativity meets strategy. I believe that every brand has a unique story worth telling, and my mission is to transform ideas into visually compelling experiences that leave lasting impressions.
              </p>

              <p>
                I specialize in Graphic Design, Videography, Social Media Management, and Content Creation, helping businesses, entrepreneurs, and personal brands establish a professional, recognizable, and engaging presence across both digital and print platforms.
              </p>

              <p>
                Whether it's designing impactful marketing materials, producing high-quality visual content, developing cohesive branding, or creating social media campaigns that connect with audiences, every project is approached with creativity, attention to detail, and a commitment to excellence.
              </p>

              <p>
                My goal is not simply to make designs look beautiful—it's to create purposeful visuals that strengthen brands, build trust, and drive meaningful engagement. I work closely with each client to understand their vision and transform it into designs and content that communicate their message with clarity and confidence.
              </p>
            </motion.div>

            {/* Current Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.3 }}
              className="mb-10 pb-10 border-b border-gold-500/20"
            >
              <h3 className="font-serif text-2xl font-light text-ivory mb-6">
                Current Services
              </h3>
              <div className="grid grid-cols-2 gap-4 font-sans text-sm text-warmgray">
                {[
                  "Brand Identity & Logo Design",
                  "Graphic Design",
                  "Marketing Materials",
                  "Social Media Content",
                  "Social Media Management",
                  "Videography",
                  "Promotional Videos",
                  "Content Creation",
                  "Creative Consulting",
                ].map((service, idx) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                    {service}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.4 }}
              className="mb-10 pb-10 border-b border-gold-500/20"
            >
              <h3 className="font-serif text-2xl font-light text-ivory mb-6">
                Coming Soon
              </h3>
              <p className="font-sans text-sm text-warmgray mb-4">
                A new chapter is on the horizon. Soon, Designs by Jeninne will also offer:
              </p>
              <div className="grid grid-cols-2 gap-4 font-sans text-sm text-warmgray">
                {[
                  "Professional Website Design",
                  "Custom UI/UX Design",
                  "Mobile App Design",
                  "Business Landing Pages",
                  "Digital Business Solutions",
                  "Website Maintenance & Support",
                ].map((service, idx) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-500/50 flex-shrink-0" />
                    {service}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Closing Statement */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.5 }}
              className="border-l-4 border-gold-500 pl-6 py-6 mb-10"
            >
              <p className="font-serif text-xl font-light text-ivory italic">
                "Every brand deserves thoughtful design, compelling storytelling, and creative solutions that inspire confidence. My passion is helping businesses bring their vision to life through design that is both beautiful and purposeful."
              </p>
            </motion.blockquote>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.6 }}
              onClick={handleScroll}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink rounded-lg font-sans font-medium uppercase tracking-wider hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 transition-all duration-300"
            >
              Let's Create Together
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: MOTION.normal }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-20 border-t border-gold-500/20"
        >
          <AnimatedCounter end={10} label="Creative Services" />
          <AnimatedCounter end={10} label="Branding Projects" />
          <AnimatedCounter end={10} label="Content Campaigns" />
          <AnimatedCounter end={98} label="Client Satisfaction %" />
        </motion.div>
      </div>
    </section>
  );
}
