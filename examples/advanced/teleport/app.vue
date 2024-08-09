<template>
  <NuxtExample dir="advanced/teleport">
    <div>
      <!-- SSR Teleport -->
      <Teleport to="#teleports">
        <UContainer>
          <UAlert class="mt-8" icon="i-heroicons-server-stack" title="SSR Teleport" description="Hello from Server-side teleport!" />
        </UContainer>
      </Teleport>

      <!-- Client Teleport -->
      <ClientOnly>
        <Teleport to="#teleports">
          <UContainer>
            <UAlert class="mb-8" icon="i-heroicons-window" title="Client Teleport" description="Hello from Client-side teleport!" />
          </UContainer>
        </Teleport>
      </ClientOnly>

      <!-- Modal Example -->
      <MyModal title="Teleport Modal">
        Hello from Modal teleport!
      </MyModal>
    </div>
  </NuxtExample>
</template>
