import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Quiet Authority Tokens
        ink: {
          950: "#07101F", // Deepest navy for hero & footer
          DEFAULT: "#1B1F27",
          secondary: "#5B6573",
          muted: "#8894A0",
        },
        navy: {
          950: "#07101F",
          900: "#0E1F3D",
          800: "#14264A", // Brand navy-deep
          700: "#1F3864", // Brand primary
          DEFAULT: "#1F3864",
          deep: "#14264A",
          hover: "#2F5496",
        },
        blue: {
          600: "#2F5496", // Hover & interactive links
          100: "#E4ECF8", // Soft surfaces
        },
        ivory: {
          50: "#FBF9F4", // Warm default page background
          DEFAULT: "#FBF9F4",
        },
        stone: {
          100: "#F1EEE7", // Alternate section background
          DEFAULT: "#F1EEE7",
        },
        brass: {
          300: "#D9C29A",
          400: "#C59A58",
          500: "#B08D57", // Brand gold, accents, icons, rules
          600: "#9C7944",
          700: "#8A6B3A", // Contrast-checked text on ivory
          DEFAULT: "#B08D57",
        },
        gold: {
          DEFAULT: "#B08D57",
          300: "#D9C29A",
          400: "#C59A58",
          500: "#B08D57",
          600: "#9C7944",
          700: "#8A6B3A",
          light: "#FBF9F4",
          hover: "#8A6B3A",
        },
        surface: {
          DEFAULT: "#FBF9F4",
          ivory: "#FBF9F4",
          stone: "#F1EEE7",
          card: "#FFFFFF",
          muted: "#E4ECF8",
        },
        border: {
          DEFAULT: "#D5DAE3",
          subtle: "#E9ECF1",
          brass: "#D9C29A",
        },
        // Component Compatibility Aliases
        primary: {
          DEFAULT: "#1F3864",
          deep: "#14264A",
          hover: "#2F5496",
          light: "#E4ECF8",
          dark: "#07101F",
        },
        accent: {
          DEFAULT: "#B08D57",
          hover: "#8A6B3A",
          light: "#FBF9F4",
          gold: "#B08D57",
        },
        status: {
          success: "#1E7B4F",
          "success-bg": "#E7F5EE",
          warning: "#B7791F",
          "warning-bg": "#FEF7EC",
          danger: "#B42318",
          "danger-bg": "#FDF1F0",
          info: "#1F5FA8",
          "info-bg": "#E4ECF8",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-cormorant)",
          "'Cormorant Garamond'",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-inter)",
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        eyebrow: ["12px", { lineHeight: "1.2", letterSpacing: "0.16em", fontWeight: "600" }],
        "display-xl": ["clamp(3.5rem, 7vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-l": ["clamp(2.75rem, 5vw, 4.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        h2: ["clamp(2.125rem, 3.5vw, 3.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.25", letterSpacing: "-0.005em" }],
        "body-l": ["clamp(1.1875rem, 1.5vw, 1.3125rem)", { lineHeight: "1.6" }],
        body: ["17px", { lineHeight: "1.65" }],
        small: ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        btn: "6px",
        input: "6px",
        card: "14px",
        arch: "999px 999px 0 0",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14, 31, 61, 0.06), 0 8px 24px rgba(14, 31, 61, 0.06)",
        "card-hover": "0 8px 24px rgba(14, 31, 61, 0.12), 0 2px 6px rgba(14, 31, 61, 0.06)",
        raised: "0 24px 60px rgba(14, 31, 61, 0.14)",
        modal: "0 24px 60px rgba(14, 31, 61, 0.18)",
      },
      maxWidth: {
        container: "1240px",
        content: "1240px",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
