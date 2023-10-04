<template>
  <div class="py-12 sm:py-24">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="p-4">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ title }} Python Coding Exercises
        </h2>
        <p class="mt-2 text-xl leading-8 text-gray-600">
          Write code and run it in real-time to get instant feedback on your
          progress.
        </p>
      </div>

      <ExerciseList :exercises="exercises"> </ExerciseList>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  documentDriven: false,
});
const route = useRoute();

const paramToLevel = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

const paramToTitle = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const level = paramToLevel[route.params.level];
const title = paramToTitle[route.params.level];
if (!level) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const exercises = await queryContent("exercises")
  .where({ level: paramToLevel[route.params.level] })
  .find();
</script>