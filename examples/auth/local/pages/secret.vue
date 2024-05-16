<script setup lang="ts">
useHead({
  title: 'Secret Page',
})

definePageMeta({
  auth: true,
})

const { data: secretData } = await useFetch('/api/secret')
</script>

<template>
  <div>
    Secret Page!
    <div>
      API Response: <code>{{ secretData }}</code>
    </div>
  </div>
</template>
