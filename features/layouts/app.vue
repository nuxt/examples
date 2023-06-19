<template>
  <nav>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <NuxtLink to="/custom">
    Custom
    </NuxtLink>
    <NuxtLink to="/dynamic">
      Dynamic
    </NuxtLink>
    <NuxtLink to="/other">
      Other
    </NuxtLink>
  </nav>
  <NuxtLayout class="layouts">
    <NuxtPage />
  </NuxtLayout>
  <footer>
    <button @click="setPageLayout('default')">
      layouts/default.vue
    </button>
    <button @click="setPageLayout('custom')">
      layouts/custom.vue
    </button>
    <button @click="setPageLayout('other')">
      layouts/other.vue
    </button>
    <button @click="setPageLayout(false)">
      Remove layout
    </button>
  </footer>
</template>

<style scoped>
nav, footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.layouts {
  padding: 1rem;
}
</style>