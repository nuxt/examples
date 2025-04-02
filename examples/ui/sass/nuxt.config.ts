export default defineNuxtConfig({
  extends: [
    '@nuxt/examples-ui',
  ],

  compatibilityDate: '2024-04-03',
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/_colors.sass" as *\n',
        },
      },
    },
  },
})
