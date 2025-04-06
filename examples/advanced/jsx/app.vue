<script lang="tsx" setup>
// Component could be a simple function with JSX syntax
const Welcome = () => <span>Welcome </span>

// Or using defineComponent setup that returns render function with JSX syntax
const Nuxt3 = defineComponent(() => {
  return () => <span class="text-(--ui-primary) font-bold">Nuxt 3</span>
})

// We can combine components with JSX syntax too
const InlineComponent = () => (
  <div>
    <Welcome />
    <span>to </span>
    <Nuxt3 />
  </div>
)
</script>

<template>
  <NuxtExample
    dir="advanced/jsx"
    icon="i-simple-icons-react"
  >
    <InlineComponent />
    <!-- Defined in components/jsx-component.ts -->
    <MyComponent message="This is an external JSX component" />
  </NuxtExample>
</template>
