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
    scale: {
      '105': '1.05',
      '102': '1.02',
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
        'toxl': '0 20px 10px rgba(49, 200, 242, 0.5)',
        'tol': '0 -50px 10px rgba(59, 130, 246, 0.3)',
        'n2xl': '0px 0px 20px rgb(0 0 0 / 0.15)'
      },
      maxHeight: {
        '3xl': '42rem',
      },
    },
  },
  plugins: [],
}