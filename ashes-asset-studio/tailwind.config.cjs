const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cinzel'", ...defaultTheme.fontFamily.serif],
        body: ["'Inter'", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ash: {
          50: "#f7f5f2",
          100: "#e4ded7",
          200: "#cfc2b3",
          300: "#bba68f",
          400: "#a98d6d",
          500: "#8f7253",
          600: "#725940",
          700: "#564131",
          800: "#3a2b20",
          900: "#1f1711"
        }
      }
    }
  },
  plugins: []
};
