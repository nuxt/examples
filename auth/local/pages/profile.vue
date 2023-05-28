<script setup lang="ts">
useHead({
  title: "User Profile",
});

definePageMeta({
  auth: true,
});

const { data: session } = await useFetch("/api/auth/session");
</script>

<template>
  <div>
    <div>ID: <NTextInput :model-value="$auth.session.value.id" read-only /></div>
    <div>Name: <NTextInput :model-value="$auth.session.value.name" read-only /></div>
    <div>Email: <NTextInput :model-value="$auth.session.value.email" read-only /></div>
    <br>
    <NButton @click="authLogout()">Logout</NButton>
  </div>
</template>
