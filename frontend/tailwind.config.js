/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        card: '#18181B',
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
        },
        purple: {
          main: '#7C3AED',
          hover: '#8B5CF6',
          active: '#6D28D9',
        },
        zinc: {
          800: '#27272A',
          900: '#18181B',
        },
        green: {
          main: '#10B981',
        },
        progress: {
          bg: '#27272A',
          fill: '#7C3AED',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Responsive font sizes using clamp()
        'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.35vw, 1rem)', { lineHeight: '1.5' }],
        'base': ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.6' }],
        'lg': ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.6' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.65vw, 1.5rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 0.9vw, 1.875rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 1.6rem + 1.2vw, 2.25rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 2rem + 1.5vw, 3rem)', { lineHeight: '1.1' }],
      },
      spacing: {
        // Responsive spacing
        'fluid-xs': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 0.65rem + 0.5vw, 1rem)',
        'fluid-md': 'clamp(1rem, 0.85rem + 0.75vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 1.25rem + 1.25vw, 2rem)',
        'fluid-xl': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
        'fluid-2xl': 'clamp(3rem, 2rem + 5vw, 4rem)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 30px rgba(124, 58, 237, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

