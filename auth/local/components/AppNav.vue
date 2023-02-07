<script setup lang="ts"></script>

<template>
  <nav>
    <NuxtLink to="/">Home Page</NuxtLink> |
    <NuxtLink to="/secret">Secret Page</NuxtLink> |
    <NuxtLink to="/auth" v-if="!$auth.loggedIn.value">Login</NuxtLink>
    <NuxtLink to="/profile" v-else>Profile</NuxtLink>
  </nav>
  <hr />
</template>

<style scoped>
.router-link-exact-active {
  color: royalblue;
}
</style>
