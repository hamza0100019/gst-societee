module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}', // Analyse des fichiers JavaScript et JSX
  ],
  theme: {
    extend: {
      // Ajout des animations et des keyframes pour "shake"
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out', // Animation pour le tremblement
      },
    },
  },
  plugins: [],
};
