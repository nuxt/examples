<template>
  <div class="dark:bg-gray-800 dark:text-gray-200 min-h-screen">
    <Head>
      <Title>Nuxt with TailwindCSS</Title>
    </Head>
    <p class="p-4 pb-2">
      <select
        v-model="$colorMode.preference"
        class="border w-24 h-8 dark:bg-gray-900 dark:text-white dark:border-gray-700"
      >
        <option value="system">
          System
        </option>
        <option value="light">
          Light
        </option>
        <option value="dark">
          Dark
        </option>
      </select>
    </p>
    <NuxtPage class="mx-auto p-4" />
  </div>
</template>
