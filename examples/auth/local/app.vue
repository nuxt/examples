<script setup lang="ts">
const { $auth } = useNuxtApp()

const icon = computed(() => $auth.session.value?.email ? 'i-heroicons-lock-open' : 'i-heroicons-lock-closed')
</script>

<template>
    <NuxtExample dir="auth/local" :icon="icon">
    <template #nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/secret">Secret</NuxtLink>
      <NuxtLink to="/login" v-if="!$auth.loggedIn.value">Login</NuxtLink>
      <NuxtLink to="/profile" v-else>Profile</NuxtLink>
    </template>
    <NuxtPage />
    <!-- to show toasts -->
    <UNotifications />
  </NuxtExample>
</template>
