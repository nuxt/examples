// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui'
  ],
  runtimeConfig: {
    auth: {
      name: "nuxt-session",
      password: "",
    },
  },
  nitro: {
    storage: {
      "db:auth": { driver: "fs", base: "./.data/auth" },
    },
  },
  hooks: {
    ready() {
      if (process.env.NODE_ENV === 'development' && !process.env.NUXT_AUTH_PASSWORD) {
        throw new Error(
          "Missing `NUXT_AUTH_PASSWORD` environment variable! Is .env file missing?"
        );
      }
    },
  },
});
