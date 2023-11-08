import type { AuthSession } from "~~/auth/server/utils/session";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {};
  }

  const { data: session, refresh: updateSession }
   = await useFetch<AuthSession>('/api/auth/session');

  const loggedIn: any = computed(() => !!session.value?.email);

  /**
   * Add global route middleware to protect pages using:
   *
   * definePageMeta({
   *  auth: true
   * })
   */
  //

  addRouteMiddleware(
    "auth",
    (to, from) => {
      if (to.meta.auth && !loggedIn.value) {
        if (process.server && to.path === from.path) return;
        return `/login?redirectTo=${to.path}`;
      }
    },
    { global: true }
  );

  const currentRoute = useRoute();

  if (process.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && currentRoute.meta.auth) {
        await navigateTo(`/login?redirectTo=${currentRoute.path}`);
      }
    });
  }

  if (loggedIn.value && currentRoute.path === "/login") {
    const to = String(currentRoute.query.redirectTo) || '/';
    await navigateTo(to);
  }

  return {
    provide: {
      auth: {
        loggedIn,
        session,
        updateSession,
      },
    },
  };
});
