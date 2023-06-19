<script setup>
const id = ref(1)
</script>

<template>
  <div>
    <p>Example of data fetching inside a component:</p>
    <p><button @click="id--">Previous</button> - <button @click="id++">Next</button></p>
    <TheQuote :id="id" />
    <NuxtLink to="/">Back home</NuxtLink>
  </div>
</template>