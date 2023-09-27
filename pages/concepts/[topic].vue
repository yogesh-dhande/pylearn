<template>
  <div class="max-w-5xl mx-auto my-12 sm:my-24">
    <h1 class="text-3xl sm:text-5xl font-bold my-8">{{ page.title }}</h1>
    <ContentDoc>
      <template #not-found>
        <h2>Topic ({{ $route.params.topic }}) not found</h2>
      </template>
    </ContentDoc>
    <div class="grid grid-cols-2 gap-8 sm:gap-16 my-12 sm:my-24">
      <div
        v-if="prev"
        class="bg-gray-100 hover:bg-gray-200 group relative border border-gray-500 rounded-md p-4"
      >
        <h3
          class="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
        >
          <NuxtLink :to="prev._path">
            <span class="absolute inset-0" />
            {{ prev.title }}
          </NuxtLink>
        </h3>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {{ prev.description }}
        </p>
        <ArrowLongLeftIcon class="h-8 w-8" />
      </div>
      <div v-else></div>

      <div
        v-if="next"
        class="bg-gray-100 hover:bg-gray-200 group relative border border-gray-500 rounded-md p-4"
      >
        <h3
          class="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
        >
          <NuxtLink :to="next._path">
            <span class="absolute inset-0" />
            {{ next.title }}
          </NuxtLink>
        </h3>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {{ next.description }}
        </p>
        <div class="flex justify-end">
          <ArrowLongRightIcon class="h-8 w-8" />
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/20/solid";

const { page } = useContent();
const { data } = await useAsyncData(() =>
  queryContent("/concepts")
    .sort({ $numeric: false })
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
