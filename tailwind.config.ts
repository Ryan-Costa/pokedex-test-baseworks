/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Adiciona suporte para arquivos Vue e TypeScript
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      boxShadow: {
        "inside-custom": "var(--box-shadow-inside)",
        "outside-custom": "var(--box-shadow-outside)",
      },
      colors: {
        primary: "var(--primary)",
        bug: "var(--bug)",
        dark: "var(--dark)",
        dragon: "var(--dragon)",
        electric: "var(--electric)",
        fairy: "var(--fairy)",
        fighting: "var(--fighting)",
        fire: "var(--fire)",
        flying: "var(--flying)",
        ghost: "var(--ghost)",
        normal: "var(--normal)",
        grass: "var(--grass)",
        ground: "var(--ground)",
        ice: "var(--ice)",
        poison: "var(--poison)",
        psychic: "var(--psychic)",
        rock: "var(--rock)",
        steel: "var(--steel)",
        water: "var(--water)",
        darkPrimary: "var(--dark-primary)",
        darkGray: "var(--dark-gray)",
        mediumGray: "var(--medium-gray)",
        lightGray: "var(--light-gray)",
        grayscaleBackground: "var(--grayscale-background)",
        background: "var(--background)",
      },
    },
  },
  plugins: [],
};
