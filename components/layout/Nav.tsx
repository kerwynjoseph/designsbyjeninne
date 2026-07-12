"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    // Close mobile menu first
    setMobileMenuOpen(false);

    // Check if it's an external page (starts with /)
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }

    if (href === "#") {
      // Go to home page
      window.location.href = "/";
      return;
    }

    // For anchor links, check if the element exists on current page
    const element = document.querySelector(href);
    if (element) {
      // Element exists on this page, scroll to it
      element.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      // Element doesn't exist on this page, go to home with anchor
      window.location.href = `/${href}`;
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-ink/95 backdrop-blur-sm border-b border-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-0 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#")}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Designs by Jeninne"
              width={280}
              height={90}
              className="h-24 w-auto"
              priority
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="font-sans text-sm text-ivory hover:text-gold-300 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-ivory hover:text-gold-500 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-[999] bg-ink/95 backdrop-blur-md">
          <div className="flex flex-col items-center justify-start gap-8 pt-12 px-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="font-serif text-3xl font-light text-ivory hover:text-gold-500 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
