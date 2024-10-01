import type { useNuxtApp } from 'nuxt/app'

declare global {
  interface Window {
    useNuxtApp?: typeof useNuxtApp
  }
}

export {}
