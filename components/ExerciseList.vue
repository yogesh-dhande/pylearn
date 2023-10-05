<template>
  <div class="px-4 border-t border-gray-200 pt-4 my-4 sm:mt-8 sm:pt-8">
    <div v-for="(exercise, i) in exercises" :key="i" class="my-8">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div class="max-w-lg mr-4">
          <NuxtLink
            :to="exercise._path"
            class="text-lg sm:text-xl font-semibold leading-6 text-gray-900 hover:text-cyan-600"
          >
            {{ exercise.title }}
          </NuxtLink>
        </div>
        <ExerciseTags :exercise="exercise" />
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