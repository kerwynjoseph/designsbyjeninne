// Service definition
export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  variant: "active" | "comingSoon";
};

// Portfolio item definition
export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description?: string;
  imageKey?: string; // references placeholder or real image
  videoUrl?: string; // MP4 video URL (can be from /public folder or external URL)
  isVideo?: boolean; // true if item is a video instead of image
};

// Testimonial definition
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  imageKey?: string;
};

// FAQ definition
export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

// Process step definition
export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
};
