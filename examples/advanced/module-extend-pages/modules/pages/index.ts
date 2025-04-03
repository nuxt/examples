import { createResolver, defineNuxtModule, extendPages } from 'nuxt/kit'

export default defineNuxtModule({
  setup() {
    const resolver = createResolver(import.meta.url)
    extendPages((pages) => {
      // Add /test page
      pages.push({
        name: 'Test',
        path: '/test',
        file: resolver.resolve('./pages/test.vue'),
      })
    })
  },
})
