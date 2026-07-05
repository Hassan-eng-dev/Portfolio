import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6d9fd5',
          50: '#f0f7ff',
          100: '#e2effd',
          200: '#c3ddf8',
          300: '#a7c8ec',
          400: '#8ab4e0',
          500: '#6d9fd5',
          600: '#4687ce',
          700: '#2b6eb6',
          800: '#1e558f',
          900: '#143c67',
          950: '#0c2845',
        },
        ink: {
          DEFAULT: '#16181d',
          50: '#f6f6f7',
          100: '#e8e9eb',
          200: '#cfd1d6',
          300: '#a6aab3',
          400: '#787e8a',
          500: '#5b616e',
          600: '#474c58',
          700: '#3a3e48',
          800: '#26282f',
          900: '#16181d',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.5rem', { lineHeight: '1.2' }],
        '5xl': ['3.5rem', { lineHeight: '1.1' }],
        '6xl': ['4.5rem', { lineHeight: '1.05' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      maxWidth: {
        content: '90rem',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out both',
        'fade-in-up': 'fade-in-up 500ms ease-out both',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
