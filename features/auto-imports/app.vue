<script setup>
const message = ref('Nuxt')

function hello () {
  sayHello(message.value)
}
</script>

<template>
  <form @submit.prevent="hello">
    <h1>Demo with auto imports</h1>
    <CustomInput v-model="message" />
    <button type="submit">Hello</button>
  </form>
</template>
