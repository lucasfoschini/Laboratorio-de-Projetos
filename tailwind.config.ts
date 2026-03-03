import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff5ff",
          100: "#dce8fd",
          200: "#c1d5fb",
          300: "#96b8f8",
          400: "#6492f3",
          500: "#3f6dee",
          600: "#2952e3",
          700: "#2141d0",
          800: "#2137a8",
          900: "#1e3185",
          950: "#172155",
        },
        neutral: {
          0:   "#ffffff",
          50:  "#f8fafc",
          100: "#f1f4f9",
          200: "#e2e8f2",
          300: "#c8d3e4",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#060d1a",
        },
        success: { 50: "#f0fdf4", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534" },
        warning: { 50: "#fffbeb", 500: "#f59e0b", 600: "#d97706", 700: "#b45309" },
        danger:  { 50: "#fff1f2", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c" },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:   "0 1px 3px 0 rgba(15,23,42,.06), 0 1px 2px -1px rgba(15,23,42,.04)",
        "card-md": "0 4px 12px -2px rgba(15,23,42,.08), 0 2px 4px -2px rgba(15,23,42,.05)",
        "card-lg": "0 12px 32px -4px rgba(15,23,42,.12), 0 4px 8px -4px rgba(15,23,42,.06)",
        brand:  "0 4px 16px 0 rgba(41,82,227,.30)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-up":   "fadeUp 0.45s ease both",
        "fade-in":   "fadeIn 0.3s ease both",
        "slide-in":  "slideIn 0.3s ease both",
      },
      keyframes: {
        fadeUp:  { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
        slideIn: { from: { opacity: "0", transform: "translateX(-12px)" }, to: { opacity: "1", transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};

export default config;
