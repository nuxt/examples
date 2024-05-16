<template>
  <div class="other">
    <slot />
  </div>
</template>

<style scoped>
.other {
  border: 1px solid #e3ca9e;
  padding: 1rem;
  position: relative;
  background-color: #e3cd9e87;
}
.other::before {
  content: 'layouts/other.vue';
  position: absolute;
  top: 2px;
  left: 5px;
  color: #b56238;
  font-family: monospace;
}
</style>
