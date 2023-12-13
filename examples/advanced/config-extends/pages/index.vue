<script setup>
const themeConfig = useRuntimeConfig().theme
const appConfig = useAppConfig()
const foo = useFoo()
const bar = getBar()
</script>

<template>
  <NuxtExampleLayout dir="advanced/config-extends" file="nuxt.config.ts">
    appConfig:
    <pre>{{ JSON.stringify(appConfig, null, 2) }}</pre>
    runtimeConfig:
    <pre>{{ JSON.stringify(themeConfig, null, 2) }}</pre>
    <div class="flex gap-4">
      <BaseButton>Base Button</BaseButton>
      <FancyButton>Fancy Button</FancyButton>
      <UIButton>UI Button</UIButton>
    </div>
    <br>
    {{ foo }} {{ bar }}
    <br>
    {{ $myPlugin() }}
  </NuxtExampleLayout>
</template>
