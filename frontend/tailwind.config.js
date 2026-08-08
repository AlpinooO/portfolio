/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--c-ink)",
        surface: "var(--c-surface)",
        surface2: "var(--c-surface2)",
        offwhite: "var(--c-text)",
        muted: "var(--c-muted)",
        cyan: "var(--c-accent)",
        amber: "var(--c-accent2)",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
