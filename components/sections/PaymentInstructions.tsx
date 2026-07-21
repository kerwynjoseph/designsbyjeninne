"use client";

import { motion } from "framer-motion";
import { useBooking } from "@/lib/booking-context";
import { MOTION } from "@/lib/motion";
import { Check, Upload } from "lucide-react";
import { useState } from "react";

const services = [
  "Content Videography",
  "Event Videography",
  "Wedding Videography",
  "BTS Videography",
  "Branding",
  "Website Design",
  "Social Media Content",
];

export function PaymentInstructions() {
  const { booking } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectDetails: "",
    selectedServices: [] as string[],
  });

  const bankingDetails = {
    bankName: "JMMB",
    accountNumber: "007400029464",
    accountHolder: "Jeninne Belfast",
    accountType: "Savings Account",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be under 10MB");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("projectDetails", formData.projectDetails);
      formDataToSend.append(
        "selectedServices",
        formData.selectedServices.join(", ")
      );
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
    } catch (error) {
      alert("Error submitting payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <p className="font-sans text-lg text-warmgray mb-8">
            Thank you for your submission! We've received your payment
            information and will review it within 24 hours.
          </p>
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
            Payment & Project Details
          </div>
          <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
            Complete Your Booking
          </h1>
          <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
            Fill out your project details, select your services, upload proof of
            payment, and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Booking Summary Section */}
      {booking.serviceName && (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-charcoal/50 border-y border-gold-500/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION.normal }}
              className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
            >
              <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 pb-6 border-b border-gold-500/20">
                <div className="flex justify-between font-sans">
                  <span className="text-warmgray">Service</span>
                  <span className="text-ivory font-medium">{booking.serviceName}</span>
                </div>
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
              <div className="pt-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-lg text-ivory">
                    Total Amount Due
                  </span>
                  <span className="font-serif text-3xl text-gold-500">
                    TT${booking.estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
                      required
                      className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      placeholder="Your name"
                    />
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
                      required
                      className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
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
                      required
                      className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
                      placeholder="+1 (868) 344-5101"
                    />
                  </div>
                </div>

                {/* Services Selection */}
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-ivory">
                    Select Services
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 p-4 border border-gold-500/30 rounded-lg cursor-pointer hover:bg-gold-500/5 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-5 h-5 rounded border-gold-500/50 bg-charcoal/40 accent-gold-500"
                        />
                        <span className="font-sans text-sm text-ivory">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-ivory">
                    Project Details
                  </h2>

                  <div>
                    <label className="block font-sans text-sm font-medium text-ivory mb-3">
                      Tell us about your project
                    </label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors resize-none"
                      placeholder="Describe your project, timeline, and any special requirements..."
                    />
                  </div>
                </div>

                {/* Payment Proof Upload */}
                <div className="space-y-6">
                  <h2 className="font-serif text-2xl text-ivory">
                    Payment Proof
                  </h2>

                  <div className="border-2 border-dashed border-gold-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-gold-500 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*,application/pdf"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                      <p className="font-sans text-sm text-ivory mb-1">
                        {uploadedFile
                          ? uploadedFile.name
                          : "Click to upload payment proof"}
                      </p>
                      <p className="font-sans text-xs text-warmgray/70">
                        PNG, JPG, or PDF (Max 10MB)
                      </p>
                    </label>
                  </div>
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
