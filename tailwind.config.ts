import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        charcoal: "#101010",
        ivory: "#f5f1e8",
        warmgray: "#b8b2a6",
        gold: {
          100: "#fff1b0",
          300: "#ffd766",
          500: "#f7c948",
          700: "#d4af37",
          900: "#b8860b",
        },
      },
      fontFamily: {
        serif: "var(--font-serif)",
        sans: "var(--font-sans)",
      },
    },
  },
  plugins: [],
};

export default config;
