import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/lenis";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { BookingProvider } from "@/lib/booking-context";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Designs by Jeninne | Luxury Creative Studio",
  description:
    "Premium creative design studio specializing in luxury branding, graphic design, videography, and social media management.",
  openGraph: {
    title: "Designs by Jeninne | Luxury Creative Studio",
    description:
      "Premium creative design studio specializing in luxury branding, graphic design, videography, and social media management.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Designs by Jeninne",
    description: "Luxury Creative Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-ink text-ivory antialiased">
        {/* Ambient gradient backdrop */}
        <div className="gradient-drift" />

        {/* Noise texture overlay */}
        <div className="noise-bg fixed inset-0 pointer-events-none z-0" />

        {/* Main content */}
        <BookingProvider>
          <SmoothScrollProvider>
            <LoadingScreen />
            <div className="content-wrapper relative z-10">
              {children}
            </div>
          </SmoothScrollProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
