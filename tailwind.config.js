import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './*.html',
    './pages/**/*.{html,js}',
    './src/**/*.{js,ts,svelte,vue}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#010101'
      },
      maxWidth: {
        '2xl': '104rem'
      },
      maxHeight: {
        screen: '100dvh', // Фикс проблемы скролла на iOS с max-h-screen и 100dvh
      },
      screens: {
        ...defaultTheme.screens,
        md: '770px',
        lg: '1100px',
        xl: '1350px',
        '2xl': '1720px',
      },
      spacing: {
        '20vh': '15vh',
      },
    },
  },
  plugins: [],
}
