"use client";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GoldButton } from "@/components/shared/GoldButton";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="w-full bg-ink">
        <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
              404
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
              Page Not Found
            </h1>
            <p className="font-sans text-lg text-warmgray max-w-xl mx-auto leading-relaxed mb-12">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved. Let&apos;s get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <GoldButton variant="filled" href="/">
                Back to Home
              </GoldButton>
              <GoldButton variant="outline" href="/contact">
                Contact Us
              </GoldButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
