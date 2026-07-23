import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Portfolio } from "@/components/sections/Portfolio";

export const metadata = {
  title: "Portfolio | Designs by Jeninne",
  description:
    "View our portfolio of videography, content creation, and design projects.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main className="w-full bg-ink">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
              Our Work
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
              Portfolio
            </h1>
            <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
              Explore our collection of videography, content creation, and creative projects.
            </p>
          </div>
        </section>

        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
