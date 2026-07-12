import { Nav } from "@/components/layout/Nav";
import { PricingPageFull } from "@/components/sections/PricingPageFull";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Services & Pricing | Designs by Jeninne",
  description:
    "Professional videography packages. Bronze, Silver, and Gold tiers for content, events, weddings, and more.",
};

export default function Page() {
  return (
    <>
      <Nav />
      <PricingPageFull />
      <Footer />
    </>
  );
}
