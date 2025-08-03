export default defineNuxtConfig({
  compatibilityDate: '2025-08-03',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
  }
  // nitro: {
  //   experimental: {
  //     wasm: true
  //   },
  //   plugins: ['~/server/plugins/socket.ts']
  // }
})
