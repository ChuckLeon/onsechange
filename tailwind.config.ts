import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f0f5",
          100: "#c8d8e4",
          200: "#a8c0d3",
          300: "#88a8c2",
          400: "#6890b1",
          500: "#4a7ba0",
          600: "#3d6b8f",
          700: "#305b7e",
          800: "#234b6d",
          900: "#163b5c",
          950: "#0f172a",
        },
        secondary: {
          50: "#e8eaed",
          100: "#d1d5db",
          200: "#9ca3af",
          300: "#6b7280",
          400: "#4b5563",
          500: "#374151",
          600: "#1f2937",
          700: "#111827",
          800: "#0f172a",
          900: "#0a0e1a",
          950: "#020617",
        },
        background: {
          light: "#ffffff",
          dark: "#0f172a",
          DEFAULT: "#0f172a",
        },
        error: {
          DEFAULT: "#ef4444",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#64748b",
          error: "#ef4444",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
