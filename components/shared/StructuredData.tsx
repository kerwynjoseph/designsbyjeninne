const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Designs by Jeninne",
  description:
    "Luxury creative studio specializing in graphic design, videography, branding, and social media management in Trinidad and Tobago.",
  url: "https://www.designsbyjeninne.com",
  logo: "https://www.designsbyjeninne.com/logo.png",
  image: "https://www.designsbyjeninne.com/opengraph-image.png",
  telephone: "+1-868-344-5101",
  email: "info@designsbyjeninne.com",
  areaServed: {
    "@type": "Country",
    name: "Trinidad and Tobago",
  },
  founder: {
    "@type": "Person",
    name: "Jeninne Belfast",
    jobTitle: "Creative Director & Founder",
  },
  priceRange: "TT$300 - TT$2300",
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  );
}
