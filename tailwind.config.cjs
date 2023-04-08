/** @type {import('tailwindcss').Config} */
module.exports = {
  important: false,

  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],

  corePlugins: {
    textColor: false,
    backgroundColor: false,
    borderWidth: false,
  },

  theme: {
    spacing: {
      '10px': '10px',
      '20px': '20px',
      '30px': '30px',
      '40px': '40px',
      '80px': '80px',
      0: '0',
      0.25: '0.25rem',
      0.5: '0.5rem',
      1: '1rem',
      1.5: '1.5rem',
      2: '2rem',
      2.5: '2.5rem',
      3: '3rem',
      3.5: '3.5rem',
      4: '4rem',
      4.5: '4.5rem',
      5: '5rem',
      5.5: '5.5rem',
      6: '6rem',
      6.5: '6.5rem',
      7: '7rem',
    },

    fontSize: {
      xs: ['0.75rem', '1.5'],
      sm: ['0.875rem', '1.75'],
      base: ['1rem', '1.75'],
      lg: ['1.125rem', '1.75'],
      xl: ['1.25rem', '2'],
    },

    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      move: 'move',
      'not-allowed': 'not-allowed',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        sm: '20px',
        lg: '40px',
        xl: '80px',
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
