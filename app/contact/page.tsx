import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { ProjectInquiryForm } from "@/components/sections/ProjectInquiryForm";

export const metadata = {
  title: "Start Your Project | Designs by Jeninne",
  description:
    "Ready to bring your vision to life? Fill out our project inquiry form to get started with Designs by Jeninne.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="w-full bg-ink">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
              Let's Work Together
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
              Start Your Project
            </h1>
            <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
              Tell us about your project, and we'll get back to you within 24
              hours with a personalized quote and next steps.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
              {/* Form */}
              <div className="lg:col-span-2">
                <ProjectInquiryForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-gold-500" />
                    <h3 className="font-serif text-lg font-light text-ivory">
                      Email
                    </h3>
                  </div>
                  <p className="font-sans text-warmgray leading-relaxed">
                    info@designsbyjeninne.com
                  </p>
                  <p className="font-sans text-xs text-warmgray/60 mt-2">
                    We typically respond within 24 hours.
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-gold-500" />
                    <h3 className="font-serif text-lg font-light text-ivory">
                      Phone / WhatsApp
                    </h3>
                  </div>
                  <p className="font-sans text-warmgray leading-relaxed">
                    +1 (868) 344-5101
                  </p>
                  <p className="font-sans text-xs text-warmgray/60 mt-2">
                    Available for inquiries and consultations
                  </p>
                </div>

                {/* Quick Info */}
                <div className="pt-8 border-t border-gold-500/20">
                  <h4 className="font-sans text-xs font-medium text-gold-500 uppercase tracking-wider mb-3">
                    What Happens Next
                  </h4>
                  <ul className="space-y-2 font-sans text-sm text-warmgray">
                    <li>✓ We review your inquiry</li>
                    <li>✓ You receive a personalized quote</li>
                    <li>✓ We schedule a consultation call</li>
                    <li>✓ Project planning begins</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
