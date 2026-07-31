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
      /* ------------------------------------------------
         FONTS
      ------------------------------------------------ */
      fontFamily: {
        heading:   ["Outfit", "sans-serif"],
        body:      ["Outfit", "sans-serif"],
        paragraph: ["Inter", "sans-serif"],
      },

      /* ------------------------------------------------
         FONT SIZES (Design System scale)
      ------------------------------------------------ */
      fontSize: {
        // Headings
        "h1": ["100px", { lineHeight: "115px", fontWeight: "500" }],
        "h2": ["95px",  { lineHeight: "100px", fontWeight: "500" }],
        "h3": ["76px",  { lineHeight: "84px",  fontWeight: "500" }],
        "h4": ["61px",  { lineHeight: "72px",  fontWeight: "500" }],
        "h5": ["49px",  { lineHeight: "60px",  fontWeight: "500" }],
        "h6": ["39px",  { lineHeight: "48px",  fontWeight: "500" }],
        "h7": ["31px",  { lineHeight: "36px",  fontWeight: "500" }],
        // Subheadings / Body / Buttons
        "3xl-sub": ["39px", { lineHeight: "auto" }],
        "2xl-sub": ["31px", { lineHeight: "auto" }],
        "xl-sub":  ["25px", { lineHeight: "auto" }],
        "lg-sub":  ["20px", { lineHeight: "auto" }],
        "md-sub":  ["16px", { lineHeight: "auto" }],
        "sm-sub":  ["14px", { lineHeight: "auto" }],
        // Body
        "body-xl": ["24px", { lineHeight: "auto" }],
        "body-lg": ["20px", { lineHeight: "auto" }],
        "body-md": ["18px", { lineHeight: "auto" }],
        "body-sm": ["16px", { lineHeight: "auto" }],
        "body-xs": ["14px", { lineHeight: "auto" }],
        "body-2xs":["12px", { lineHeight: "auto" }],
      },

      /* ------------------------------------------------
         COLORS — CSS Variable–based
         Usage: bg-brand, text-secondary-600, etc.
      ------------------------------------------------ */
      colors: {
        /* Semantic shortcuts */
        brand:    "var(--color-brand)",
        "brand-hover": "var(--color-brand-hover)",
        "brand-light": "var(--color-brand-light)",
        surface:  "var(--color-surface)",
        "text-base":   "var(--color-text)",
        "text-muted":  "var(--color-text-muted)",
        border:   "var(--color-border)",
        yellow:   "var(--color-yellow)",

        /* Background scale */
        bg: {
          100: "var(--color-bg-100)",
          200: "var(--color-bg-200)",
          300: "var(--color-bg-300)",
          400: "var(--color-bg-400)",
          500: "var(--color-bg-500)",
          DEFAULT: "var(--color-bg)",
        },

        /* Primary (Lotion — light rose) */
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          DEFAULT: "var(--color-primary-500)",
        },

        /* Secondary (Khmer Curry — brand red) */
        secondary: {
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)",
          DEFAULT: "var(--color-secondary-600)",
        },

        /* Accent (Lemon Punch — yellow) */
        accent: {
          100: "var(--color-accent-100)",
          200: "var(--color-accent-200)",
          300: "var(--color-accent-300)",
          400: "var(--color-accent-400)",
          500: "var(--color-accent-500)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
          800: "var(--color-accent-800)",
          900: "var(--color-accent-900)",
          DEFAULT: "var(--color-accent-500)",
        },

        /* Neutral (Grayscale) */
        neutral: {
          100:  "var(--color-neutral-100)",
          200:  "var(--color-neutral-200)",
          300:  "var(--color-neutral-300)",
          400:  "var(--color-neutral-400)",
          500:  "var(--color-neutral-500)",
          600:  "var(--color-neutral-600)",
          700:  "var(--color-neutral-700)",
          800:  "var(--color-neutral-800)",
          900:  "var(--color-neutral-900)",
          1000: "var(--color-neutral-1000)",
        },

        /* Alerts */
        success: {
          100: "var(--color-success-100)",
          500: "var(--color-success-500)",
          900: "var(--color-success-900)",
          DEFAULT: "var(--color-success-500)",
        },
        error: {
          100: "var(--color-error-100)",
          500: "var(--color-error-500)",
          900: "var(--color-error-900)",
          DEFAULT: "var(--color-error-500)",
        },
        warning: {
          100: "var(--color-warning-100)",
          500: "var(--color-warning-500)",
          900: "var(--color-warning-900)",
          DEFAULT: "var(--color-warning-500)",
        },
        info: {
          100: "var(--color-info-100)",
          500: "var(--color-info-500)",
          900: "var(--color-info-900)",
          DEFAULT: "var(--color-info-500)",
        },
      },

      /* ------------------------------------------------
         BORDER RADIUS
      ------------------------------------------------ */
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "pill": "9999px",
      },

      /* ------------------------------------------------
         BOX SHADOW
      ------------------------------------------------ */
      boxShadow: {
        card:  "0 2px 16px 0 rgba(0,0,0,0.08)",
        modal: "0 8px 40px 0 rgba(0,0,0,0.16)",
      },
    },
  },
  plugins: [],
};

export default config;