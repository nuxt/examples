<script setup lang="ts">
const user = useCookie<{ name: string }>('user')
const logins = useCookie<number>('logins')

const name = ref('')

const login = () => {
  logins.value = (logins.value || 0) + 1
  user.value = { name: name.value }
}

const logout = () => {
  user.value = null
}
</script>

<template>
  <NuxtExample
    class="h-50"
    dir="advanced/use-cookie"
  >
    <template v-if="user">
      <h1 class="text-3xl mb-3">
        Welcome, {{ user.name }}! 👋
      </h1>
      <div>
        <UAlert
          title="Logged-In"
          color="primary"
          icon="i-heroicons-light-bulb"
        >
          <template #description>
            You have logged in <b>{{ logins }} times</b>!
          </template>
        </UAlert>
      </div>
      <div class="mt-3">
        <UButton
          color="orange"
          icon="i-heroicons-arrow-left"
          @click="logout"
        >
          Log out
        </UButton>
      </div>
    </template>
    <template v-else>
      <h1 class="text-3xl mb-3">
        Login
      </h1>
      <UInput
        v-model="name"
        class="w-100 m-auto"
        placeholder="Enter your name..."
        @keypress.enter="login()"
      />
      <div class="mt-3">
        <UButton
          icon="i-heroicons-user"
          :disabled="!name"
          name="Log in"
          @click="login"
        >
          Log in
        </UButton>
      </div>
    </template>
  </NuxtExample>
</template>
