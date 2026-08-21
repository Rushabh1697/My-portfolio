/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Impact', 'Anton', 'League Gothic', 'sans-serif'],
        quote: ['Bebas Neue', 'Roboto Condensed', 'sans-serif'],
        hud: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'spider-gradient': 'linear-gradient(180deg, #100101 0%, #700606 18%, #bc1313 45%, #d42222 62%, #780707 85%, #050000 100%)',
        'scarlet-hotspot': 'radial-gradient(ellipse 80% 55% at 50% 64%, rgba(240, 45, 45, 0.45) 0%, rgba(190, 18, 18, 0.3) 40%, rgba(80, 5, 5, 0.25) 75%, rgba(10, 0, 0, 0.20) 100%)',
        'top-vignette': 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.12) 40%, transparent 100%)',
        'bottom-vignette': 'linear-gradient(to top, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.12) 40%, transparent 100%)',
      }
    },
  },
  plugins: [],
}
