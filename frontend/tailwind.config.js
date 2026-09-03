/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#080706',
          900: '#0D0B0A',
          850: '#15100E',
          800: '#1B1512',
          700: '#2A2420',
          600: '#4A403A',
          500: '#8A7E76',
        },
        accent: {
          ivory: '#F4EBDD',
          gold: '#C8A96B',
          copper: '#B86B4B',
          emerald: '#4F8A70',
        },
        savings: {
          500: '#4F8A70',
          600: '#3D6C58',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        price: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 10px 40px -10px rgba(200, 169, 107, 0.15)',
        'dark-glass': '0 20px 50px -10px rgba(0, 0, 0, 0.9)',
      }
    },
  },
  plugins: [],
}
