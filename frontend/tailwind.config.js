/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarygray: '#f0f2f5',
        secondary: '#103ea8',
        tertiary: '#222222',
        slate: {
          10: '#f1f3f4',
        },
        green: {
          50: '#103ea8',
          90: '#103ea8',
        },
        gray: {
          10: '#EEEEEE',
          20: '#A2A2A2',
          30: '#7B7B7B',
          50: '#585858',
          90: '#141414',
        },
      },
     backgroundImage: {
        hero: "url('/src/assets/hero1.jpeg')",
        hero2:"url('src/assets/hero4.jpeg')",
        hero3:"url('src/assets/hero5.jpeg')",
        bgBanner:"url('src/assets/banneroffer.png')"
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
      borderRadius: {
        '5xl': '40px',
      },
    },
  },
  plugins: [],
}