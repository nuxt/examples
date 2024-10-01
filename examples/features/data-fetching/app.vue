<script setup lang="ts">
const nav = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'External',
    to: '/external',
  },
  {
    label: 'Component',
    to: '/component',
  },
]
</script>

<template>
  <NuxtExample
    dir="features/data-fetching"
    :nav="nav"
  >
    <!-- Show Nuxt progress indicator on page change -->
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtExample>
</template>
