import { Nav } from "@/components/layout/Nav";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About Jeninne | Designs by Jeninne",
  description:
    "Meet Jeninne Belfast, Creative Director and Founder of Designs by Jeninne. Learn about our creative studio, services, and vision.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="w-full bg-ink">
        <About />
      </main>
      <Footer />
    </>
  );
}
