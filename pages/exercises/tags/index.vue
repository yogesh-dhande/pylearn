<template>
  <div class="py-12 sm:py-24">
    <div class="max-w-3xl mx-auto">
      <div class="p-4 text-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Python Coding Exercises
        </h1>
        <p class="mt-2 text-xl leading-8 text-gray-600">
          Whether you're a beginner or an experienced coder, these curated
          exercises will guide you on your journey to Python proficiency. Dive
          deep into each topic and master the concepts that make Python a
          powerful programming language.
        </p>
      </div>
      <div class="flex flex-wrap space-x-2 justify-center items-center mt-2">
        <NuxtLink
          v-for="tag in tags"
          :key="tag"
          :to="`/exercises/tags/${tag}`"
          class="rounded bg-gray-600 hover:bg-cyan-600 hover:shadow-lg text-gray-100 font-medium text-lg px-2 py-0.5 my-1 mr-1"
        >
          {{ tag }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  documentDriven: false,
});
const exercises = await queryContent("exercises").find();

const tags = exercises.reduce((acc, exercise) => {
  (exercise.tags ?? []).forEach((tag) => {
    if (!acc.includes(tag)) {
      acc.push(tag);
    }
  });
  return acc;
}, []);
</script>

<style>
</style>