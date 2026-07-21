"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { useBooking } from "@/lib/booking-context";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/shared/Calendar";
import { TimePicker } from "@/components/shared/TimePicker";

const projectTypes = [
  "Content Videography",
  "Event Videography",
  "BTS Videography",
  "Wedding Videography",
  "Storybook Film Editing",
  "Website Design",
  "Branding",
  "Photography",
  "Social Media Content",
];

const budgetRanges = [
  "TT$300 – TT$500",
  "TT$500 – TT$800",
  "TT$800 – TT$1,300",
  "TT$1,300 – TT$2,300",
  "TT$2,300+",
  "Not sure yet / Need guidance",
];

const contactMethods = ["Email", "Phone", "WhatsApp", "Either"];

export function ProjectInquiryForm() {
  const { booking } = useBooking();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredContact: "",
    projectType: "",
    budget: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (booking.serviceName) {
      setFormData((prev) => ({
        ...prev,
        projectType: booking.serviceName,
      }));
    }
  }, [booking.serviceName]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fieldErrors: Record<string, string> = {};
      if (!formData.fullName.trim())
        fieldErrors.fullName = "Full name is required";
      if (!formData.email.trim()) fieldErrors.email = "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        fieldErrors.email = "Invalid email format";
      if (!formData.phone.trim()) fieldErrors.phone = "Phone is required";
      if (!formData.preferredContact)
        fieldErrors.preferredContact = "Please select preferred contact method";
      if (!formData.projectType)
        fieldErrors.projectType = "Please select a project type";
      if (!formData.budget) fieldErrors.budget = "Please select a budget range";
      if (!formData.preferredDate)
        fieldErrors.preferredDate = "Please select a preferred date";
      if (!formData.preferredTime)
        fieldErrors.preferredTime = "Please select a preferred time";
      if (!formData.message.trim())
        fieldErrors.message = "Project details are required";

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      // Combine form data with booking context
      const payload = {
        ...formData,
        serviceName: booking.serviceName,
        packageTier: booking.packageTier,
        packagePrice: booking.packagePrice,
        selectedAddOns: booking.selectedAddOns,
        estimatedTotal: booking.estimatedTotal,
        appointmentDate: formData.preferredDate,
        appointmentTime: formData.preferredTime,
      };

      // Submit inquiry to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          preferredContact: "",
          projectType: "",
          budget: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-3xl space-y-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION.normal }}
    >
      {/* Booking Summary */}
      {booking.serviceName && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gold-500/10 border border-gold-500/30 rounded-lg"
        >
          <h3 className="font-serif text-lg text-ivory mb-4">
            Your Booking Summary
          </h3>
          <div className="space-y-3 font-sans text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-gold-500/20">
              <span className="text-warmgray">Service</span>
              <span className="text-ivory font-medium">{booking.serviceName}</span>
            </div>
            {booking.packageTier && (
              <div className="flex justify-between items-center pb-3 border-b border-gold-500/20">
                <span className="text-warmgray">Package</span>
                <span className="text-ivory font-medium capitalize">
                  {booking.packageTier} - TT${booking.packagePrice?.toLocaleString()}
                </span>
              </div>
            )}
            {booking.selectedAddOns.length > 0 && (
              <div className="pb-3 border-b border-gold-500/20">
                <span className="text-warmgray block mb-2">Add-Ons</span>
                <div className="space-y-1">
                  {booking.selectedAddOns.map((addOn) => (
                    <div
                      key={addOn.id}
                      className="flex justify-between text-warmgray text-xs"
                    >
                      <span>{addOn.name}</span>
                      <span>+TT${addOn.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <span className="font-serif text-ivory">Estimated Total</span>
              <span className="font-serif text-lg text-gold-500">
                TT${booking.estimatedTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      )}
      {/* Full Name */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
        />
        {errors.fullName && (
          <p className="text-red-400 text-xs mt-2">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-2">{errors.email}</p>
        )}
      </div>

      {/* Phone / WhatsApp */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Phone / WhatsApp
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (868) 344-5101"
          className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-2">{errors.phone}</p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Preferred Contact Method
        </label>
        <select
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory focus:border-gold-500 outline-none transition-colors"
        >
          <option value="">Select contact method...</option>
          {contactMethods.map((method) => (
            <option
              key={method}
              value={method}
              className="bg-charcoal text-ivory"
            >
              {method}
            </option>
          ))}
        </select>
        {errors.preferredContact && (
          <p className="text-red-400 text-xs mt-2">{errors.preferredContact}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Project Type
        </label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory focus:border-gold-500 outline-none transition-colors"
        >
          <option value="">Select a project type...</option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-charcoal text-ivory">
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="text-red-400 text-xs mt-2">{errors.projectType}</p>
        )}
      </div>

      {/* Budget Range */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Budget Range
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory focus:border-gold-500 outline-none transition-colors mb-2"
        >
          <option value="">Select budget range...</option>
          {budgetRanges.map((range) => (
            <option
              key={range}
              value={range}
              className="bg-charcoal text-ivory"
            >
              {range}
            </option>
          ))}
        </select>
        <p className="text-xs text-warmgray/70 italic">
          * Final pricing may vary based on project scope, location, delivery
          timeline, revisions, and add-ons.
        </p>
        {errors.budget && (
          <p className="text-red-400 text-xs mt-2">{errors.budget}</p>
        )}
      </div>

      {/* Preferred Date - Calendar */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Preferred Date
        </label>
        <Calendar
          selectedDate={formData.preferredDate}
          onDateChange={(date) =>
            setFormData((prev) => ({ ...prev, preferredDate: date }))
          }
        />
        {errors.preferredDate && (
          <p className="text-red-400 text-xs mt-2">{errors.preferredDate}</p>
        )}
      </div>

      {/* Preferred Time */}
      <div>
        <TimePicker
          selectedTime={formData.preferredTime}
          onTimeChange={(time) =>
            setFormData((prev) => ({ ...prev, preferredTime: time }))
          }
        />
        {errors.preferredTime && (
          <p className="text-red-400 text-xs mt-2">{errors.preferredTime}</p>
        )}
      </div>

      {/* Project Details / Message */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Project Details
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project vision, requirements, and any specific ideas you have..."
          rows={6}
          className="w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-2">{errors.message}</p>
        )}
      </div>

      {/* Submit Button & Status */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: MOTION.normal, delay: 0.1 }}
      >
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === "success"}
          className={`w-full py-3 rounded-lg font-sans font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
            submitStatus === "success"
              ? "bg-green-600/20 border border-green-500 text-green-400"
              : submitStatus === "error"
                ? "bg-red-600/20 border border-red-500 text-red-400"
                : "bg-gradient-to-r from-gold-100 via-gold-500 to-gold-700 text-ink hover:from-gold-300 hover:via-gold-700 hover:to-gold-900 disabled:opacity-50"
          }`}
        >
          {isSubmitting
            ? "Sending..."
            : submitStatus === "success"
              ? "✓ Inquiry Sent!"
              : submitStatus === "error"
                ? "Error Sending Inquiry"
                : "Submit Inquiry"}
        </button>
      </motion.div>

      {submitStatus === "error" && (
        <p className="text-red-400 text-sm text-center">
          There was an error sending your inquiry. Please try again or contact
          us directly.
        </p>
      )}
    </motion.form>
  );
}
