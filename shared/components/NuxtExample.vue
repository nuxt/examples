<script setup lang="ts">
import { NuxtLink } from '#components'

interface Nav {
  label: string
  to?: string
  onClick?: () => unknown
}

const props = withDefaults(defineProps<{
  icon?: string
  dir?: string
  repo?: string
  file?: string
  nav?: Nav[]
  currentRoute?: boolean
}>(), {
  dir: 'nuxt',
  repo: 'nuxt/examples',
  currentRoute: false,
})

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const title = computed(() => props.dir.split('/').map(i => i.split('-').join(' ')))

const github = computed(() => `https://github.com/${props.repo}/tree/main/examples/${props.dir}`)

useSeoMeta({
  title: props.dir,
})
</script>

<template>
  <Body class="bg-neutral-50 dark:bg-neutral-950">
    <UApp>
      <UContainer class="p-10 min-h-screen">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <div>
                <UTooltip text="Open on Github">
                  <UButton
                    target="_blank"
                    color="neutral"
                    variant="outline"
                    icon="i-simple-icons-github"
                    :to="github"
                  />
                </UTooltip>
              </div>
              <slot name="logo">
                <Logo
                  :icon="icon"
                  :org="title[0]"
                  :repo="title[1]"
                />
              </slot>
              <div class="flex gap-2">
                <ClientOnly>
                  <UTooltip :text="`Switch to ${isDark ? 'Light' : 'Dark'} Mode`">
                    <UButton
                      :icon="isDark ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
                      color="neutral"
                      variant="outline"
                      aria-label="Theme"
                      @click="isDark = !isDark"
                    />
                  </UTooltip>
                  <template #fallback>
                    <div class="w-8 h-8" />
                  </template>
                </ClientOnly>
              </div>
            </div>
          </template>

          <main class="min-h-body">
            <nav
              v-if="nav?.length || $slots.nav"
              class="flex align-center justify-center gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4"
            >
              <slot name="nav">
                <component
                  :is="item.to ? NuxtLink: 'button'"
                  v-for="item of nav"
                  :key="item.label"
                  :to="item.to"
                  class="hover:underline"
                  @click="item.onClick"
                >
                  {{ item.label }}
                </component>
              </slot>
            </nav>
            <slot />
          </main>

          <template #footer>
            <slot name="footer" />
            <div
              :class="[{ 'mt-4': $slots.footer }, currentRoute ? 'grid-cols-3' : 'grid-cols-2']"
              class="grid items-center"
            >
              <Logo class="justify-start" />
              <div
                v-if="currentRoute"
                class="flex gap-2 items-center justify-center"
              >
                Current route: <UKbd
                  :value="$route.path"
                  size="md"
                />
              </div>
              <NuxtLink
                :to="github"
                target="_blank"
                class="text-end text-xs opacity-40"
              >
                {{ dir }}
              </NuxtLink>
            </div>
          </template>
        </UCard>
      </UContainer>
    </UApp>
  </Body>
</template>

<style>
.min-h-body {
  min-height: calc(100vh - 17rem);
}
pre, code {
  @apply text-(--ui-primary);
}
.router-link-exact-active {
  @apply text-(--ui-primary);
}
</style>
