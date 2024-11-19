/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6c5dd3',
          hover: '#5c4dc3',
        },
        background: {
          dark: '#1a1b2e',
          light: '#2a2b4a',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(108, 93, 211, 0.5)',
      },
    },
  },
  plugins: [],
};