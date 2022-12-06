/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      background: 'rgb(var(--color-background) / <alpha-value>)',
      text: 'rgb(var(--color-text) / <alpha-value>)',
      accent: 'rgb(var(--color-accent) / <alpha-value>)',
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      'primary-alt': 'rgb(var(--color-primary-alt) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      'secondary-alt': 'rgb(var(--color-secondary-alt) / <alpha-value>)',
    }
  },
  plugins: [],
};
