import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BookingReviewPage } from "@/components/sections/BookingReviewPage";

export const metadata = {
  title: "Review Your Booking | Designs by Jeninne",
  description: "Review and customize your booking before payment.",
  alternates: { canonical: "/booking" },
  robots: { index: false, follow: true },
};

export default function BookingPage() {
  return (
    <>
      <Nav />
      <main className="w-full bg-ink">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
              Booking Review
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
              Customize Your Order
            </h1>
            <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
              Review your selection, add optional features, and proceed to payment.
            </p>
          </div>
        </section>

        <BookingReviewPage />
      </main>
      <Footer />
    </>
  );
}
