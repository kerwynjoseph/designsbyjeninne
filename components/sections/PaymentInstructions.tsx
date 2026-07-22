"use client";

import { motion } from "framer-motion";
import { useBooking } from "@/lib/booking-context";
import { MOTION } from "@/lib/motion";
import { Check, Upload } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.pdf";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const paymentMethods = ["Bank Transfer", "WhatsApp Arrangement"];

function formatTime(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  if (isNaN(hour)) return time;
  const isAM = hour < 12;
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${isAM ? "AM" : "PM"}`;
}

function formatDate(date: string): string {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

export function PaymentInstructions() {
  const { booking } = useBooking();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const bankingDetails = {
    bankName: "JMMB",
    accountNumber: "007400029464",
    accountHolder: "Jeninne Belfast",
    accountType: "Savings Account",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setFileError("Only JPG, JPEG, PNG, or PDF files are accepted.");
      setUploadedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be under 10MB.");
      setUploadedFile(null);
      return;
    }

    setFileError("");
    setUploadedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) fieldErrors.fullName = "Full name is required";
    if (!formData.email.trim()) fieldErrors.email = "Email is required";
    if (!formData.phone.trim()) fieldErrors.phone = "Phone is required";
    if (!formData.paymentMethod) fieldErrors.paymentMethod = "Please select a payment method";
    if (!uploadedFile) fieldErrors.paymentProof = "Payment receipt upload is required";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("paymentMethod", formData.paymentMethod);
      formDataToSend.append("bookingReference", booking.bookingReference);

      formDataToSend.append("serviceName", booking.serviceName);
      if (booking.packageTier) formDataToSend.append("packageTier", booking.packageTier);
      if (booking.packagePrice) formDataToSend.append("packagePrice", booking.packagePrice.toString());
      if (booking.selectedAddOns.length > 0) {
        formDataToSend.append("selectedAddOns", JSON.stringify(booking.selectedAddOns));
      }
      formDataToSend.append("projectDetails", booking.projectDetails);
      formDataToSend.append("clientNotes", booking.clientNotes);
      formDataToSend.append("preferredDate", booking.preferredDate);
      formDataToSend.append("preferredTime", booking.preferredTime);
      formDataToSend.append("isCustomTime", booking.isCustomTime ? "true" : "false");
      formDataToSend.append("customTimeNote", booking.customTimeNote);

      if (booking.primaryLocation) {
        formDataToSend.append("primaryLocation", JSON.stringify(booking.primaryLocation));
      }
      formDataToSend.append("primaryTravelFee", booking.primaryTravelFee.toString());
      if (booking.additionalLocations.length > 0) {
        formDataToSend.append("additionalLocations", JSON.stringify(booking.additionalLocations));
      }

      formDataToSend.append("estimatedTotal", booking.estimatedTotal.toString());

      if (uploadedFile) {
        formDataToSend.append("paymentProof", uploadedFile);
      }

      const response = await fetch("/api/payment", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Error submitting payment. Please try again.");
      }
    } catch {
      alert("Error submitting payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!booking.serviceName && !submitted) {
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

  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-600/20 border border-green-500 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-400" />
            </div>
          </div>
          <h1 className="font-serif text-6xl md:text-7xl font-light text-ivory mb-6">
            Payment Submitted
          </h1>
          <p className="font-sans text-lg text-warmgray mb-4">
            Thank you for your submission! We&apos;ve received your payment
            information and will review it within 24 hours.
          </p>
          {booking.bookingReference && (
            <p className="font-sans text-sm text-gold-300 mb-8">
              Booking Reference: <strong>{booking.bookingReference}</strong>
            </p>
          )}
          <p className="font-sans text-sm text-warmgray/70">
            A confirmation email has been sent to <strong>{formData.email}</strong>
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <main className="w-full bg-ink">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
            Final Step
          </div>
          <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
            Complete Your Booking
          </h1>
          <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
            Review your booking below, upload proof of payment, and submit. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Read-Only Booking Summary */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-charcoal/50 border-y border-gold-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: MOTION.normal }}
            className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-light text-ivory">
                Booking Summary
              </h2>
              <button
                onClick={() => router.push("/booking")}
                className="font-sans text-xs text-gold-300 uppercase tracking-wider hover:text-gold-500 transition-colors"
              >
                Edit Selection
              </button>
            </div>

            {booking.bookingReference && (
              <p className="font-sans text-xs text-warmgray/60 mb-6">
                Ref: {booking.bookingReference}
              </p>
            )}

            <div className="space-y-4 pb-6 border-b border-gold-500/20">
              <div className="flex justify-between font-sans">
                <span className="text-warmgray">Service</span>
                <span className="text-ivory font-medium">{booking.serviceName}</span>
              </div>
              {booking.packageTier && booking.packagePrice && (
                <div className="flex justify-between font-sans">
                  <span className="text-warmgray">
                    {booking.packageTier.charAt(0).toUpperCase() + booking.packageTier.slice(1)} Package
                  </span>
                  <span className="text-ivory font-medium">
                    TT${booking.packagePrice.toLocaleString()}
                  </span>
                </div>
              )}
              {booking.selectedAddOns.map((addOn) => (
                <div key={addOn.id} className="flex justify-between font-sans text-sm">
                  <span className="text-warmgray">{addOn.name}</span>
                  <span className="text-gold-300">+TT${addOn.price.toLocaleString()}</span>
                </div>
              ))}
              {booking.preferredDate && (
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-warmgray">Date</span>
                  <span className="text-ivory">{formatDate(booking.preferredDate)}</span>
                </div>
              )}
              {booking.preferredTime && (
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-warmgray">Time</span>
                  <span className="text-ivory">
                    {booking.isCustomTime
                      ? `${booking.customTimeNote} (pending approval)`
                      : formatTime(booking.preferredTime)}
                  </span>
                </div>
              )}
              {booking.primaryLocation && (
                <div className="flex justify-between font-sans text-sm gap-4">
                  <span className="text-warmgray flex-shrink-0">Location</span>
                  <span className="text-ivory text-right">{booking.primaryLocation.address}</span>
                </div>
              )}
              {booking.primaryTravelFee > 0 && (
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-warmgray">Travel Fee</span>
                  <span className="text-gold-300">+TT${booking.primaryTravelFee.toLocaleString()}</span>
                </div>
              )}
              {booking.additionalLocations.map((loc, idx) => (
                <div key={loc.id} className="contents">
                  <div className="flex justify-between font-sans text-sm gap-4">
                    <span className="text-warmgray flex-shrink-0">Additional Location {idx + 1}</span>
                    <span className="text-gold-300 text-right">+TT${loc.fee.toLocaleString()}</span>
                  </div>
                  {loc.travelFee > 0 && (
                    <div className="flex justify-between font-sans text-sm gap-4">
                      <span className="text-warmgray flex-shrink-0">Travel Fee (Location {idx + 1})</span>
                      <span className="text-gold-300 text-right">+TT${loc.travelFee.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              ))}
              {booking.projectDetails && (
                <div className="pt-2">
                  <p className="text-warmgray text-xs uppercase tracking-wider mb-1">Project Details</p>
                  <p className="text-ivory text-sm whitespace-pre-wrap">{booking.projectDetails}</p>
                </div>
              )}
              {booking.clientNotes && (
                <div className="pt-2">
                  <p className="text-warmgray text-xs uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-ivory text-sm whitespace-pre-wrap">{booking.clientNotes}</p>
                </div>
              )}
            </div>

            <div className="pt-6">
              <div className="flex justify-between items-baseline">
                <span className="font-serif text-lg text-ivory">Total Amount Due</span>
                <span className="font-serif text-3xl text-gold-500">
                  TT${booking.estimatedTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-ivory">
                    Your Information
                  </h2>

                  <div>
                    <label className="block font-sans text-sm font-medium text-ivory mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      placeholder="Your name"
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-2">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-medium text-ivory mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block font-sans text-sm font-medium text-ivory mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      placeholder="+1 (868) 344-5101"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-2">{errors.phone}</p>}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-ivory">
                    Payment Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <label
                        key={method}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === method
                            ? "bg-gold-500/20 border-gold-500"
                            : "border-gold-500/30 hover:bg-gold-500/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === method}
                          onChange={() =>
                            setFormData((prev) => ({ ...prev, paymentMethod: method }))
                          }
                          className="w-5 h-5 accent-gold-500"
                        />
                        <span className="font-sans text-sm text-ivory">{method}</span>
                      </label>
                    ))}
                  </div>
                  {errors.paymentMethod && <p className="text-red-400 text-xs mt-2">{errors.paymentMethod}</p>}
                </div>

                {/* Payment Proof Upload */}
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-ivory">
                    Payment Receipt
                  </h2>

                  <div className="border-2 border-dashed border-gold-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-gold-500 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept={ACCEPTED_EXTENSIONS}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                      <p className="font-sans text-sm text-ivory mb-1">
                        {uploadedFile
                          ? uploadedFile.name
                          : "Click to upload payment receipt"}
                      </p>
                      <p className="font-sans text-xs text-warmgray/70">
                        JPG, JPEG, PNG, or PDF (Max 10MB)
                      </p>
                    </label>
                  </div>
                  {fileError && <p className="text-red-400 text-xs">{fileError}</p>}
                  {errors.paymentProof && <p className="text-red-400 text-xs">{errors.paymentProof}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-8 bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 disabled:opacity-50 font-sans font-medium uppercase tracking-wider rounded-lg transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit Payment"}
                </motion.button>
              </form>
            </motion.div>

            {/* Right: Banking Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="p-8 bg-charcoal/50 border border-gold-500/30 rounded-lg">
                <h3 className="font-serif text-2xl text-ivory mb-6">
                  Banking Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="font-sans text-xs text-warmgray/70 uppercase tracking-wider mb-2">
                      Bank Name
                    </p>
                    <p className="font-sans text-sm text-ivory">
                      {bankingDetails.bankName}
                    </p>
                  </div>

                  <div>
                    <p className="font-sans text-xs text-warmgray/70 uppercase tracking-wider mb-2">
                      Account Holder
                    </p>
                    <p className="font-sans text-sm text-ivory">
                      {bankingDetails.accountHolder}
                    </p>
                  </div>

                  <div>
                    <p className="font-sans text-xs text-warmgray/70 uppercase tracking-wider mb-2">
                      Account Number
                    </p>
                    <p className="font-sans text-sm text-ivory font-mono">
                      {bankingDetails.accountNumber}
                    </p>
                  </div>

                  <div>
                    <p className="font-sans text-xs text-warmgray/70 uppercase tracking-wider mb-2">
                      Account Type
                    </p>
                    <p className="font-sans text-sm text-ivory">
                      {bankingDetails.accountType}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gold-500/20">
                  <p className="font-sans text-xs text-warmgray/70">
                    Please use your project name or your name as the transfer
                    reference so we can match it with your submission.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
