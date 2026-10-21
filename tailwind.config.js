/** @type {import('tailwindcss').Config} */
// Colours come from CSS variables (see index.css) so light and dark mode share the same class names.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Nunito', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: v('paper'),
        surface: v('surface'),
        night: v('night'),
        ink: {
          DEFAULT: v('ink'),
          soft: v('ink-soft'),
          muted: v('ink-muted'),
        },
        line: v('line'),
        accent: {
          DEFAULT: v('accent'),
          soft: v('accent-soft'),
        },
        brand: v('brand'),
        'on-brand': v('on-brand'),
        pop: v('pop'),
      },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--shadow) / 0.05), 0 10px 30px -14px rgb(var(--shadow) / var(--shadow-strength))',
        lift: '0 2px 6px rgb(var(--shadow) / 0.06), 0 24px 48px -20px rgb(var(--shadow) / calc(var(--shadow-strength) * 1.8))',
      },
    },
  },
  plugins: [],
};
