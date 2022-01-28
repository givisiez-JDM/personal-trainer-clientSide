module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primaryGreen: '#bff022',
      primaryGray: '#9b9c98',
      secondaryGray: '#242d12',
    },
    fontFamily: {},
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
