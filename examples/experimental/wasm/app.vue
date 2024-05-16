<script setup>
const a = ref(100)
const b = ref(250)

const { data } = await useAsyncData(
  () => $fetch('/api/sum', { params: { a: a.value, b: b.value } }),
)
</script>

<template>
  <NuxtExample dir="experimental/wasm">
    <p>
      <code>a = {{ a }}</code>
    </p>
    <p>
      <code>b = {{ b }}</code>
    </p>
    <p>
      Computation performed server-side with WASM :
      <br>
      <code>{{ a }} + {{ b }} = {{ data.sum }}</code>
    </p>
  </NuxtExample>
</template>
