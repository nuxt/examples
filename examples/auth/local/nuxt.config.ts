// https://nuxt.com/docs/api/configuration/nuxt-config

// This code is demo only.
if (!process.env.NUXT_AUTH_PASSWORD) {
  console.warn('Security warning: NUXT_AUTH_PASSWORD is not set. Using an example value. Please set it otherwise your session is unsecure!')
  process.env.NUXT_AUTH_PASSWORD = 'secretsecretsecretsecretsecretsecretsecret'
}

export default defineNuxtConfig({
  // Learn more: https://nuxt.com/docs/getting-started/layers
  extends: [
    '@nuxt/examples-ui',
    './auth',
  ],
})
