export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
  },
  // https://tailwindcss.nuxtjs.org
  tailwindcss: {
    // Expose tailwind config with #tailwind-config
    exposeConfig: true,
  },
})
