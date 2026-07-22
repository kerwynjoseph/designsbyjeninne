import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PaymentInstructions } from "@/components/sections/PaymentInstructions";

export const metadata = {
  title: "Payment Instructions | Designs by Jeninne",
  description:
    "Complete your booking with our flexible payment options. Bank transfer, payment plan, or WhatsApp inquiry.",
};

export default function PaymentPage() {
  return (
    <>
      <Nav />
      <PaymentInstructions />
      <Footer />
    </>
  );
}
