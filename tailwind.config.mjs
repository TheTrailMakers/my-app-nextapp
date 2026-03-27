/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ------------------------------------------------
         Brand palette — static, mode-independent values.
         For mode-aware colors use the CSS var tokens
         (bg-background, text-foreground, bg-primary, etc.)
         ------------------------------------------------ */
      colors: {
        // Sunset / amber — primary CTA family
        // `bg-primary` already maps to the CSS var.
        // These are for one-off brand usage only.
        primary: {
          DEFAULT: "#F47B3F",
          light: "#F9A876",
          dark: "#D4612A",
        },
        // Surface aliases kept for backward compat during migration
        bg: {
          main: "#f5f0e8",
          card: "#fdfcfa",
          soft: "#ede8dc",
        },
        accent: {
          green: "#7a9e6e",
          peach: "#F2B49A",
        },
        text: {
          primary: "#2a2017",
          secondary: "#6b6356",
          muted: "#9e9688",
        },
        success: "#7a9e6e",
        error: "#c4501a",
        border: "#e2dbd0",
        brand: {
          forest: "#1a2e1a",
          moss: "#3d5c2e",
          sage: "#7a9e6e",
          sand: "#f5f0e8",
          warmwhite: "#faf8f4",
          burnt: "#c4601a",
          amber: "#e8a040",
        },
      },

      fontFamily: {
        display: ["var(--font-merriweather)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },

      borderRadius: {
        pill: "999px",
        card: "16px",
        "card-lg": "24px",
      },

      boxShadow: {
        warm: "0 4px 20px oklch(0.65 0.19 52 / 0.08)",
        "warm-md": "0 8px 30px oklch(0.65 0.19 52 / 0.12)",
        "warm-lg": "0 12px 40px oklch(0.65 0.19 52 / 0.16)",
        "warm-xl": "0 20px 60px oklch(0.65 0.19 52 / 0.20)",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      /* Motion tokens — reference CSS vars for consistency */
      transitionDuration: {
        instant: "75ms",
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        enter: "500ms",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-smooth": "cubic-bezier(0.45, 0, 0.55, 1)",
      },

      zIndex: {
        base: "0",
        raised: "10",
        sticky: "100",
        dropdown: "200",
        overlay: "300",
        modal: "400",
        toast: "500",
        max: "999",
      },

      keyframes: {
        "slide-left": {
          from: { transform: "translateX(0px)" },
          to: { transform: "translateX(-3000px)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },

      animation: {
        "slide-left": "slide-left 60s linear 2s infinite alternate",
        "fade-in": "fade-in var(--duration-normal) var(--ease-out) both",
        "fade-in-up": "fade-in-up var(--duration-normal) var(--ease-out) both",
        "fade-in-down":
          "fade-in-down var(--duration-normal) var(--ease-out) both",
        "scale-in": "scale-in var(--duration-normal) var(--ease-out) both",
      },
    },

    screens: {
      "below-xs": { max: "360px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};

export default config;
