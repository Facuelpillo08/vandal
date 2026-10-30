/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': '#0D0C0B',
        'stone-dark': '#181614',
        'copper': '#D48C46',
        'copper-glow': '#E6A96B',
        'status-green': '#10B981',
        'ivory': '#F5F2EB',
        'muted-editorial': '#8C857B',
        'border-line': '#292521',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'serif'],
        display: ['Oswald', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'copper-glow': '0 0 20px -2px rgba(212, 140, 70, 0.45)',
        'copper-subtle': '0 0 12px 0 rgba(212, 140, 70, 0.25)',
      }
    },
  },
  plugins: [],
}
