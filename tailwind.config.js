/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',    // Extra small devices (small phones)
      'sm': '640px',    // Small devices (phones)
      'md': '768px',    // Medium devices (tablets)
      'lg': '1024px',   // Large devices (desktops)
      'xl': '1280px',   // Extra large devices (large desktops)
      '2xl': '1536px',  // 2X Extra large devices (larger desktops)
      '3xl': '1920px',  // Ultra wide screens
      '4xl': '2560px',  // 4K and ultra-wide monitors
    },
    extend: {
      colors: {
        accent: '#F0FF26',
        terminal: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Monaco', 'monospace'],
      },
      fontWeight: {
        normal: '500',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight4: '-0.04em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [],
} 