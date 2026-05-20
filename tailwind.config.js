/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#7c3aed',
        glass: 'rgba(255,255,255,0.06)'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2,6,23,0.18)',
        floating: '0 20px 50px rgba(2,6,23,0.12)'
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'fade-in': 'fadeIn 400ms ease-out both'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.06))'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
