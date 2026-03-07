/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:    '#FDF8F3',
        blush:    '#F2C4CE',
        gold:     '#C9A84C',
        espresso: '#2C1A0E',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-in':  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in':        'fade-in 0.8s ease-out',
        'slide-up':       'slide-up 0.8s ease-out',
        'slide-up-delay': 'slide-up 0.8s ease-out 0.2s both',
      },
    },
  },
  plugins: [],
}
