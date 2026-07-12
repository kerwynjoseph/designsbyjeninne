"use client";

import { useBooking } from "@/lib/booking-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { pricingSections } from "@/lib/data/pricing";
import { Check } from "lucide-react";
import { useState } from "react";

export function BookingReviewPage() {
  const { booking, toggleAddOn } = useBooking();
  const router = useRouter();
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(
    new Set(booking.selectedAddOns.map((ao) => ao.id))
  );

  if (!booking.serviceName) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-serif text-2xl text-ivory mb-4">
            No booking selected
          </p>
          <button
            onClick={() => router.push("/pricing")}
            className="px-6 py-3 bg-gold-500 text-ink rounded-lg font-sans font-medium"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  const service = pricingSections.find((s) => s.id === booking.serviceId);
  const currentPackage = service?.packages.find(
    (p: any) => p.tier === booking.packageTier
  );

  const handleAddOnToggle = (addOnId: string, addOnName: string, addOnPrice: number) => {
    const newSet = new Set(selectedAddOns);
    if (newSet.has(addOnId)) {
      newSet.delete(addOnId);
    } else {
      newSet.add(addOnId);
    }
    setSelectedAddOns(newSet);
    toggleAddOn(addOnId, addOnName, addOnPrice);
  };

  const handleContinueToPayment = () => {
    router.push("/payment");
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Left: Booking Review */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service & Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal }}
              className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
            >
              <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                Your Selection
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-gold-500/20">
                  <span className="font-sans text-warmgray">Service</span>
                  <span className="font-sans text-ivory font-medium">
                    {booking.serviceName}
                  </span>
                </div>
                {booking.packageTier && currentPackage && (
                  <div className="flex justify-between pb-4 border-b border-gold-500/20">
                    <span className="font-sans text-warmgray">Package</span>
                    <span className="font-sans text-ivory font-medium capitalize">
                      {booking.packageTier} - TT${booking.packagePrice?.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Add-Ons Selection */}
            {service && service.addOns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.1 }}
                className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
              >
                <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                  Optional Add-Ons
                </h2>
                <div className="space-y-3">
                  {service.addOns.map((addOn) => {
                    const isSelected = selectedAddOns.has(addOn.name);
                    return (
                      <button
                        key={addOn.name}
                        onClick={() =>
                          handleAddOnToggle(
                            addOn.name,
                            addOn.name,
                            addOn.price
                          )
                        }
                        className={`w-full p-4 flex items-center justify-between rounded-lg border transition-all ${
                          isSelected
                            ? "bg-gold-500/20 border-gold-500 text-ivory"
                            : "bg-charcoal/50 border-gold-500/20 text-warmgray hover:border-gold-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center ${
                              isSelected
                                ? "bg-gold-500 border-gold-500"
                                : "border-gold-500/30"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3 h-3 text-ink" />
                            )}
                          </div>
                          <span className="font-sans font-medium">
                            {addOn.name}
                          </span>
                        </div>
                        <span className="font-sans font-semibold text-gold-300">
                          +TT${addOn.price.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Summary & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal, delay: 0.2 }}
            className="sticky top-24 p-8 bg-charcoal/50 rounded-lg border border-gold-500/30 h-fit"
          >
            <h3 className="font-serif text-2xl font-light text-ivory mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 pb-6 border-b border-gold-500/20">
              {booking.packageTier && booking.packagePrice && (
                <div className="flex justify-between font-sans">
                  <span className="text-warmgray">
                    {booking.packageTier.charAt(0).toUpperCase() +
                      booking.packageTier.slice(1)}{" "}
                    Package
                  </span>
                  <span className="text-ivory font-medium">
                    TT${booking.packagePrice.toLocaleString()}
                  </span>
                </div>
              )}

              {booking.selectedAddOns.length > 0 && (
                <>
                  {booking.selectedAddOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className="flex justify-between font-sans text-sm"
                    >
                      <span className="text-warmgray">{addOn.name}</span>
                      <span className="text-gold-300">
                        +TT${addOn.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="pt-6 mb-8">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-serif text-lg text-ivory">
                  Estimated Total
                </span>
                <span className="font-serif text-3xl text-gold-500">
                  TT${booking.estimatedTotal.toLocaleString()}
                </span>
              </div>
              <p className="font-sans text-xs text-warmgray/60">
                Payment options available after checkout
              </p>
            </div>

            <button
              onClick={handleContinueToPayment}
              className="w-full py-3 px-6 bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink rounded-lg font-sans font-medium text-sm uppercase tracking-wider hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 transition-all duration-300"
            >
              Continue to Payment
            </button>

            <button
              onClick={() => router.back()}
              className="w-full mt-3 py-3 px-6 border border-gold-500/50 text-gold-300 rounded-lg font-sans font-medium text-sm uppercase tracking-wider hover:bg-gold-500/10 transition-colors"
            >
              Back
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
