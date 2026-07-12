"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { ServiceDetail } from "@/lib/data/services-detailed";
import { MOTION } from "@/lib/motion";
import { useRouter } from "next/navigation";

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceDetailModal({
  service,
  isOpen,
  onClose,
}: ServiceDetailModalProps) {
  const router = useRouter();

  if (!service) return null;

  const handleSelectService = () => {
    router.push(`/pricing?service=${service.id}`);
    onClose();
  };

  // Prevent body scroll when modal is open
  if (isOpen && typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
  } else if (typeof document !== "undefined") {
    document.body.style.overflow = "unset";
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center pt-20 pb-4 px-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: MOTION.normal }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl lg:max-w-2xl max-h-[90vh] bg-charcoal rounded-lg border border-gold-500/30 backdrop-blur-sm flex flex-col"
          >
            {/* Close Button - Sticky */}
            <button
              onClick={onClose}
              className="sticky top-0 right-6 ml-auto p-4 text-warmgray hover:text-gold-500 transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 scroll-smooth">
              <div className="p-10 md:p-14 pb-20 space-y-8">
                {/* Service Icon and Title */}
                <div className="mb-8">
                  <h2 className="font-serif text-5xl font-light text-ivory mb-3">
                    {service.name}
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
                </div>

                {/* Overview */}
                <div className="mb-8">
                  <p className="font-sans text-lg text-warmgray leading-relaxed">
                    {service.overview}
                  </p>
                </div>

                {/* What's Included */}
                <div className="mb-10">
                  <h3 className="font-serif text-2xl font-light text-ivory mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {service.whatIncluded.map((item, idx) => (
                      <li key={idx} className="flex gap-3 font-sans text-warmgray">
                        <Check className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div className="mb-10">
                  <h3 className="font-serif text-2xl font-light text-ivory mb-4">
                    Best For
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.bestFor.map((item, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 bg-gold-500/10 border border-gold-500/20 rounded-lg font-sans text-sm text-ivory"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Steps */}
                <div className="mb-10">
                  <h3 className="font-serif text-2xl font-light text-ivory mb-4">
                    Our Process
                  </h3>
                  <ol className="space-y-2">
                    {service.processSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-4 font-sans text-warmgray">
                        <span className="text-gold-500 font-serif text-lg flex-shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* CTA Button */}
                <div className="flex gap-3 mt-12">
                  <button
                    onClick={handleSelectService}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink rounded-lg font-sans font-medium text-sm uppercase tracking-wider hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 transition-all duration-300"
                  >
                    Select This Service
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gold-500/50 text-gold-300 rounded-lg font-sans font-medium text-sm uppercase tracking-wider hover:bg-gold-500/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
                </div>
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
