/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[,
            "./views/**/*.ejs",
            "./node_modules/flowbite/**/*.js"
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
          slideRight:'slideRight 1000ms linear 1 forwards',
          fadeIn:'fadeIn 1000ms linear 1 forwards'
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
          fadeIn:{
            '0%':{opacity:0},
            '20%':{opacity:0.5},
            '100%':{opacity:1},
          }
        },
    },
  },
  plugins: [
    require('tailwindcss-animation-delay'),
    require('flowbite/plugin')
  ],
}
