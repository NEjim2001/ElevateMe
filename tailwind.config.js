/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/routes/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7D9BF8",
        secondary: "#406EFF",
        tertiary: "#97C8C2",
        primaryOpacity: "rgba(125, 155, 248, 0.3)",
        secondaryOpacity: "rgba(64, 110, 255, 0.3)",
        tertiaryOpacity: "rgba(151, 200, 194, 0.3)",
      },
    },
  },
  plugins: [],
};
