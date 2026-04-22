export const useCustomFetch = createUseFetch(callerOptions => ({
  $fetch: useNuxtApp().$customFetch as typeof $fetch,
  ...callerOptions,
}))