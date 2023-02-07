export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/_colors.sass" as *\n'
        }
      }
    }
  }
})
