/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "banner-imagem" : "url('./src/assets/banner-image.svg')",
        "login-imagem" : "url('./src/assets/plano-de-fundo-login.png')"
      }
    },
  },
  plugins: [],
}

