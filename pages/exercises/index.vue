<template>
  <div class="py-12 sm:py-24">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="p-4">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Python Coding Exercises
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
const exercises = await queryContent("exercises").sort({ level: 1 }).find();
</script>