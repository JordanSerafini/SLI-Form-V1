/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: ['active'],
      
      width: {
        '0.5/10': '5%',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '4.5/10': '45%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
        '10/10': '100%',
      },
      height: {
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
        '9.5/10': '95%',

        '10/10': '100%',
      },

      colors: {
        'blue-strong': '#344D59',
        'blue-light': '#226D68',
        'whiteperso': '#ECF8F6',
        'cream': '#709CA7',
        'brownperso': '#B8CBD0',

        '1c': '#18534F',
        '2c': '#226D68',
        '3c': '#ECF8F6',
        '4c': '#FEEAA1',
        '5c': '#D6955B',

        '6c': '#137C8B',
        '7c': '#709CA7',
        '8c': '#B8CBD0',
        '9c': '#7A90A4',
        '10c': '#344D59',

      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      screens: {
        'sm': '330px',
        'w600': '600px',

      },
      
    },
  },
  plugins: [
    

  ],
}