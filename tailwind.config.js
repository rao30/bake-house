/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        bh: {
          bg: "#f9f3e5",
          ink: "#4a3b32",
          accent: "#ebaeb3",
          accentDark: "#d65a66"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"Courier Prime"', 'monospace']
      }
    }
  },
  plugins: []
};
