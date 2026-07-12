"use client";

import { motion } from "framer-motion";
import { useBooking } from "@/lib/booking-context";
import { MOTION } from "@/lib/motion";
import { Check, Copy, MessageCircle, Upload } from "lucide-react";
import { useState } from "react";

export function PaymentInstructions() {
  const { booking } = useBooking();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const bankingDetails = {
    accountHolder: "Designs by Jeninne",
    bankName: "First Citizens Bank",
    accountNumber: "4105 234 567",
    routingNumber: "011111111",
    currency: "TT$",
  };

  const paymentMethods = [
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      description: "Direct deposit to our account",
      icon: "💳",
    },
    {
      id: "payment-plan",
      name: "Payment Plan",
      description: "50% deposit, balance before delivery",
      icon: "📅",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Inquiry",
      description: "Discuss payment options directly",
      icon: "💬",
    },
  ];

  const handleCopyAccount = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadMessage("File size must be under 10MB");
        return;
      }
      setUploadedFile(file);
      setUploadMessage(
        "✓ Proof of payment uploaded. We'll verify and confirm within 24 hours."
      );
    }
  };

  const handleWhatsApp = () => {
    const phone = "18683445101";
    const message = `Hi Jeninne, I'd like to discuss payment options for my ${booking.serviceName || "service"} booking.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <main className="w-full bg-ink">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
            Payment Instructions
          </div>
          <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
            Complete Your Booking
          </h1>
          <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
            Choose your preferred payment method and upload proof of payment to
            confirm your booking.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            {/* Left: Booking Summary & Banking Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Booking Summary Card */}
              {booking.serviceName && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: MOTION.normal }}
                  className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
                >
                  <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                    Booking Details
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-4 border-b border-gold-500/20">
                      <span className="font-sans text-warmgray">Service</span>
                      <span className="font-sans text-ivory font-medium">
                        {booking.serviceName}
                      </span>
                    </div>
                    {booking.packageTier && (
                      <div className="flex justify-between pb-4 border-b border-gold-500/20">
                        <span className="font-sans text-warmgray">Package</span>
                        <span className="font-sans text-ivory font-medium capitalize">
                          {booking.packageTier}
                        </span>
                      </div>
                    )}
                    {booking.selectedAddOns.length > 0 && (
                      <div className="pb-4 border-b border-gold-500/20">
                        <span className="font-sans text-warmgray block mb-3">
                          Add-Ons
                        </span>
                        {booking.selectedAddOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex justify-between font-sans text-sm text-warmgray mb-2"
                          >
                            <span>{addOn.name}</span>
                            <span>TT${addOn.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between pt-4">
                      <span className="font-serif text-lg text-ivory">
                        Amount Due
                      </span>
                      <span className="font-serif text-3xl text-gold-500">
                        TT${booking.estimatedTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Banking Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.1 }}
                className="p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
              >
                <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                  Bank Transfer Details
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "Account Holder", value: bankingDetails.accountHolder },
                    { label: "Bank Name", value: bankingDetails.bankName },
                    { label: "Account Number", value: bankingDetails.accountNumber },
                    { label: "Routing Number", value: bankingDetails.routingNumber },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between pb-4 border-b border-gold-500/20"
                    >
                      <div>
                        <p className="font-sans text-xs text-warmgray/70 uppercase tracking-wider">
                          {label}
                        </p>
                        <p className="font-sans text-ivory font-medium mt-1">
                          {value}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopyAccount(value, label)}
                        className="p-2 hover:bg-gold-500/20 rounded-lg transition-colors"
                      >
                        {copied === label ? (
                          <Check className="w-5 h-5 text-gold-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-warmgray hover:text-gold-300" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-xs text-warmgray/70 mt-6">
                  💡 Please include your name and service type in the transfer
                  reference.
                </p>
              </motion.div>

              {/* Payment Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.2 }}
              >
                <h2 className="font-serif text-2xl font-light text-ivory mb-6">
                  Payment Options
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="p-6 bg-charcoal/50 rounded-lg border border-gold-500/20 hover:border-gold-500 hover:bg-charcoal/80 transition-all duration-300"
                    >
                      <div className="text-3xl mb-3">{method.icon}</div>
                      <h3 className="font-serif text-lg font-light text-ivory mb-2">
                        {method.name}
                      </h3>
                      <p className="font-sans text-sm text-warmgray">
                        {method.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: File Upload & WhatsApp */}
            <div className="space-y-8">
              {/* Proof of Payment Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.1 }}
                className="sticky top-24 p-8 bg-charcoal/50 rounded-lg border border-gold-500/30"
              >
                <h3 className="font-serif text-xl font-light text-ivory mb-6">
                  Upload Proof of Payment
                </h3>

                <div className="mb-6">
                  <label className="flex items-center justify-center w-full h-32 px-4 transition bg-charcoal/40 border-2 border-dashed border-gold-500/50 rounded-lg appearance-none cursor-pointer hover:border-gold-500 focus:outline-none">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gold-300 mb-2" />
                      <span className="font-sans text-sm text-warmgray">
                        {uploadedFile ? uploadedFile.name : "Click to upload"}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {uploadMessage && (
                  <p className="font-sans text-sm text-gold-300 mb-6 flex items-start gap-2">
                    <span className="text-lg">✓</span>
                    <span>{uploadMessage}</span>
                  </p>
                )}

                <p className="font-sans text-xs text-warmgray/70">
                  Accepted formats: PNG, JPG, PDF (Max 10MB)
                </p>
              </motion.div>

              {/* WhatsApp Button */}
              <motion.button
                onClick={handleWhatsApp}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.2 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-sans font-medium text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Contact via WhatsApp
              </motion.button>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: MOTION.normal, delay: 0.3 }}
                className="p-6 bg-gold-500/5 border border-gold-500/20 rounded-lg"
              >
                <h4 className="font-serif text-lg font-light text-ivory mb-4">
                  Next Steps
                </h4>
                <ul className="space-y-3 font-sans text-sm text-warmgray">
                  <li className="flex gap-3">
                    <span className="text-gold-500 flex-shrink-0">1.</span>
                    <span>Complete payment via your preferred method</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 flex-shrink-0">2.</span>
                    <span>Upload proof of payment to confirm</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 flex-shrink-0">3.</span>
                    <span>We'll verify within 24 hours</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold-500 flex-shrink-0">4.</span>
                    <span>Project planning and creation begins</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
