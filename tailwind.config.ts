import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy operations palette
        bone: "#F5F1E8",        // background
        cream: "#EDE6D3",       // panels
        moss: "#2F4A2A",        // primary forest green
        sage: "#7A8B5C",        // muted green
        clay: "#B8543A",        // terracotta accent
        rust: "#8C3A1F",        // deeper accent
        ink: "#1A1A17",         // primary text
        slate: "#5C5A52",       // secondary text
        bark: "#3D2F22",        // brown
        sun: "#D9A441",         // mustard accent
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        stamp: "3px 3px 0 0 rgba(26,26,23,1)",
        "stamp-sm": "2px 2px 0 0 rgba(26,26,23,1)",
        inset: "inset 0 1px 2px 0 rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
