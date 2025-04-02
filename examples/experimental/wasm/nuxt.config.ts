export default defineNuxtConfig({
  extends: [
    '@nuxt/examples-ui',
  ],

  compatibilityDate: '2024-04-03',
  nitro: {
    experimental: {
      wasm: true,
    },
  },
})
