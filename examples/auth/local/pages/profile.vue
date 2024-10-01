<script setup lang="ts">
useHead({
  title: 'User Profile',
})

definePageMeta({
  auth: true,
})

const { data: session } = await useFetch('/api/auth/session', { headers: useRequestHeaders(['cookie']) })
</script>

<template>
  <div>
    <div>
      ID: <UInput
        :model-value="$auth.session.value?.id"
        read-only
      />
    </div>
    <div>
      Name: <UInput
        :model-value="$auth.session.value?.name"
        read-only
      />
    </div>
    <div>
      Email: <UInput
        :model-value="$auth.session.value?.email"
        read-only
      />
    </div>
    <br>
    <UButton @click="authLogout()">
      Logout
    </UButton>
  </div>
</template>
