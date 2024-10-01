<script setup>
useSeoMeta({
  title: 'About page',
  description: 'This is the about page',
})
</script>

<template>
  <div>
    <h1>About page</h1>
    <p>This is the about page using <code>useSeoMeta()</code> composable</p>
    <NuxtLink to="/">
      Back home
    </NuxtLink>
  </div>
</template>
