<template>
  <div class="py-12 sm:py-24">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="text-center p-4">
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Python Coding Exercises
        </h1>
        <p class="mt-2 text-xl sm:text-2xl leading-8 text-gray-600">
          Write code and run it in real-time to get instant feedback on your
          progress.
        </p>
        <AllTags />

        <ExerciseList :exercises="exercises"> </ExerciseList>
      </div>
    </div>
  </div>
</template>

<script setup>
const exercises = await queryContent("exercises").sort({ level: 2 }).find();
</script>