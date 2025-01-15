/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        org: "#F49B33",
        drk: "#1E1E1E",
        gry: "#CECECE",
      },
      fontFamily: {
        adlamDisplay: ["ADLaM Display", "sans-serif"],
        albertSans: ["Albert Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
