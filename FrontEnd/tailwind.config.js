/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        common: {
          "back-color": "#F7F7F7",
          "white-divider": "#D9D9D9",
          "bold-back-color": "#C4C4C4",
          peach: "#FA709A",
          orange: "#FB9B77",
          "text-color": "#1E2B4F",
          "text-gray-color": "#AEB0B6",
          "modal-blur": "#333333",
        },
        cu: {
          p: "#652F8D",
          g: "#C5DC79",
        },
        seven: {
          r: "#E30613",
          g: "#1B932A",
          o: "#F18713",
        },
        gs: {
          b: "#006FBA",
          s: "#00D4EA",
        },
        emart: {
          y: "#FFB71C",
          g: "#636569",
        },
      },
      keyframes: {
        moveToRight: {
          "0%": { transform: `translateX(-500px)` },
          "100%": { transform: `translateX(0)` },
        },
      },
      animation: {
        moveToRight: "moveToRight 0.3s ease-out",
      },
    },
  },
};
