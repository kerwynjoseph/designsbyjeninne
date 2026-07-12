"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactFormSchema, ContactFormData } from "@/lib/validations/contact";
import { MOTION } from "@/lib/motion";
import { ZodError } from "zod";

const projectTypes = [
  "Brand Identity",
  "Graphic Design",
  "Videography",
  "Social Media Management",
  "Packaging Design",
  "Invitations & Stationery",
  "Other",
];

const budgetRanges = [
  "Under $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
];

export function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({});
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
    "use client";
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);

      // Submit to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({});
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error: unknown) {
      const zodError = error as any;
      if (zodError instanceof ZodError || zodError?.issues) {
        const fieldErrors: Record<string, string> = {};
        const issues = zodError.issues || zodError.errors || [];
        issues.forEach((issue: any) => {
          const fieldName = issue.path?.[0];
          if (fieldName) {
            fieldErrors[fieldName.toString()] = issue.message;
          }
        });
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        } else {
          setSubmitStatus("error");
        }
      } else {
        setSubmitStatus("error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION.normal }}
    >
      {/* Name */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full px-4 py-3 bg-charcoal border border-gold-500/30 rounded-sm text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-2">{errors.name}</p>
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
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="your@email.com"
          className="w-full px-4 py-3 bg-charcoal border border-gold-500/30 rounded-sm text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-2">{errors.email}</p>
        )}
      </div>

      {/* Phone (Optional) */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Phone (Optional)
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className="w-full px-4 py-3 bg-charcoal border border-gold-500/30 rounded-sm text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
        />
      </div>

      {/* Project Type */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Project Type
        </label>
        <select
          name="projectType"
          value={formData.projectType || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-charcoal border border-gold-500/30 rounded-sm text-ivory focus:border-gold-500 outline-none transition-colors"
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

      {/* Budget (Optional) */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Budget Range (Optional)
        </label>
        <select
          name="budget"
          value={formData.budget || ""}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-charcoal border border-gold-500/30 rounded-sm text-ivory focus:border-gold-500 outline-none transition-colors"
        >
          <option value="">Select budget range...</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range} className="bg-charcoal text-ivory">
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block font-sans text-sm font-medium text-ivory mb-3">
          Project Details
        </label>
        <textarea
          name="message"
          value={formData.message || ""}
          onChange={handleChange}
          placeholder="Tell us about your project, vision, and goals..."
          rows={6}
          className="w-full px-4 py-3 bg-charcoal border border-gold-500/30 rounded-sm text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors resize-none"
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
          className={`w-full py-3 rounded-sm font-sans font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
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
              ? "✓ Message Sent Successfully"
              : submitStatus === "error"
                ? "Error Sending Message"
                : "Send Inquiry"}
        </button>
      </motion.div>

      {submitStatus === "error" && (
        <p className="text-red-400 text-sm text-center">
          There was an error sending your message. Please try again or contact
          us directly.
        </p>
      )}
    </motion.form>
  );
}
