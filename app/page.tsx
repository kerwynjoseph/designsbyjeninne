import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="w-full bg-ink">
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
