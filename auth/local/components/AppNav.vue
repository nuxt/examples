<script setup lang="ts"></script>

<template>
  <nav class="py-5">
    <NuxtLink to="/">Home Page</NuxtLink> |
    <NuxtLink to="/secret">Secret Page</NuxtLink> |
    <NuxtLink to="/login" v-if="!$auth.loggedIn.value">Login</NuxtLink>
    <NuxtLink to="/profile" v-else>Profile</NuxtLink>
  </nav>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-primary-400;
}
</style>
