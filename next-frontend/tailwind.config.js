module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: '1024px',
      },
      colors: {
        'blue-light-900': '#1E3A8A',
        'light-gray' : '#F3EAEA', // Add your custom color here
      },

    },
  },
  plugins: [],
};
