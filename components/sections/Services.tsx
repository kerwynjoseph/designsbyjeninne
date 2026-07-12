"use client";

import { services } from "@/lib/data/services";
import { ServiceCard } from "./ServiceCard";
import { SectionHeading } from "../shared/SectionHeading";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-ink">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Services"
          title="Premium Creative Solutions"
          subtitle="Thoughtfully crafted design and storytelling services to elevate your brand presence and communicate your unique vision."
        />

        {/* Services Grid - Editorial Layout with Generous Whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>

        {/* Coming Soon Teaser Subtext */}
        <div className="mt-20 pt-12 border-t border-gold-500/20 text-center">
          <p className="font-sans text-sm md:text-base text-warmgray max-w-2xl mx-auto leading-relaxed">
            Additional premium services are in development. Join the waitlist for
            Website Design and App Design to be among the first notified of their
            launch.
          </p>
        </div>
      </div>
    </section>
  );
}
