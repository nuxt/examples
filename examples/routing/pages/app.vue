<script setup lang="ts">
const router = useRouter()

const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Parent (index)', to: '/parent' },
  { label: 'Parent (b)', to: '/parent/b' },
  { label: 'Keyed child', onClick: () => router.push(`/parent/reload-${(Math.random() * 100).toFixed()}`) },
  { label: 'Non-Keyed child', onClick: () => router.push(`/parent/static-${(Math.random() * 100).toFixed()}`) },
]
</script>

<template>
  <NuxtExample
    dir="routing/pages"
    :nav="nav"
    current-route
  >
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtExample>
</template>
