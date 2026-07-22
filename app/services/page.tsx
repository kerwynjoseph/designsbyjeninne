import { Nav } from "@/components/layout/Nav";
import { Services } from "@/components/sections/Services";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Services | Designs by Jeninne",
  description:
    "Explore our comprehensive creative services: graphic design, videography, social media management, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="w-full bg-ink">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
              Our Expertise
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
              Services
            </h1>
            <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
              Premium creative solutions tailored to elevate your brand and connect with your audience.
            </p>
          </div>
        </section>

        <Services />
      </main>
      <Footer />
    </>
  );
}
