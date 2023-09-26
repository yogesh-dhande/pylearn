<template>
  <div class="max-w-5xl mx-auto my-12 sm:my-24">
    <h1 class="text-3xl sm:text-5xl font-bold my-8">{{ page.title }}</h1>
    <ContentDoc>
      <template #not-found>
        <h2>Topic ({{ $route.params.topic }}) not found</h2>
      </template>
    </ContentDoc>
    <div class="flex justify-between space-x-2 my-8">
      <NuxtLink
        v-if="prev"
        :to="prev._path"
        class="underline text-cyan-600 hover:text-cyan-700 py-2 text-lg font-bold"
        >Previous</NuxtLink
      >

      <NuxtLink
        v-if="next"
        :to="next._path"
        class="underline text-cyan-600 hover:text-cyan-700 py-2 text-lg font-bold"
        >Next</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const { page } = useContent();
const { data } = await useAsyncData(() =>
  queryContent("exercises")
    .only(["_path", "title"])
    .findSurround(page.value._path)
);
const [prev, next] = data.value;
</script>


<style>
p {
  margin: 1rem 0;
}

.language-python {
  padding: 1rem;
  border-radius: 0.25rem;
}

ul {
  @apply list-disc list-inside;
}

li {
  @apply my-1;
}

code {
  @apply text-red-500 rounded-md;
}
</style>
