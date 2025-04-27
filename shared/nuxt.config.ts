import { createResolver } from 'nuxt/kit'

const resolver = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
  ],

  css: [
    resolver.resolve('./assets/main.css'),
  ],

  compatibilityDate: '2024-04-03',
})
