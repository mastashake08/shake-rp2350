// nuxt.config.ts
import { definePerson, defineSoftwareApp } from 'nuxt-schema-org/schema'
export default defineNuxtConfig({
  app: {
    baseURL: '/shake-rp2350/', // Replace <repo-name> with your GitHub repository name
  },
  schemaOrg: {
    identity: definePerson({
      type: 'Person',

      // Basic Information, if applicable
      name: 'Jyrone Dion Parker',
      givenName: 'Jyrone',
      familyName: 'Parker',
      additionalName: 'Dion', // middle name or other additional names
      alternateName: 'Jyrone D. Parker',

      // Profile Information, if applicable
      image: '/shake-rp2350/headshot.jog',
      description: 'Software engineer, AI researching and tech rapper',
      jobTitle: 'Founder',

      // Contact & Social, if applicable
      email: 'jyrone.parker@gmail.com',
      url: 'https://jyroneparker.com',
      sameAs: [
        'https://twitter.com/jyroneparker',
        'https://github.com/mastashake08',
        'https://linkedin.com/in/jyroneparker',
        'https://youtube.com/c/jyroneparker'
      ],

      // Professional Details, if applicable
      worksFor: {
        '@type': 'Organization',
        'name': 'J Computer Solutions LLC',
        'url': 'https://jcompsolu.com'
      },
    })
  },
  modules: ['@nuxtjs/google-adsense', '@nuxtjs/tailwindcss', '@vite-pwa/nuxt', 'nuxt-schema-org'],

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
          sizes: '1024x1024',
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