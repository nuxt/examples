<script setup lang="ts">
// see ./composables/locale.ts for the implementation
const locales = useNuxtLocales()
const locale = useNuxtLocale()
const date = useNuxtLocaleDate(new Date('2016-10-26') /* NUXT_BIRTHDAY */)
</script>

<template>
  <NuxtExample dir="advanced/locale">
    <div class="flex justify-center gap-8 items-center mt-2">
      <USelect
        v-model="locale"
        :items="locales"
        icon="i-heroicons-calendar-days"
      />
      <p class="text-4xl">
        {{ date }}
      </p>
    </div>
  </NuxtExample>
</template>
