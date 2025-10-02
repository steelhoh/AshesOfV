/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bgTop: "#2e2e2e",
          bgBot: "#111111",
          frame: "#550000",
          red:   "#e74c3c",
          gold:  "#f39c12",
          text:  "#f2f2f2",
          muted: "#bbbbbb",
        },
      },
      boxShadow: {
        card: "0 0 20px rgba(0,0,0,0.8)",
      },
      borderRadius: {
        brand: "1.25rem",
      }
    },
  },
  plugins: [],
}
