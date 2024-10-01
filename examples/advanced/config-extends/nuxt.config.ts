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
})
