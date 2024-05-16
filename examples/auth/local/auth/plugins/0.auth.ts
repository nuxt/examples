import type { AuthSession } from '~~/auth/server/utils/session'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {}
  }

  const { data: session, refresh: updateSession }
   = await useFetch<AuthSession>('/api/auth/session')

  const loggedIn = computed(() => !!session.value?.email)

  // Create a ref to know where to redirect the user when logged in
  const redirectTo = useState('authRedirect')

  /**
   * Add global route middleware to protect pages using:
   *
   * definePageMeta({
   *  auth: true
   * })
   */
  //

  addRouteMiddleware(
    'auth',
    (to) => {
      if (to.meta.auth && !loggedIn.value) {
        redirectTo.value = to.path
        return '/login'
      }
    },
    { global: true },
  )

  const currentRoute = useRoute()

  if (import.meta.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && currentRoute.meta.auth) {
        redirectTo.value = currentRoute.path
        await navigateTo('/login')
      }
    })
  }

  if (loggedIn.value && currentRoute.path === '/login') {
    await navigateTo(redirectTo.value || '/')
  }

  return {
    provide: {
      auth: {
        loggedIn,
        session,
        redirectTo,
        updateSession,
      },
    },
  }
})
