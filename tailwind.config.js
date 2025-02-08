/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#057AFF",
        darkGray: "#202224",
        lightBlue: "#f9fbff",
        inputsColor: "#4B4B4B",
        lightGray: "#d1d5db",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      boxShadow: {
        box: "0px 4px 12px rgba(226, 236, 249, 0.5)",
      },
      borderRadius: {
        box: "14px",
      },
    },
  },
  plugins: [],
};
