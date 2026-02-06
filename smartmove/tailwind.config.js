module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)'
      },
      borderRadius: {
        card: '1rem',
        button: '0.75rem'
      }
    }
  },
  plugins: [],
}
