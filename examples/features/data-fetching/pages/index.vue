<script setup>
const { data } = await useFetch('/api/hello')
</script>

<template>
  <div>
    <p>
      Result of <UKbd
        size="lg"
        value="/api/hello"
      />:
    </p>
    <pre>{{ data }}</pre>
  </div>
</template>
