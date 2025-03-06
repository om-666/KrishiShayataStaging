module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // Your existing animations
        'fadeIn': 'fadeIn 0.5s ease-out',
        'slideDown': 'slideDown 0.5s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'slideRight': 'slideRight 0.5s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
        // New animations from my suggestion
        'fadeInDown': 'fadeInDown 0.5s ease-out',
        'fadeInUp': 'fadeInUp 0.5s ease-out',
        'bounceIn': 'bounceIn 0.5s ease-out',
        'spinSlow': 'spin 2s linear infinite',
        'fadeIn': "fadeIn 0.5s ease-in-out",
        'scaleIn': "scaleIn 0.3s ease-in-out",
        'bounceIn': "bounceIn 0.5s ease-in-out",
        'slideDown': "slideDown 0.5s ease-in-out",
        'spinSlow': "spin 3s linear infinite",
        'pulseSlow': "pulse 4s infinite",
      },
      keyframes: {
        // Your existing keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        // New keyframes from my suggestion
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        // spin is already built into Tailwind, just modifying duration
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        bounceIn: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "60%": { transform: "translateY(5px)", opacity: "1" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        }
      },
    },
  },
  plugins: [],
}