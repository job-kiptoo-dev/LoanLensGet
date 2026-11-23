import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b10",
        surface: "#14141b",
        raised: "#1a1a23",
        line: "#26262f",
        ink: "#f2f2f5",
        muted: "#9a9aa8",
        accent: { DEFAULT: "#7c3aed", hover: "#8b5cf6", soft: "#a78bfa" },
        amber: { tag: "#f59e0b" },
        good: "#22c55e",
      },
      fontFamily: {
        display: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
