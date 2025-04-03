<script setup lang="ts">
defineProps({
  error: Object,
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtExample>
    <div class="relative font-sans">
      <div class="container max-w-200 mx-auto py-10 px-4">
        <h1>{{ error?.message }}</h1>
        There was an error 😱

        <br>
        <button @click="handleError">
          Clear error
        </button>
        <br>
        <NuxtLink to="/404">
          Trigger another error
        </NuxtLink>
        <br>
        <NuxtLink
          class="text-(--ui-primary)"
          to="/"
        >
          Navigate home
        </NuxtLink>
      </div>
    </div>
  </NuxtExample>
</template>
