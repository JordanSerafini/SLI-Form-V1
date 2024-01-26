/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        '10/10': '100%',
      },

      colors: {
        'blue-strong': '#344D59',
        'blue-light': '#226D68',
        'whiteperso': '#ECF8F6',
        'cream': '#709CA7',
        'brownperso': '#B8CBD0',
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      screens: {
        'sm': '400px',
        'test': '500px',
        'md': '600px',

      },
      
    },
  },
  plugins: [],
}