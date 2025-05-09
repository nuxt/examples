export default defineNuxtConfig({
  imports: {
    dirs: ['utils'],
  },
  runtimeConfig: {
    public: {
      theme: {
        primaryColor: 'base_primary',
        secondaryColor: 'base_secondary',
      },
    },
  },

  compatibilityDate: '2024-04-03',
})
