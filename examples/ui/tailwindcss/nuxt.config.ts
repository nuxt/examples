export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
  },

  compatibilityDate: '2024-04-03',
  // https://tailwindcss.nuxtjs.org
  tailwindcss: {
    // Expose tailwind config with #tailwind-config
    exposeConfig: true,
  },
})
