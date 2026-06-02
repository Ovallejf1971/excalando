import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#F4F1EC", 2: "#EDE8E0", 3: "#E4DED2" },
        ink: { DEFAULT: "#222222", 2: "#3a3a3a", 3: "#6b6b6b" },
        dark: { DEFAULT: "#0F0F0F", 2: "#1A1A1A", 3: "#262626" },
        "ink-on-dark": { DEFAULT: "#F4F1EC", 2: "#C9C3B8", 3: "#8A857C" },
        accent: { DEFAULT: "#0066FF", 2: "#0052CC", 3: "#4D94FF" },
        line: { DEFAULT: "rgba(0,0,0,0.08)", 2: "rgba(0,0,0,0.14)" },
        "line-on-dark": { DEFAULT: "rgba(244,241,236,0.10)", 2: "rgba(244,241,236,0.18)" },
        success: "#2E7D5B",
        warn: "#C77700",
        danger: "#C62828",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ['"Mona Sans"', '"Geist"', "Inter", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', '"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(0,102,255,0.30)",
        card: "0 30px 80px -20px rgba(15,15,15,0.18)",
        "card-dark": "0 30px 80px -20px rgba(0,0,0,0.65)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
