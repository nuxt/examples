export const useAuth = () => useNuxtApp().$auth

export const authLogin = async (email: string, password: string) => {
  await $fetch("/api/auth/login", {
    method: "POST",
    body: {
      email: email,
      password: password,
    },
  });
  const { redirectTo } = useRoute().query;
  await useAuth().updateSession();
  await navigateTo(String(redirectTo) || "/");
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
  await $fetch("/api/auth/logout", {
    method: "POST",
  });
  await useAuth().updateSession();
};
