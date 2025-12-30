/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        burtons: "burtons",
      },
      colors: {
        // Primary palette - Dark futuristic theme
        'deep-space': '#0A0E1A',
        'midnight': '#1E293B',
        'cosmic-purple': '#7C3AED',
        'neon-cyan': '#06B6D4',
        'silver-mist': '#94A3B8',
        'success-green': '#10B981',
        
        // Accent colors for premium feel
        'accent-gold': '#F59E0B',
        'accent-coral': '#F472B6',
        'slate-dark': '#334155',
        'slate-light': '#CBD5E1',
        
        // Legacy support (mapped to new palette)
        primary: '#7C3AED',
        secondary: '#06B6D4',
        accent: '#10B981',
        'dark-slate': '#1E293B',
        'light-blue': '#0F172A',
        'tech-blue': '#1E3A5F',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-intense': '0 0 60px rgba(124, 58, 237, 0.5), 0 0 100px rgba(6, 182, 212, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 40px rgba(124, 58, 237, 0.2)',
        // 3D-inspired depth shadows
        'depth': '0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
        'depth-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15)',
        'isometric': '8px 8px 0 0 rgba(124, 58, 237, 0.15)',
        'isometric-lg': '12px 12px 0 0 rgba(124, 58, 237, 0.2)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elevated-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(124, 58, 237, 0.1)',
      },
      backgroundImage: {
        // Gradients removed for flat design - using patterns instead
        'dot-pattern': 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 1px, transparent 1px)',
        'grid-pattern': 'linear-gradient(rgba(124, 58, 237, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '30px 30px',
        'grid-sm': '20px 20px',
        'grid-md': '40px 40px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay': 'fadeUp 0.8s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.4s forwards',
        'fade-up-delay-3': 'fadeUp 0.8s ease-out 0.6s forwards',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-light': 'bounce 2s infinite',
        'reveal': 'reveal 0.6s ease-out forwards',
        // New premium animations
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'elevate': 'elevate 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'perspective-float': 'perspectiveFloat 6s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // New premium keyframes
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        elevate: {
          '0%': { transform: 'translateY(0)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
          '100%': { transform: 'translateY(-8px)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        perspectiveFloat: {
          '0%, 100%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)' },
          '75%': { transform: 'perspective(1000px) rotateX(-2deg) rotateY(-2deg)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
}
