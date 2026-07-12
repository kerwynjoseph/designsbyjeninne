"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { PricingPackage, PricingSection } from "@/lib/data/pricing";
import { MOTION } from "@/lib/motion";
import { useBooking } from "@/lib/booking-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PackageModalProps {
  service: PricingSection | null;
  package: PricingPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PackageModal({
  service,
  package: pkg,
  isOpen,
  onClose,
}: PackageModalProps) {
  const { setService, setPackage, toggleAddOn, booking } = useBooking();
  const router = useRouter();
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

  if (!service || !pkg) return null;

  const handleAddOnToggle = (addOnName: string, addOnPrice: number) => {
    const id = `${service.id}-${addOnName}`;
    setSelectedAddOns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    toggleAddOn(id, addOnName, addOnPrice);
  };

  const handleContinueToBooking = () => {
    setService(service.id, service.title);
    setPackage(pkg.tier, pkg.price);
    router.push("/booking");
    onClose();
  };

  const totalAddOns = Array.from(selectedAddOns).reduce((sum, id) => {
    const addOnName = service.addOns.find(
      (ao) => `${service.id}-${ao.name}` === id
    )?.name;
    const addOnPrice = service.addOns.find(
      (ao) => `${service.id}-${ao.name}` === id
    )?.price;
    return sum + (addOnPrice || 0);
  }, 0);

  const estimatedTotal = pkg.price + totalAddOns;

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
                {/* Header */}
                <div className="mb-8">
                  <p className="font-sans text-sm text-gold-500 uppercase tracking-wider mb-2">
                    {service.title}
                  </p>
                  <h2 className="font-serif text-4xl font-light text-ivory mb-4">
                    {pkg.tier.charAt(0).toUpperCase() + pkg.tier.slice(1)}{" "}
                    Package
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
                </div>

                {/* Package Description */}
                <div className="mb-8 p-6 bg-gold-500/5 border border-gold-500/20 rounded-lg">
                  <p className="font-sans text-lg text-ivory font-semibold">
                    {pkg.currency}
                    {pkg.price.toLocaleString()}
                  </p>
                  <p className="font-sans text-sm text-warmgray mt-2">
                    {pkg.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-10">
                  <h3 className="font-serif text-xl font-light text-ivory mb-4">
                    Included Features
                  </h3>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 font-sans text-warmgray">
                        <Check className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div className="mb-10">
                  <h3 className="font-serif text-xl font-light text-ivory mb-4">
                    Best For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pkg.bestFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full font-sans text-xs text-ivory"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add-Ons */}
                {service.addOns.length > 0 && (
                  <div className="mb-10">
                    <h3 className="font-serif text-xl font-light text-ivory mb-4">
                      Optional Add-Ons
                    </h3>
                    <div className="space-y-2">
                      {service.addOns.map((addOn, idx) => {
                        const isSelected = selectedAddOns.has(
                          `${service.id}-${addOn.name}`
                        );
                        return (
                          <button
                            key={idx}
                            onClick={() =>
                              handleAddOnToggle(addOn.name, addOn.price)
                            }
                            className={`w-full p-4 flex items-center justify-between rounded-lg border transition-all ${
                              isSelected
                                ? "bg-gold-500/20 border-gold-500 text-ivory"
                                : "bg-charcoal/50 border-gold-500/20 text-warmgray hover:border-gold-500/50"
                            }`}
                          >
                            <span className="font-sans text-sm font-medium">
                              {addOn.name}
                            </span>
                            <span className="font-sans text-sm font-semibold text-gold-300">
                              +{addOn.currency}
                              {addOn.price.toLocaleString()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Total Estimate */}
                <div className="mb-8 p-6 bg-charcoal/50 border border-gold-500/30 rounded-lg">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-sans text-sm text-warmgray">
                      Package Price
                    </span>
                    <span className="font-sans text-lg text-ivory">
                      {service.id === "wedding-videography"
                        ? "TT$"
                        : pkg.currency}
                      {pkg.price.toLocaleString()}
                    </span>
                  </div>
                  {totalAddOns > 0 && (
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-sans text-sm text-warmgray">
                        Add-Ons
                      </span>
                      <span className="font-sans text-lg text-gold-300">
                        +TT${totalAddOns.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gold-500/20 pt-2 flex justify-between items-baseline">
                    <span className="font-serif text-lg text-ivory">
                      Estimated Total
                    </span>
                    <span className="font-serif text-2xl font-light text-gold-500">
                      TT${estimatedTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleContinueToBooking}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink rounded-lg font-sans font-medium text-sm uppercase tracking-wider hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 transition-all duration-300"
                  >
                    Continue to Booking
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
