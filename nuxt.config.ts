export default defineNuxtConfig({
  compatibilityDate: '2025-08-03',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  
  // Performance optimizations
  experimental: {
    payloadExtraction: false, // Faster hydration
    inlineSSRStyles: false
  },
  
  // SSR Configuration for better performance
  ssr: true,
  
  // Route Rules for caching and performance
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Teams pages cached for 60 seconds
    '/teams/**': { 
      isr: 60,
      headers: { 'Cache-Control': 's-maxage=60' }
    },
    // API routes cached for 30 seconds
    '/api/teams/**': { 
      cors: true,
      headers: { 
        'Cache-Control': 's-maxage=30',
        'Access-Control-Allow-Origin': '*'
      } 
    }
  },
  
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.svg' }
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
