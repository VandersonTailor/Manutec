/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        manutec: {
          dark: "#090C12",
          graphite: "#111827",
          blue: "#0B1E3A",
          light: "#F3F4F6",
          neon: "#38BDF8",
          danger: "#EF4444",
        },
      },
      boxShadow: {
        glow: "0 0 24px rgba(56, 189, 248, 0.35)",
        redglow: "0 0 24px rgba(239, 68, 68, 0.35)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 700ms ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
