/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#F7FEE7',
          100: '#ECFCCA',
          200: '#D8F999',
          300: '#BBF451',
          400: '#9AE630',
          500: '#7CCF35',
          600: '#5EA529',
          700: '#497D15',
          800: '#3C6301',
          900: '#35530E',
          950: '#192E03'
        },
        'secondary': {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#B9F8CF',
          300: '#7BF1A8',
          400: '#05DF72',
          500: '#31C950',
          600: '#2AA63E',
          700: '#178236',
          800: '#016630',
          900: '#0D542B',
          950: '#032E15'
        }
      }
    },
  },
  plugins: [],
}

