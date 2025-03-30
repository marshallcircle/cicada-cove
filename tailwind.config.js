/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cicada-green": "#56733C",
        "cicada-yellow": "#FDD865",
        "cicada-tan": "#F3EEE3",
        "cicada-black": "#25282A",
        "cicada-gray": "#A3A7A8",
      },
      fontFamily: {
        sans: ["var(--font-lato)"],
        serif: ["var(--font-merriweather)"],
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
}