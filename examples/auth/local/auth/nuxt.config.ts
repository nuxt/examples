// https://nuxt.com/docs/api/configuration/nuxt-config

// This code is demo only.
if (!process.env.NUXT_AUTH_PASSWORD) {
  console.warn('Security warning: NUXT_AUTH_PASSWORD is not set. Using an example value. Please set it otherwise your session is unsecure!')
  process.env.NUXT_AUTH_PASSWORD = 'secretsecretsecretsecretsecretsecretsecret'
}

export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      name: 'nuxt-session',
      password: process.env.NUXT_AUTH_PASSWORD || '',
    },
  },

  compatibilityDate: '2024-04-03',
  nitro: {
    storage: {
      '.data:auth': { driver: 'fs', base: './.data/auth' },
    },
  },
})
