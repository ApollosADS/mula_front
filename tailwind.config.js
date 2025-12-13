/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        mula: {
          red: '#E00000',
          redDark: '#B00000',
          green: '#009000',
          light: '#fafafa',
          white: '#FFFFFF',
          black: '#1e1e1e'
        }
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        display: ['var(--font-mula-display)', 'Inter', 'sans-serif'], // Typographie MŪLA pour les titres (Black Heavy)
      },
      boxShadow: {
        'card': '0px 0px 15px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}

