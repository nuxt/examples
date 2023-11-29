<script setup lang="ts">
useHead({
  title: "Login Page",
});

const toast = useToast()

const email = ref("");
const password = ref("");

const isValid = computed(() => {
  return email.value && password.value;
});

const redirectTo = useAuth().redirectTo.value
const alert = ref(
  `Please login or register ${redirectTo ? `to access ${redirectTo}` : ""}`
);

onMounted(() => {
  toast.add({
    id: 'login_register',
    title: 'Login or Register',
    description: alert.value,
    color: 'primary',
    timeout: 6000
  })
})

const onError = (err: any) => {
  toast.add({
    id: 'error',
    title: 'Error',
    description: err?.data.message ?? err?.message ?? err,
    icon: 'i-heroicons-exclamation-triangle',
    color: 'red',
    timeout: 6000
  })
};
</script>

<template>
  <div>
    <div>
      <div>
        <div>
          <label for="email">Email</label>
          <UInput id="email" type="email" placeholder="Email" v-model="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <UInput id="password" type="password" placeholder="Password" v-model="password" />
        </div>
      </div>
      <br />
      <br />
      <div>
        <UButton @click="authLogin(email, password).catch(onError)" :disabled="!isValid" class="mr-2">
          Login
        </UButton>
        <UButton @click="authRegister(email, password).catch(onError)" :disabled="!isValid" class="mr-2">
          Register
        </UButton>
      </div>
    </div>
    <UNotifications />
  </div>
</template>
