module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    letterSpacing: {
      widest: '.16em',
    },
    backdropBlur: {
      xs: '2px',
    },
    opacity: {
      '15': '.15',
    },

    extend: {
      colors: {
        'background': '#030303',
        'bluelight': '#24aac2',
      },
      blur: {
        xx: '100px',
      },
      dropShadow: {
        'toxl': '0px 0px 20px rgb(0 0 0 / 0.1)',
        'tol': '0px 0px 10px rgb(0 0 0 / 1)',
        'n2xl': '0px 0px 20px rgb(0 0 0 / 0.15)'
      },
      maxHeight: {
        '3xl': '42rem',
      },
      margin: {
        '100': '450px',
      }
    },
  },
  plugins: [],
}