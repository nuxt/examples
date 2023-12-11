<script setup>
const counter = useState('counter', () => Math.round(Math.random() * 1000))
const sameCounter = useState('counter')
</script>

<template>
  <NuxtExampleLayout dir="features/state-management">
    <p>Counter: {{ counter }}</p>
    <div class="flex gap-2 my-4">
      <UButton @click="counter--">-</UButton>
      <UButton @click="counter++">+</UButton>
    </div>
    <p>Same Counter: {{ sameCounter }}</p>
  </NuxtExampleLayout>
</template>
