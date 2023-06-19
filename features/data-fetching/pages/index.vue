<script setup>
const { data } = await useFetch('/api/hello')
</script>

<template>
  <div>
    <p>Result of <code>/api/hello</code>:</p>
    <pre>{{ data }}</pre>
    <p><NuxtLink to="/external">Visit /external</NuxtLink></p>
    <p><NuxtLink to="/component">Visit /component</NuxtLink></p>
  </div>
</template>
