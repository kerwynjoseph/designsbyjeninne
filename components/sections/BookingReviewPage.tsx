"use client";

import { useBooking } from "@/lib/booking-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { pricingSections } from "@/lib/data/pricing";
import { SCHEDULING_EXEMPT_SERVICE_IDS } from "@/lib/data/location-config";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/shared/Calendar";
import { TimePicker, CUSTOM_TIME_VALUE } from "@/components/shared/TimePicker";
import { LocationAutocomplete, SelectedLocation } from "@/components/shared/LocationAutocomplete";

export function BookingReviewPage() {
  const {
    booking,
    toggleAddOn,
    setSchedule,
    setPrimaryLocation,
    setHasMultipleLocations,
    addAdditionalLocation,
    removeAdditionalLocation,
    setProjectDetails,
    setClientNotes,
  } = useBooking();
  const router = useRouter();
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(
    new Set(booking.selectedAddOns.map((ao) => ao.id))
  );
  const [newLocation, setNewLocation] = useState<SelectedLocation | null>(null);
  const [formError, setFormError] = useState("");

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
    (p) => p.tier === booking.packageTier
  );
  const requiresScheduling = !SCHEDULING_EXEMPT_SERVICE_IDS.includes(booking.serviceId);

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

  const handleAddLocation = () => {
    if (!newLocation || newLocation.lat == null) return;
    addAdditionalLocation(newLocation);
    setNewLocation(null);
  };

  const handleContinueToPayment = () => {
    if (requiresScheduling) {
      if (!booking.preferredDate) {
        setFormError("Please select a project date.");
        return;
      }
      if (!booking.preferredTime) {
        setFormError("Please select a project time.");
        return;
      }
      if (booking.isCustomTime && !booking.customTimeNote.trim()) {
        setFormError("Please describe your requested custom time.");
        return;
      }
      if (!booking.primaryLocation) {
        setFormError("Please select a primary location.");
        return;
      }
    }
    setFormError("");
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

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.15 }}
              className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
            >
              <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                Project Details
              </h2>
              <textarea
                value={booking.projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                rows={5}
                placeholder="Tell us about your project, vision, and any specific requirements..."
                className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors resize-none"
              />
            </motion.div>

            {/* Schedule */}
            {requiresScheduling && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.2 }}
                className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30 space-y-8"
              >
                <div>
                  <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                    Project Date
                  </h2>
                  <Calendar
                    selectedDate={booking.preferredDate}
                    onDateChange={(date) =>
                      setSchedule(date, booking.preferredTime, booking.isCustomTime, booking.customTimeNote)
                    }
                  />
                </div>

                <div>
                  <TimePicker
                    selectedTime={booking.preferredTime}
                    onTimeChange={(time) =>
                      setSchedule(
                        booking.preferredDate,
                        time,
                        time === CUSTOM_TIME_VALUE,
                        booking.customTimeNote
                      )
                    }
                    allowCustom
                  />
                  {booking.preferredTime === CUSTOM_TIME_VALUE && (
                    <div className="mt-4">
                      <label className="block font-sans text-sm font-medium text-ivory mb-3">
                        Requested Custom Time
                      </label>
                      <input
                        type="text"
                        value={booking.customTimeNote}
                        onChange={(e) =>
                          setSchedule(
                            booking.preferredDate,
                            booking.preferredTime,
                            true,
                            e.target.value
                          )
                        }
                        placeholder="e.g. 7:00 PM"
                        className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      />
                      <p className="font-sans text-xs text-warmgray/70 mt-2">
                        Times outside 9:00 AM–6:00 PM are subject to approval. We&apos;ll confirm availability with you directly.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Location */}
            {requiresScheduling && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.25 }}
                className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30 space-y-8"
              >
                <div>
                  <h2 className="font-serif text-2xl font-light text-ivory mb-2">
                    Location
                  </h2>
                  <p className="font-sans text-xs text-warmgray/70 mb-6">
                    Locations outside Central Trinidad incur a travel fee, shown automatically once selected.
                  </p>
                  <LocationAutocomplete
                    label="Primary Location"
                    value={booking.primaryLocation}
                    onChange={setPrimaryLocation}
                  />
                  {booking.primaryLocation && booking.primaryTravelFee > 0 && (
                    <p className="font-sans text-xs text-gold-300 mt-2">
                      Travel fee applies: +TT${booking.primaryTravelFee.toLocaleString()}
                    </p>
                  )}
                </div>

                <div>
                  <p className="block font-sans text-sm font-medium text-ivory mb-3">
                    Will this project require multiple locations?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setHasMultipleLocations(false)}
                      className={`px-6 py-2 rounded-lg font-sans text-sm font-medium border transition-all ${
                        !booking.hasMultipleLocations
                          ? "bg-gold-500 text-ink border-gold-500"
                          : "bg-charcoal/40 text-warmgray border-gold-500/30 hover:border-gold-500/50"
                      }`}
                    >
                      No
                    </button>
                    <button
                      onClick={() => setHasMultipleLocations(true)}
                      className={`px-6 py-2 rounded-lg font-sans text-sm font-medium border transition-all ${
                        booking.hasMultipleLocations
                          ? "bg-gold-500 text-ink border-gold-500"
                          : "bg-charcoal/40 text-warmgray border-gold-500/30 hover:border-gold-500/50"
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {booking.hasMultipleLocations && (
                  <div className="space-y-4">
                    {booking.additionalLocations.map((loc, idx) => (
                      <div
                        key={loc.id}
                        className="p-4 bg-charcoal/40 border border-gold-500/20 rounded-lg flex items-start justify-between gap-3"
                      >
                        <div>
                          <p className="font-sans text-xs text-gold-500 uppercase tracking-wider mb-1">
                            Additional Location {idx + 1}
                          </p>
                          <p className="font-sans text-sm text-ivory">{loc.address}</p>
                          <p className="font-sans text-xs text-warmgray mt-1">
                            +TT${loc.fee.toLocaleString()} location fee
                            {loc.travelFee > 0 && ` · +TT$${loc.travelFee.toLocaleString()} travel fee`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeAdditionalLocation(loc.id)}
                          className="text-warmgray hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                      <div className="flex-1 w-full">
                        <LocationAutocomplete
                          label="Add Another Location"
                          value={newLocation}
                          onChange={setNewLocation}
                        />
                      </div>
                      <button
                        onClick={handleAddLocation}
                        disabled={!newLocation || newLocation.lat == null}
                        className="px-6 py-3 bg-gold-500/20 border border-gold-500 text-gold-300 rounded-lg font-sans text-sm font-medium hover:bg-gold-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        Add Location
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Client Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal, delay: 0.3 }}
              className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
            >
              <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                Additional Notes
              </h2>
              <textarea
                value={booking.clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                rows={3}
                placeholder="Anything else we should know? (optional)"
                className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors resize-none"
              />
            </motion.div>
          </div>

          {/* Right: Summary & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal, delay: 0.2 }}
            className="sticky top-24 p-8 bg-charcoal/50 rounded-lg border border-gold-500/30 h-fit"
          >
            <h3 className="font-serif text-2xl font-light text-ivory mb-2">
              Order Summary
            </h3>
            {booking.bookingReference && (
              <p className="font-sans text-xs text-warmgray/60 mb-6">
                Ref: {booking.bookingReference}
              </p>
            )}

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

              {booking.selectedAddOns.map((addOn) => (
                <div key={addOn.id} className="flex justify-between font-sans text-sm">
                  <span className="text-warmgray">{addOn.name}</span>
                  <span className="text-gold-300">
                    +TT${addOn.price.toLocaleString()}
                  </span>
                </div>
              ))}

              {booking.primaryTravelFee > 0 && (
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-warmgray">Travel Fee</span>
                  <span className="text-gold-300">
                    +TT${booking.primaryTravelFee.toLocaleString()}
                  </span>
                </div>
              )}

              {booking.additionalLocations.map((loc, idx) => (
                <div key={loc.id} className="contents">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-warmgray">Additional Location {idx + 1}</span>
                    <span className="text-gold-300">+TT${loc.fee.toLocaleString()}</span>
                  </div>
                  {loc.travelFee > 0 && (
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-warmgray">Travel Fee (Location {idx + 1})</span>
                      <span className="text-gold-300">+TT${loc.travelFee.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              ))}
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

            {formError && (
              <p className="text-red-400 text-xs mb-4 text-center">{formError}</p>
            )}

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
