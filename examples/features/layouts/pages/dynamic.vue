<script setup>
definePageMeta({
  layout: false,
})
const layout = ref('custom')
</script>

<template>
  <div class="dynamic">
    <p>Custom layout defined dynamically with the <code>NuxtLayout</code> component</p>

    <NuxtLayout :name="layout">
      <template #header>
        <p>Header slot</p>
      </template>
      <p>Default slot</p>
      <button
        class="border p-1 rounded"
        @click="layout = layout ? null : 'custom'"
      >
        Toggle layout
      </button>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.dynamic {
  border: 1px solid #95e0ec;
  padding: 1rem;
  position: relative;
  background-color: #95d9ec87;
}
.dynamic::before {
  content: 'dynamic layout';
  position: absolute;
  top: 2px;
  left: 5px;
  color: #3c81cb;
  font-family: monospace;
}
</style>
