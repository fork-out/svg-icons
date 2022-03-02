const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        display: ["Gilroy", ...defaultTheme.fontFamily.sans]
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "100rem",
        "10xl": "112rem"
      }
    }
  },
  plugins: []
};
