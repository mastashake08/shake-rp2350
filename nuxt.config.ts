// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    baseURL: '/shake-rp2350/', // Replace <repo-name> with your GitHub repository name
  },
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
  ssr: false,
  vite: {
    build: {
      target: 'esnext', // Use modern JavaScript features
    },
  },
});