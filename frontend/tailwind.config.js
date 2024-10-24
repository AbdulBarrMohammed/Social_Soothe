/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      padding: {
        '30px': '30px',
      },
      colors: {
        pink: 'rgb(242, 175, 212)',
        lightRed: 'rgb(237, 111, 133)',
        lightOrange: 'rgb(242, 169, 86)',
        myBlue: 'rgb(88, 168, 248)',
        myYellow: 'rgb(247, 208, 70)',
        emojiHappy: 'rgb(251, 235, 190)',
        emojiHappyWord: 'rgb(195, 159, 60)',
        emojiSad: 'rgb(233, 234, 253)',
        emojiSadWord: 'rgb(69, 74, 186)',
        emojiAngry: 'rgb(249, 230, 224)',
        emojiAngryWord: 'rgb(209, 112, 83)',
        emojiEmbarrassed: 'rgb(214, 249, 246)',
        emojiEmbarrassedWord: 'rgb(87, 156, 149)',
        emojiWorried: 'rgb(232, 218, 250)',
        emojiWorriedWord: 'rgb(123, 57, 196)',
        emojiStressed: 'rgb(250, 225, 238)',
        emojiStressedWord: 'rgb(205, 92, 146)',
        modalBg: 'rgba(0, 0, 0, .7)',
        bgBlue: 'rgb(238, 235, 253)',
        deepBlue: 'rgb(40, 95, 229)',
        bgDeepBlue: 'rgb(29, 34, 39)'

      },
    },
  },
  plugins: [],
}
