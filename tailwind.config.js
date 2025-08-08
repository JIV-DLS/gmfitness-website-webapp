/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Activation du mode sombre avec classe
  theme: {
    extend: {
      colors: {
              primary: {
        50: '#f0f9ff',   // Ciel très clair
        100: '#e0f2fe',  // Ciel doux
        200: '#bae6fd',  // Bleu lagoon clair
        300: '#7dd3fc',  // Azur clair
        400: '#38bdf8',  // Bleu méditerranée
        500: '#0ea5e9',  // Bleu Côte d'Azur principal
        600: '#0284c7',  // Bleu mer profonde
        700: '#0369a1',  // Bleu océan
        800: '#075985',  // Bleu marine
        900: '#0c4a6e',  // Bleu nuit
      },
      azure: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
      ocean: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      mediterranean: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
      },
        // Couleurs personnalisées pour le mode sombre
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 25%, #0891b2 50%, #0369a1 75%, #075985 100%)',
        'azure-sky': 'linear-gradient(to bottom, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #7dd3fc 75%, #38bdf8 100%)',
        'mediterranean': 'linear-gradient(45deg, #0ea5e9, #22d3ee, #06b6d4, #0891b2)',
        'cannes-sunset': 'linear-gradient(to right, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #fbbf24 75%, #f59e0b 100%)',
        'ocean-waves': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'ocean-wave': 'wave 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateX(30px) translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateX(-20px) translateY(5px) rotate(-1deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}