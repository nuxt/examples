<script setup lang="ts">
defineProps<{
  title: string
}>()

const open = ref(false)
</script>

<template>
  <UButton @click="open = true">
    Open Modal
  </UButton>
  <Teleport to="#teleports">
    <div v-if="open" class="fixed inset-0 bg-black/30 backdrop-blur" />
    <UCard v-if="open" class="modal p4">
      <template #header>
        {{ title }}
      </template>
      <slot />
      <template #footer>
        <UButton @click="open = false">
          Close
        </UButton>
      </template>
    </UCard>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 30%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
