const { default: youtube } = require('./src/api/youtube');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#ff0000',
      },
      animation: {
        spin: 'spin 1000ms linear infinite',
        shine: 'shine 2s infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shine: {
          '0%': { '-webkit-mask-position': '150%' },
          '100%': { '-webkit-mask-position': '-50%' },
        },
      },
    },
  },
  plugins: [],
};
