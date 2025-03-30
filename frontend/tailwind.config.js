module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Ensure correct path to JSX/TSX files
    "./app/**/*.{js,ts,jsx,tsx}",  
    "./components/**/*.{js,ts,jsx,tsx}",  
    "./pages/**/*.{js,ts,jsx,tsx}",  // Add pages folder if using Next.js
    "./index.html"  // If using Vite
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
