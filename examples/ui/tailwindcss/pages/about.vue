<script setup>
import { theme } from '#tailwind-config'
</script>

<template>
  <div class="p-4">
    <h1 class="text-5xl">
      About page
    </h1>
    <p class="my-4">
      <NuxtLink to="/">
        <TButton>Home page</TButton>
      </NuxtLink>
    </p>
    <h3 class="text-xl">
      Tailwind colors:
    </h3>
    <pre class="bg-neutral-200 dark:bg-neutral-700 p-3 rounded">{{ JSON.stringify(theme.colors, null, 2) }}</pre>
  </div>
</template>
