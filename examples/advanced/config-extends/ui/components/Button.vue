<script setup>
defineProps({
  color: {
    type: String,
    default: 'black',
  },
})
</script>

<template>
  <button
    class="ui-button"
    :style="{ color }"
  >
    <slot />
  </button>
</template>

<style>
.ui-button {
  @apply bg-primary p-2 rounded-lg !text-white
}
</style>
