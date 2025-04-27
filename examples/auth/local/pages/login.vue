<script setup lang="ts">
useHead({
  title: 'Login Page',
})

const tabs = [
  {
    label: 'Log In',
    slot: 'login',
  },
  {
    label: 'Register',
    slot: 'register',
  },
]

const loginForm = ref({
  email: 'arash@gmail.com',
  password: 'password',
})
const registerForm = ref({
  email: 'arash@gmail.com',
  password: 'password',
})
const hidden = ref(true)

const toast = useToast()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onError = (err: any) => {
  toast.add({
    color: 'warning',
    title: 'Error',
    description: err?.data.message ?? err?.message ?? err,
  })
}
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-xl' }">
    <UTabs
      class="p-4"
      :items="tabs"
    >
      <template #login="{ item }">
        <UForm
          :state="loginForm"
          @submit="authLogin(loginForm.email, loginForm.password).catch(onError)"
        >
          <UCard>
            <template #header>
              <div class="flex">
                <UIcon
                  class="w-12 h-12 mr-2 bg-(--ui-primary)"
                  name="i-heroicons-user"
                />
                <div>
                  <p class="text-base font-semibold leading-6 text-(--ui-text-highlighted)">
                    <!-- @vue-expect-error -->
                    {{ item.label }}
                  </p>
                  <p class="mt-1 text-sm text-(--ui-text-muted)">
                    Log in to your account.
                  </p>
                </div>
              </div>
            </template>

            <UFormField
              label="Email"
              name="email"
              class="mb-3"
              required
            >
              <UInput
                v-model="loginForm.email"
                placeholder="user@gmail.com"
                icon="i-heroicons-envelope"
              />
            </UFormField>
            <UFormField
              label="Password"
              name="password"
              required
            >
              <UInput
                v-model="loginForm.password"
                placeholder="password"
                icon="i-heroicons-lock-closed"
                :type="hidden ? 'password' : 'text'"
              >
                <template #trailing>
                  <UButton
                    :icon="hidden ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    variant="link"
                    :padded="false"
                    class="cursor-pointer"
                    @click="hidden = !hidden"
                  />
                </template>
              </UInput>
            </UFormField>

            <template #footer>
              <UButton
                class="w-full justify-center"
                type="submit"
              >
                Log in
              </UButton>
            </template>
          </UCard>
        </UForm>
      </template>
      <template #register="{ item }">
        <UForm
          :state="registerForm"
          @submit="authRegister(registerForm.email, registerForm.password).catch(onError)"
        >
          <UCard>
            <template #header>
              <div class="flex">
                <UIcon
                  class="w-12 h-12 mr-2 bg-cyan-400"
                  name="i-heroicons-user-plus"
                />
                <div>
                  <p class="text-base font-semibold leading-6 text-(--ui-text-highlighted)">
                    <!-- @vue-expect-error -->
                    {{ item.label }}
                  </p>
                  <p class="mt-1 text-sm text-(--ui-text-muted)">
                    Create an account
                  </p>
                </div>
              </div>
            </template>

            <UFormField
              label="Email"
              name="email"
              class="mb-3"
              required
            >
              <UInput
                v-model="registerForm.email"
                placeholder="user@gmail.com"
                icon="i-heroicons-envelope"
              />
            </UFormField>
            <UFormField
              label="Password"
              name="password"
              required
            >
              <UInput
                v-model="registerForm.password"
                placeholder="password"
                icon="i-heroicons-lock-closed"
                class="pointer-"
                :type="hidden ? 'password' : 'text'"
              >
                <template #trailing>
                  <UButton
                    :icon="hidden ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    variant="link"
                    :padded="false"
                    class="cursor-pointer"
                    @click="hidden = !hidden"
                  />
                </template>
              </UInput>
            </UFormField>

            <template #footer>
              <UButton
                class="w-full justify-center"
                type="submit"
                color="secondary"
              >
                Register
              </UButton>
            </template>
          </UCard>
        </UForm>
      </template>
    </UTabs>
  </UContainer>
</template>
