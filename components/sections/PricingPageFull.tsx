"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pricingSections } from "@/lib/data/pricing";
import { MOTION } from "@/lib/motion";
import { PricingCard } from "./PricingCard";
import { PackageModal } from "./PackageModal";

export function PricingPageFull() {
  const [selectedPackageService, setSelectedPackageService] = useState<
    (typeof pricingSections)[0] | null
  >(null);
  const [selectedPackage, setSelectedPackage] = useState<
    (typeof pricingSections)[0]["packages"][0] | null
  >(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  const handlePackageClick = (
    service: (typeof pricingSections)[0],
    pkg: (typeof pricingSections)[0]["packages"][0]
  ) => {
    setSelectedPackageService(service);
    setSelectedPackage(pkg);
    setShowPackageModal(true);
  };

  return (
    <main className="w-full bg-ink">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
            Transparent Pricing
          </div>
          <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
            Investment in Your Vision
          </h1>
          <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
            Choose from our curated packages, customize with add-ons, and invest
            in professional creative services that elevate your brand.
          </p>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-serif text-5xl font-light text-ivory mb-4">
              Pricing Packages
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
            <p className="font-sans text-warmgray mt-6 max-w-2xl">
              Each service offers three tiers. Click any package to see included
              features, add optional add-ons, and proceed to booking.
            </p>
          </div>

          {pricingSections.map((section) => (
            <div key={section.id} className="mb-24">
              <div className="mb-8">
                <h3 className="font-serif text-3xl font-light text-ivory mb-2">
                  {section.title}
                </h3>
                <p className="font-sans text-warmgray">
                  {section.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.packages.map((pkg, pkgIdx) => (
                  <motion.div
                    key={pkg.tier}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: MOTION.normal,
                      delay: pkgIdx * 0.1,
                    }}
                    className="text-left group"
                  >
                    <PricingCard
                      package={pkg}
                      index={pkgIdx}
                      onClick={() => handlePackageClick(section, pkg)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <PackageModal
        service={selectedPackageService}
        package={selectedPackage}
        isOpen={showPackageModal}
        onClose={() => setShowPackageModal(false)}
      />
    </main>
  );
}
