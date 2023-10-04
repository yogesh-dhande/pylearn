<template>
  <div class="px-4 border-t border-gray-200 pt-4 my-4 sm:mt-8 sm:pt-8">
    <div
      v-for="(exercise, i) in exercises"
      :key="i"
      class="my-8 items-start justify-between"
    >
      <div class="">
        <NuxtLink
          :to="exercise._path"
          class="text-lg font-semibold leading-6 text-gray-900 hover:text-cyan-600"
        >
          {{ exercise.title }}
        </NuxtLink>

        <div class="flex flex-wrap items-center mt-2">
          <NuxtLink
            v-if="exercise.level == 1"
            to="/exercises/levels/beginner"
            class="rounded bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
          >
            Beginner
          </NuxtLink>
          <NuxtLink
            v-else-if="exercise.level == 2"
            to="/exercises/levels/intermediate"
            class="rounded bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
          >
            Intermediate
          </NuxtLink>
          <NuxtLink
            v-else-if="exercise.level == 3"
            to="/exercises/levels/advanced"
            class="rounded bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
          >
            Advanced
          </NuxtLink>
          <NuxtLink
            v-for="tag in exercise.tags"
            :key="tag"
            :to="`/exercises/tags/${tag}`"
            class="rounded bg-gray-600 hover:bg-cyan-600 hover:shadow-lg text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  exercises: {
    type: Array,
    required: true,
  },
});
</script>

<style>
</style>