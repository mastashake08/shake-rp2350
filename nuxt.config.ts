// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/google-adsense', '@nuxtjs/tailwindcss'],

  'google-adsense': {
    id: 'ca-pub-xxxxxxxxxxxxxxxx' // Replace with your Google AdSense ID
  },

  pwa: {
    manifest: {
      name: 'Shake RP2350',
      short_name: 'ShakeRP',
      description: 'PWA for RP2350 device control and file upload',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
  },

  compatibilityDate: '2024-11-21',
  ssr: false
});