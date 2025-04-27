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
    class="bg-(--ui-primary) p-2 rounded-lg !text-white"
    :style="{ color }"
  >
    <slot />
  </button>
</template>
