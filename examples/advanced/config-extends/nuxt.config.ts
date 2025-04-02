export default defineNuxtConfig({
  extends: [
    '@nuxt/examples-ui',
    './ui',
    './base',
  ],
  runtimeConfig: {
    public: {
      theme: {
        primaryColor: 'user_primary',
      },
    },
  },

  compatibilityDate: '2024-04-03',
})
