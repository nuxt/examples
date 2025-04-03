<script setup lang="ts">
const { $auth } = useNuxtApp()

const icon = computed(() => $auth.session.value?.email ? 'i-heroicons-lock-open' : 'i-heroicons-lock-closed')
</script>

<template>
  <NuxtExample
    dir="auth/local"
    :icon="icon"
  >
    <template #nav>
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/secret">
        Secret
      </NuxtLink>
      <NuxtLink
        v-if="!$auth.loggedIn.value"
        to="/login"
      >
        Login
      </NuxtLink>
      <NuxtLink
        v-else
        to="/profile"
      >
        Profile
      </NuxtLink>
    </template>
    <NuxtPage />
  </NuxtExample>
</template>
