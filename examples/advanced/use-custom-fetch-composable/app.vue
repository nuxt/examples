<script setup lang="ts">
const { data } = await useCustomFetch<[]>('/contributors')
</script>

<template>
  <NuxtExample
    dir="advanced/use-custom-fetch-composable"
    file="composables/useCustomFetch.ts"
  >
    <h1 class="text-xl">
      - Nuxt custom fetch:
    </h1>
    <div class="max-h-96 overflow-auto mt-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
      <pre class="text-left text-xs">{{ data }}</pre>
    </div>
  </NuxtExample>
</template>
