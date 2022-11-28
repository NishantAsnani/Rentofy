/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html", "./src/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
      'Zilla':['Zilla Slab','serif'],
      'font1':['Exo\\ 2','sans-serif'],
      'Montserrat':['Montserrat','sans-serif'],
      'Roboto':['Roboto','sans-serif']
      },
      animation:{
        slideLeft:'slideLeft 1000ms linear 1 forwards',
        slideRight:'slideRight 1000ms linear 1 forwards'
      },
      keyframes:{
        slideLeft:{
          '0%':{transform:'translateX(0px)'},
          '20%':{transform:'translateX(260px)'},
          '100%':{transform:'translateX(1300px)'},
        },
        slideRight:{
          '0%':{transform:'translateX(0px)'},
          '20%':{transform:'translateX(-260px)'},
          '100%':{transform:'translateX(-1300px)'},
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
    require('flowbite/plugin')
  ],
}
