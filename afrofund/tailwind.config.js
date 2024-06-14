/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs : '340px'
      },
      colors: {
        greenColor: '#D4EE25',
        blackColor: '#0A0A0A',
        grayishColor: '#E9E9E9',
        whiteColor: '#FAFAFA',
        blueColor : '#0361FD',
        lightRedColor: '#FED7D7',
        darkRedColor: '#E53E3E',
        greenTransparent: "rgba(212, 238, 37, 0.8)"
      },
      borderRadius: {
        needed: '0.375rem',
      },
      height: {
        'screen-70': 'calc(100vh - 70px)'
      }
    },
  },
  plugins: [],
}