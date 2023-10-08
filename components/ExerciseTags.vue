<template>
  <div class="flex flex-wrap items-center sm:justify-end">
      <NuxtLink
        v-if="exercise.level == 1"
        to="/exercises/levels/newbie"
        class="rounded bg-cyan-600 hover:bg-cyan-700 hover:shadow-lg text-gray-100 font-medium text-base px-2 py-0.5 mr-1"
      >
        Newbie
      </NuxtLink>
    <NuxtLink
      v-if="exercise.level == 2"
      to="/exercises/levels/beginner"
      class="rounded bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-gray-100 font-medium text-base px-2 py-0.5 mr-1"
    >
      Beginner
    </NuxtLink>
    <NuxtLink
      v-else-if="exercise.level == 3"
      to="/exercises/levels/intermediate"
      class="rounded bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-gray-100 font-medium text-base px-2 py-0.5 mr-1"
    >
      Intermediate
    </NuxtLink>
    <NuxtLink
      v-else-if="exercise.level == 4"
      to="/exercises/levels/advanced"
      class="rounded bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-gray-100 font-medium text-base px-2 py-0.5 mr-1"
    >
      Advanced
    </NuxtLink>
    <NuxtLink
      v-for="tag in exercise.tags"
      :key="tag"
      :to="`/exercises/tags/${tag}`"
      class="rounded bg-gray-600 hover:bg-cyan-600 hover:shadow-lg text-gray-100 font-medium text-base px-2 py-0.5 mr-1 mt-1"
    >
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});
</script>

<style>
</style>