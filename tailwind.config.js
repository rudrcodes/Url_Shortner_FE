// tailwind.config.js
module.exports = {
    theme: {
      extend: {
        textShadow: {
          white: '5px 5px 5px rgba(255,255,255,1)',
        },
      },
    },
    plugins: [
      require('tailwindcss-textshadow')
    ],
  }
  