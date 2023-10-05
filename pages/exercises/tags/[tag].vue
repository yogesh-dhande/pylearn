<template>
  <div class="py-12 sm:py-24">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="p-4">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Python coding exercises with {{ tag }}
        </h1>
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
const tag = route.params.tag;
if (!tag) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const exercises = await queryContent("exercises")
  .where({ tags: { $contains: tag } })
  .sort({ level: 2 })
  .find();
</script>