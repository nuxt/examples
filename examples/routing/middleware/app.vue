<script setup lang="ts">
const nav = [
  { label: 'Home', to: '/' },
  { label: 'Forbidden', to: '/forbidden' },
  { label: 'Redirect', to: '/redirect' },
]

const route = useRoute()
</script>

<template>
  <NuxtExample
    dir="routing/middleware"
    :nav="nav"
  >
    <NuxtPage />
    <template #footer>
      <div class="text-center p-4 op-50">
        Current route: <UKbd>{{ route.path }}</UKbd>
      </div>
    </template>
  </NuxtExample>
</template>
