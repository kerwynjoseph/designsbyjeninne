"use client";

import { motion, MotionConfig } from "framer-motion";
import { Service } from "@/types";
import { GoldButton } from "../shared/GoldButton";
import { MOTION } from "@/lib/motion";
import {
  Palette,
  Film,
  Share2,
  Globe,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { servicesDetailed } from "@/lib/data/services-detailed";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const iconMap = {
  Palette,
  Film,
  Share2,
  Globe,
  Smartphone,
  Sparkles,
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const IconComponent =
    iconMap[service.icon as keyof typeof iconMap] || Sparkles;

  // Map home services to detailed services
  const serviceMap: Record<string, typeof servicesDetailed[0] | undefined> = {
    "Graphic Design": servicesDetailed.find((s) => s.id === "website-design"), // Using Website Design as placeholder since Graphic Design isn't in pricing
    "Videography": servicesDetailed.find((s) => s.id === "content-videography"),
    "Social Media Management": servicesDetailed.find((s) => s.id === "social-media"),
    "Website Design": servicesDetailed.find((s) => s.id === "website-design"),
    "App Design": servicesDetailed.find((s) => s.id === "branding"), // Using Branding as placeholder since App Design isn't in pricing
  };

  const detailedService = serviceMap[service.title];

  const handleLearnMore = () => {
    if (detailedService) {
      setIsModalOpen(true);
    }
  };

  const handleWaitlistSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: waitlistEmail,
          service: service.id,
        }),
      });
      setWaitlistSubmitted(true);
      setWaitlistEmail("");
      setTimeout(() => setWaitlistSubmitted(false), 3000);
    } catch (error) {
      console.error("Waitlist signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isActive = service.variant === "active";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: MOTION.normal,
        delay: index * 0.05,
      }}
    >
      <MotionConfig transition={{ type: "spring", damping: 20, stiffness: 300 }}>
        <motion.div
          className={cn(
            "relative group rounded-lg p-8 md:p-12 h-full overflow-hidden transition-all duration-300",
            isActive
              ? "bg-charcoal border border-charcoal hover:border-gold-500"
              : "bg-charcoal/30 backdrop-blur-md border border-gold-500/50 hover:border-gold-500"
          )}
          whileHover={{ y: isActive ? -8 : -4 }}
          data-cursor="hover"
        >
          {/* Animated gold glow effect on hover */}
          <motion.div
            className={cn(
              "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              "pointer-events-none",
              isActive && "bg-gold-900/5"
            )}
            style={{
              background: isActive
                ? "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)"
                : "none",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <IconComponent className="w-10 h-10 text-gold-500" />
            </motion.div>

            {/* Coming Soon Badge */}
            {!isActive && (
              <motion.div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-gold-500 rounded-full"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span className="text-xs font-sans font-medium text-gold-500 uppercase tracking-wide">
                  Coming Soon
                </span>
              </motion.div>
            )}

            {/* Title */}
            <h3 className="font-serif text-3xl md:text-4xl font-light text-ivory mb-4">
              {service.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-sm md:text-base text-warmgray leading-relaxed mb-8">
              {service.description}
            </p>

            {/* CTA */}
            <div className="mt-auto">
              {isActive ? (
                <GoldButton
                  variant="outline"
                  onClick={handleLearnMore}
                  className="w-full text-center"
                >
                  Learn More
                </GoldButton>
              ) : (
                <>
                  {waitlistSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-sans text-gold-500 text-center py-3"
                    >
                      ✓ You're on the list!
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleWaitlistSubmit}
                      className="flex gap-2"
                    >
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="flex-1 px-4 py-2 text-sm bg-ink border border-gold-500/30 rounded-sm text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-gold-500/10 border border-gold-500 rounded-sm text-gold-500 text-sm font-medium hover:bg-gold-500 hover:text-ink transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? "..." : "Notify"}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </MotionConfig>

      {/* Service Detail Modal */}
      {detailedService && (
        <ServiceDetailModal
          service={detailedService}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </motion.div>
  );
}
