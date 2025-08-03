/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d7ae4',
          hover: '#0969da',
        },
        gray: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#9ca3af',
          500: '#666',
          600: '#495057',
          700: '#333',
          800: '#1f2937',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif']
      },
      maxWidth: {
        'container': '1200px'
      }
    },
  },
  plugins: [],
}

