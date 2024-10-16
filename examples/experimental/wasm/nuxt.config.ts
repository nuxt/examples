export default defineNuxtConfig({
  extends: [
    '@nuxt/examples-ui',
  ],
  nitro: {
    experimental: {
      wasm: true,
    },
  },
})
