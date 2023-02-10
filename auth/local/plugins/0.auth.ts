import type { AuthSession } from "~~/server/utils/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {};
  }

  const { data: session, refresh: updateSession }
   = await useFetch<AuthSession>('/api/auth/session');

  const loggedIn: any = computed(() => !!session.value?.email);

  const redirectTo = useState("authRedirect")

  addRouteMiddleware(
    "auth",
    (to) => {
      if (to.meta.auth && !loggedIn.value) {
        redirectTo.value = to.path
        return "/auth";
      }
    },
    { global: true }
  );

  const currentRoute = useRoute();

  if (process.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && currentRoute.meta.auth) {
        redirectTo.value = currentRoute.path
        await navigateTo("/auth");
      }
    });
  }

  if (loggedIn.value && currentRoute.path === "/auth") {
    await navigateTo(redirectTo.value || "/");
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
  };
});
