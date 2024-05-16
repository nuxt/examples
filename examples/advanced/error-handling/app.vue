<script setup lang="ts">
import { showError } from '#imports'

const route = useRoute()
if ('setup' in route.query) {
  throw new Error('error in setup')
}
if ('mounted' in route.query) {
  onMounted(() => {
    throw new Error('error in mounted')
  })
}
function triggerError() {
  throw new Error('manually triggered error')
}
</script>

<template>
  <NuxtExample
    dir="advanced/error-handling"
    current-route
  >
    <template #nav>
      <NuxtLink
        to="/"
        class="n-link-base"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/other"
        class="n-link-base"
      >
        Other
      </NuxtLink>
      <NuxtLink
        to="/404"
        class="n-link-base"
      >
        404
      </NuxtLink>
      <NuxtLink
        to="/?middleware"
        class="n-link-base"
      >
        Middleware
      </NuxtLink>
      <button
        class="n-link-base"
        @click="() => showError('Fatal error')"
      >
        Trigger fatal error
      </button>
      <button
        class="n-link-base"
        @click="triggerError"
      >
        Trigger non-fatal error
      </button>
    </template>
    <NuxtPage />
  </NuxtExample>
</template>
