/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {},
    // colors: {
    //   primary: "#F8F9FA",
    //   secondary: "#3BB67F",
    //   third: "#D9F1E4",
    // },
  },
  plugins: [flowbite.plugin()],
};
