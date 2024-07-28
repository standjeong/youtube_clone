const { default: youtube } = require('./src/api/youtube');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#ff0000',
      },
    },
  },
  plugins: [],
};
