/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pcl-navy': '#003B6F',
        'pcl-navy-light': '#004F96',
        'pcl-gold': '#C4A962',
        'pcl-gold-light': '#D4BC7A',
        'pcl-gold-dark': '#A8904F',
        'pcl-white': '#FFFFFF',
        'pcl-gray': '#F5F5F5',
        'pcl-text': '#1A1A2E',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        data: ['DM Mono', 'Courier New', 'monospace'],
      },
      maxWidth: {
        'mobile': '430px',
      },
      height: {
        'mobile': '932px',
      },
    },
  },
  plugins: [],
}
