<script setup>
const props = defineProps({
  id: Number,
})
const { data: quote, pending, error } = await useFetch(() => `https://dummyjson.com/quotes/${props.id}`)
</script>

<template>
  <div>
    <p v-if="pending">
      Fetching...
    </p>
    <pre v-else-if="error">Could not load quote: {{ error.data }}</pre>
    <figure
      v-else
      class="bg-(--ui-bg-elevated) border border-(--ui-border-muted) rounded-lg p-4 my-6 max-w-xl text-lg"
    >
      <blockquote class="m-4">
        {{ quote.quote }}
      </blockquote>
      <figcaption class="m-4">
        &mdash; {{ quote.author }}
      </figcaption>
    </figure>
  </div>
</template>
