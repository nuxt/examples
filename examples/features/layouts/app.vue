<script setup lang="ts">
const nav = [
  { label: 'Home', to: '/' },
  { label: 'Custom', to: '/custom' },
  { label: 'Dynamic', to: '/dynamic' },
  { label: 'Other', to: '/other' },
]
</script>

<template>
  <NuxtExample
    dir="features/layouts"
    :nav="nav"
  >
    <NuxtLayout class="layouts">
      <NuxtPage />
    </NuxtLayout>
    <div class="flex items-center gap-4 mt-4">
      <UButton
        color="neutral"
        variant="outline"
        @click="setPageLayout('default')"
      >
        layouts/default.vue
      </UButton>
      <UButton
        color="neutral"
        variant="outline"
        @click="setPageLayout('custom')"
      >
        layouts/custom.vue
      </UButton>
      <UButton
        color="neutral"
        variant="outline"
        @click="setPageLayout('other')"
      >
        layouts/other.vue
      </UButton>
      <UButton
        color="neutral"
        variant="outline"
        @click="setPageLayout(false)"
      >
        Remove layout
      </UButton>
    </div>
  </NuxtExample>
</template>

<style scoped>
.layouts {
  padding: 1rem;
}
</style>
