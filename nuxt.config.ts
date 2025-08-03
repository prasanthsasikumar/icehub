export default defineNuxtConfig({
  compatibilityDate: '2025-08-03',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css']
  // nitro: {
  //   experimental: {
  //     wasm: true
  //   },
  //   plugins: ['~/server/plugins/socket.ts']
  // }
})
