export const useAuth = () => useNuxtApp().$auth

export const authLogin = async (email: string, password: string) => {
  await $fetch("/api/auth/login", {
    method: "POST",
    body: {
      email: email,
      password: password,
    },
  });
  useAuth().redirectTo.value = null;
  await useAuth().updateSession();
  await navigateTo(useAuth().redirectTo.value || "/");
};

export const authRegister = async (email: string, password: string) => {
  await $fetch("/api/auth/register", {
    method: "POST",
    body: {
      email: email,
      password: password,
    },
  });
  return await authLogin(email, password);
};

export const authLogout = async () => {
  await $authFetch("/api/auth/logout", {
    method: "POST",
  });
  await useAuth().updateSession();
};

export const $authFetch = ((url: string, init?: any) => ($fetch as any)(url, {
  ...init,
  headers: {
    ...useRequestHeaders(['cookie']),
    ...init?.headers,
  }
})) as typeof globalThis.$fetch
