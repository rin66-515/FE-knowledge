/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#bce3ff",
          300: "#8fd2ff",
          400: "#5bbaff",
          500: "#2f9dff",
          600: "#1c7df5",
          700: "#165fcc",
          800: "#164f9f",
          900: "#153f7d"
        }
      }
    }
  },
  plugins: []
};
