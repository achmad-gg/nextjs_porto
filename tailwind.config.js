module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000", // Hitam
        secondary: "#FFFFFF", // Putih
      },
      backgroundImage: {
        "gradient-black-white":
          "linear-gradient(to right, #000000, #4B5563, #FFFFFF)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
