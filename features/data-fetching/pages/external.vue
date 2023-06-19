<script setup>
const id = ref(1)
const { data: product, pending, error } = await useFetch(() => `https://dummyjson.com/products/${id.value}`)

/* Same as:
const { data: product, pending, error } = await useAsyncData(() => {
  return $fetch(`https://dummyjson.com/products/${id.value}`)
}, {
  watch: [id]
})
*/
</script>

<template>
  <div>
    <p>Result of <code>https://dummyjson.com/products/</code><input type="number" v-model="id" /></p>
    <p><button @click="id--">Previous</button> - <button @click="id++">Next</button></p>
    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">{{ error }}</pre>
    <pre v-else>{{ product }}</pre>
    <NuxtLink to="/">Back home</NuxtLink>
  </div>
</template>
