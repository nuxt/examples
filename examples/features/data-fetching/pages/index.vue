<script setup>
const { data } = await useFetch('/api/hello')
</script>

<template>
  <div>
    <p>
      Result of <UKbd size="lg">
        /api/hello
      </UKbd>:
    </p>
    <pre>{{ data }}</pre>
  </div>
</template>
