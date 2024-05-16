export default defineNuxtConfig({
  extends: [
    '@nuxt/examples-ui',
  ],
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
