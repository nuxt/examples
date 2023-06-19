<script setup>
const counter = useState('counter', () => Math.round(Math.random() * 1000))
const sameCounter = useState('counter')
</script>

<template>
  <div>
    <p>Counter: {{ counter }}</p>
    <p>
      <button @click="counter--">-</button>
      <button @click="counter++">+</button>
    </p>
    <p>Same Counter: {{ sameCounter }}</p>
  </div>
</template>
