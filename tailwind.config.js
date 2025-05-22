/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
     "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        handwritten: ['"Nanum Pen Script"', "cursive"],
        pretendard: ['Pretendard', 'sans-serif'],
    },
    colors: {
      dreamPurple: "#c084fc",
      dreamPink: "#fca5a5",
      dreamSky: "#a5f3fc",
    },
    backgroundImage: {
      'dream-bg': "url('/bg-moon.png')",
    },
   },
  },
  plugins: [],
}

