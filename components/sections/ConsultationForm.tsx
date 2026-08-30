"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { Calendar } from "@/components/shared/Calendar";
import { TimePicker } from "@/components/shared/TimePicker";

const consultationFormats = [
  "Video Call (Zoom / Google Meet)",
  "Phone Call",
  "WhatsApp Call",
  "In Person (Trinidad)",
];

const consultationTopics = [
  "Graphic Design",
  "Videography",
  "Social Media Management",
  "Branding & Brand Identity",
  "Invitations & Stationery",
  "Website Design (Coming Soon)",
  "General / Not Sure Yet",
];

const contactMethods = ["Email", "Phone", "WhatsApp", "Either"];

const budgetRanges = [
  "TT$300 – TT$500",
  "TT$500 – TT$800",
  "TT$800 – TT$1,300",
  "TT$1,300 – TT$2,300",
  "TT$2,300+",
  "Not sure yet / Need guidance",
];

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "",
  consultationFormat: "",
  topic: "",
  budget: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export function ConsultationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        fieldErrors.email = "Invalid email format";
      if (!formData.phone.trim()) fieldErrors.phone = "Phone is required";
      if (!formData.preferredContact)
        fieldErrors.preferredContact = "Please select preferred contact method";
      if (!formData.consultationFormat)
        fieldErrors.consultationFormat =
          "Please select how you'd like to meet";
      if (!formData.topic)
        fieldErrors.topic = "Please select what you'd like to discuss";
      if (!formData.preferredDate)
        fieldErrors.preferredDate = "Please select a preferred date";
      if (!formData.preferredTime)
        fieldErrors.preferredTime = "Please select a preferred time";
      if (!formData.message.trim())
        fieldErrors.message = "Please tell us a little about your project";

      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredContact: formData.preferredContact,
        projectType: formData.topic,
        budget: formData.budget || "Not specified",
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: `[Consultation Request — ${formData.consultationFormat}]\n\n${formData.message}`,
        serviceName: `Consultation — ${formData.consultationFormat}`,
        selectedAddOns: [],
        estimatedTotal: 0,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(initialFormData);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-3xl space-y-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION.normal }}
    >
      {/* Full Name */}
      <div>
        <label
          htmlFor="consult-fullName"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          Full Name
        </label>
        <input
          id="consult-fullName"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Your name"
          className={inputClass}
        />
        {errors.fullName && (
          <p className="text-red-400 text-xs mt-2">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="consult-email"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          Email Address
        </label>
        <input
          id="consult-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={inputClass}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-2">{errors.email}</p>
        )}
      </div>

      {/* Phone / WhatsApp */}
      <div>
        <label
          htmlFor="consult-phone"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          Phone / WhatsApp
        </label>
        <input
          id="consult-phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (868) 000-0000"
          className={inputClass}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-2">{errors.phone}</p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label
          htmlFor="consult-preferredContact"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          Preferred Contact Method
        </label>
        <select
          id="consult-preferredContact"
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          className={inputClass}
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

      {/* Consultation Format */}
      <div>
        <label
          htmlFor="consult-format"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          How Would You Like to Meet?
        </label>
        <select
          id="consult-format"
          name="consultationFormat"
          value={formData.consultationFormat}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a format...</option>
          {consultationFormats.map((format) => (
            <option
              key={format}
              value={format}
              className="bg-charcoal text-ivory"
            >
              {format}
            </option>
          ))}
        </select>
        {errors.consultationFormat && (
          <p className="text-red-400 text-xs mt-2">
            {errors.consultationFormat}
          </p>
        )}
      </div>

      {/* Topic */}
      <div>
        <label
          htmlFor="consult-topic"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          What Would You Like to Discuss?
        </label>
        <select
          id="consult-topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select a topic...</option>
          {consultationTopics.map((topic) => (
            <option
              key={topic}
              value={topic}
              className="bg-charcoal text-ivory"
            >
              {topic}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p className="text-red-400 text-xs mt-2">{errors.topic}</p>
        )}
      </div>

      {/* Budget (optional) */}
      <div>
        <label
          htmlFor="consult-budget"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          Budget Range{" "}
          <span className="text-warmgray font-normal">(Optional)</span>
        </label>
        <select
          id="consult-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`${inputClass} mb-2`}
        >
          <option value="">Prefer to discuss on the call...</option>
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
          * Sharing a range helps us prepare the most useful recommendations.
          Final pricing depends on scope, location, timeline, revisions, and
          add-ons.
        </p>
      </div>

      {/* Preferred Date */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Preferred Date
        </label>
        <Calendar
          selectedDate={formData.preferredDate}
          onDateChange={(date) => {
            setFormData((prev) => ({ ...prev, preferredDate: date }));
            setErrors((prev) => {
              const next = { ...prev };
              delete next.preferredDate;
              return next;
            });
          }}
        />
        {errors.preferredDate && (
          <p className="text-red-400 text-xs mt-2">{errors.preferredDate}</p>
        )}
      </div>

      {/* Preferred Time */}
      <div>
        <TimePicker
          selectedTime={formData.preferredTime}
          onTimeChange={(time) => {
            setFormData((prev) => ({ ...prev, preferredTime: time }));
            setErrors((prev) => {
              const next = { ...prev };
              delete next.preferredTime;
              return next;
            });
          }}
        />
        <p className="text-xs text-warmgray/70 mt-3">
          All times are Atlantic Standard Time (AST, UTC−4). We&apos;ll confirm
          your slot by email before the call.
        </p>
        {errors.preferredTime && (
          <p className="text-red-400 text-xs mt-2">{errors.preferredTime}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="consult-message"
          className="block font-sans text-sm font-medium text-ivory mb-3"
        >
          Tell Us About Your Project
        </label>
        <textarea
          id="consult-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="What are you working on? Share your goals, timeline, and anything you'd like us to review before the call..."
          rows={6}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-2">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
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
              ? "✓ Consultation Requested!"
              : submitStatus === "error"
                ? "Error Sending Request"
                : "Request My Consultation"}
        </button>
      </motion.div>

      {submitStatus === "success" && (
        <p className="text-green-400 text-sm text-center">
          Thank you — your request is in. Check your inbox for a confirmation,
          and we&apos;ll follow up within one business day to lock in your time.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="text-red-400 text-sm text-center">
          There was an error sending your request. Please try again, or reach us
          directly at{" "}
          <a
            href="mailto:info@designsbyjeninne.com"
            className="text-gold-500 hover:text-gold-300 transition-colors"
          >
            info@designsbyjeninne.com
          </a>
          .
        </p>
      )}
    </motion.form>
  );
}
