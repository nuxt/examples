export default defineNuxtConfig({
  nitro: {
    experimental: {
      wasm: true,
    },
  },
  extends: [
    '@nuxt/examples-ui',
  ],
})
