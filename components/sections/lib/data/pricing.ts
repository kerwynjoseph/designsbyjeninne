export type PricingTier = "bronze" | "silver" | "gold";

export interface PricingPackage {
  tier: PricingTier;
  price: number;
  currency: string;
  description: string;
  features: string[];
  bestFor: string[];
  cta: string;
}

export interface PricingSection {
  id: string;
  title: string;
  description: string;
  packages: PricingPackage[];
  addOns: Array<{
    name: string;
    price: number;
    currency: string;
  }>;
}

export const pricingSections: PricingSection[] = [
  {
    id: "content-videography",
    title: "Content Videography",
    description:
      "Perfect for brands and creators who need quick, professional video content.",
    packages: [
      {
        tier: "bronze",
        price: 300,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 30 Minutes of Filming",
          "1 Professionally Edited Video (30–60 seconds)",
          "Basic Colour Correction",
          "Royalty-Free Music",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: [
          "Quick Promotional Videos",
          "Product Showcases",
          "Food Content",
          "BTS Clips",
        ],
        cta: "Book Bronze",
      },
      {
        tier: "silver",
        price: 500,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 1 Hour Coverage",
          "2 Professionally Edited Videos",
          "Creative Transitions",
          "Colour Grading",
          "Music Synchronization",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: [
          "Birthday Celebrations",
          "Pool Parties",
          "Business Promotions",
          "Restaurant Content",
          "Studio Sessions",
          "Content Creators",
        ],
        cta: "Book Silver",
      },
      {
        tier: "gold",
        price: 800,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 2 Hours Filming",
          "3 Professionally Edited Videos",
          "Cinematic Highlight Video (1–2 Minutes)",
          "Advanced Colour Grading",
          "Premium Transitions",
          "Royalty-Free Music",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: [
          "Corporate Events",
          "Birthday Parties",
          "Brand Launches",
          "DJ Events",
          "Carnival",
          "Promotional Campaigns",
        ],
        cta: "Book Gold",
      },
    ],
    addOns: [
      { name: "Additional Hour", price: 150, currency: "TT$" },
      { name: "Additional Edited Video", price: 100, currency: "TT$" },
      { name: "Raw Footage", price: 200, currency: "TT$" },
      { name: "Rush Delivery (24–48 Hours)", price: 250, currency: "TT$" },
    ],
  },
  {
    id: "event-videography",
    title: "Event Videography",
    description: "Professional coverage for your special events and celebrations.",
    packages: [
      {
        tier: "bronze",
        price: 500,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 1.5 Hours Coverage",
          "1 Highlight Video (45–90 sec)",
          "Professional Colour Enhancement",
          "Background Music",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: ["Small Gatherings", "Private Events", "Quick Coverage"],
        cta: "Book Bronze",
      },
      {
        tier: "silver",
        price: 850,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 3 Hours Coverage",
          "2 Edited Videos",
          "Professional Colour Enhancement",
          "Cinematic Editing",
          "Creative Transitions",
          "Background Music",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: ["Mid-Size Events", "Celebrations", "Corporate Gatherings"],
        cta: "Book Silver",
      },
      {
        tier: "gold",
        price: 1300,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 5 Hours Coverage",
          "3 Edited Videos",
          "Cinematic Highlight Film (2–3 min)",
          "Professional Colour Enhancement",
          "Cinematic Editing",
          "Creative Effects",
          "Priority Delivery",
          "Digital Delivery",
        ],
        bestFor: ["Large Events", "Premium Coverage", "Full Day Events"],
        cta: "Book Gold",
      },
    ],
    addOns: [
      { name: "Additional Hour", price: 200, currency: "TT$" },
      { name: "Additional Edited Video", price: 150, currency: "TT$" },
      { name: "Raw Footage", price: 300, currency: "TT$" },
      { name: "Rush Delivery", price: 300, currency: "TT$" },
    ],
  },
  {
    id: "bts-videography",
    title: "Behind-The-Scenes Videography",
    description:
      "Capture the magic behind your creative process and production.",
    packages: [
      {
        tier: "bronze",
        price: 300,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 1 Hour",
          "1 BTS Reel (30–60 sec)",
          "Colour Enhancement",
          "Background Music",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: ["Quick BTS", "Social Content", "Studio Sessions"],
        cta: "Book Bronze",
      },
      {
        tier: "silver",
        price: 500,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 2 Hours",
          "2 BTS Videos",
          "Colour Enhancement",
          "Creative Editing",
          "Seamless Transitions",
          "Background Music",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: ["Content Creators", "Production Coverage", "Full Sessions"],
        cta: "Book Silver",
      },
      {
        tier: "gold",
        price: 800,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 3 Hours",
          "3 Edited Videos",
          "Cinematic Highlight Film",
          "Professional Colour Enhancement",
          "Cinematic Editing",
          "Creative Effects",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: [
          "Premium Productions",
          "Multi-Content Creation",
          "Brand Stories",
        ],
        cta: "Book Gold",
      },
    ],
    addOns: [
      { name: "Additional Hour", price: 150, currency: "TT$" },
      { name: "Additional Edited Video", price: 100, currency: "TT$" },
      { name: "Raw Footage", price: 250, currency: "TT$" },
      { name: "Rush Delivery (24–48 Hours)", price: 250, currency: "TT$" },
    ],
  },
  {
    id: "wedding-videography",
    title: "Wedding Videography",
    description: "Capture your most special moments with cinematic elegance.",
    packages: [
      {
        tier: "bronze",
        price: 800,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 2 Hours",
          "Ceremony Coverage",
          "Family Moments",
          "Highlight Film (1–2 min)",
          "Professional Colour Enhancement",
          "Background Music",
          "Social Media Ready",
          "Digital Delivery",
        ],
        bestFor: ["Intimate Ceremonies", "Quick Events", "Small Weddings"],
        cta: "Book Bronze",
      },
      {
        tier: "silver",
        price: 1500,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 4 Hours",
          "Ceremony",
          "Bridal Party",
          "Family Moments",
          "Reception Highlights",
          "Cake Cutting",
          "First Dance",
          "2 Edited Videos",
          "Cinematic Highlight Film",
          "Colour Enhancement",
          "Digital Delivery",
        ],
        bestFor: ["Traditional Weddings", "Full Day Coverage", "Receptions"],
        cta: "Book Silver",
      },
      {
        tier: "gold",
        price: 2300,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 6 Hours",
          "Bride & Groom Preparations",
          "Ceremony",
          "Reception",
          "Speeches",
          "Cake Cutting",
          "First Dance",
          "Bouquet Toss",
          "Guest Reactions",
          "3 Edited Videos",
          "Cinematic Highlight Film (3–5 min)",
          "Professional Colour Enhancement",
          "Priority Editing",
          "Digital Delivery",
        ],
        bestFor: [
          "Premium Weddings",
          "Full Day Coverage",
          "Complete Story",
        ],
        cta: "Book Gold",
      },
    ],
    addOns: [
      { name: "Additional Hour", price: 250, currency: "TT$" },
      { name: "Additional Edited Video", price: 200, currency: "TT$" },
      { name: "Raw Footage", price: 500, currency: "TT$" },
      { name: "Rush Delivery (24–48 Hours)", price: 500, currency: "TT$" },
    ],
  },
  {
    id: "storybook-editing",
    title: "Storybook Film Editing",
    description: "Transform your memories into a cinematic storybook film.",
    packages: [
      {
        tier: "bronze",
        price: 300,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 30 Media Files",
          "Optional Voice-over",
          "Background Music",
          "Cinematic Editing",
          "Smooth Transitions",
          "Text Captions",
          "1–2 Minute Storybook Film",
          "1 Revision",
          "Digital Delivery",
        ],
        bestFor: [
          "Short Compilations",
          "Quick Projects",
          "Social Media",
        ],
        cta: "Book Bronze",
      },
      {
        tier: "silver",
        price: 500,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 60 Media Files",
          "Optional Voice-over",
          "Background Music",
          "Cinematic Editing",
          "Animated Titles",
          "Captions",
          "Motion Effects",
          "2–4 Minute Storybook Film",
          "2 Revisions",
          "Digital Delivery",
        ],
        bestFor: [
          "Event Compilations",
          "Travel Stories",
          "Full Coverage",
        ],
        cta: "Book Silver",
      },
      {
        tier: "gold",
        price: 800,
        currency: "TT$",
        description: "Starting from",
        features: [
          "Up to 100 Media Files",
          "Optional Voice-over",
          "Story Sequence Planning",
          "Background Music",
          "Cinematic Colour Enhancement",
          "Motion Graphics",
          "Premium Transitions",
          "4–6 Minute Storybook Film",
          "2 Revisions",
          "Priority Delivery",
        ],
        bestFor: [
          "Premium Projects",
          "Full Stories",
          "Cinematic Films",
        ],
        cta: "Book Gold",
      },
    ],
    addOns: [
      { name: "Additional 10 Media Files", price: 100, currency: "TT$" },
      { name: "Script Writing Assistance", price: 150, currency: "TT$" },
      { name: "Additional Revision", price: 75, currency: "TT$" },
      { name: "Rush Delivery (24–48 Hours)", price: 200, currency: "TT$" },
    ],
  },
];
