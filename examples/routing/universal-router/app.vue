<script setup lang="ts">
const timer = useState('timer', () => 0)
</script>

<template>
  <NuxtExample
    dir="routing/universal-router"
    current-route
  >
    A page...
    <br>

    <template v-if="timer">
      Processing navigation in 0.{{ timer }}s
    </template>

    <template #nav>
      <NuxtLink
        to="/"
        class="n-link-base"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/forbidden"
        class="n-link-base"
      >
        Forbidden
      </NuxtLink>
      <NuxtLink
        to="/redirect"
        class="n-link-base"
      >
        Redirect
      </NuxtLink>
      <NuxtLink
        custom
        to="/redirect"
      >
        <template #default="{ href, navigate }">
          <button @click="navigate">
            Custom: {{ href }}
          </button>
        </template>
      </NuxtLink>
    </template>
  </NuxtExample>
</template>
