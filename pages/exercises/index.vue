<template>
  <div class="py-12 sm:py-24">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="p-4">
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Python Coding Exercises
        </h1>
        <p class="mt-2 text-xl sm:text-2xl leading-8 text-gray-600">
          Write code and run it in real-time to get instant feedback on your
          progress.
        </p>
        <div class="text-lg flex flex-wrap  items-center mt-2">
            <NuxtLink
              to="/exercises/levels/newbie"
              class="rounded bg-cyan-600 hover:bg-cyan-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
            >
              Newbie
            </NuxtLink>
          <NuxtLink
            to="/exercises/levels/beginner"
            class="rounded bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
          >
            Beginner
          </NuxtLink>
          <NuxtLink
            to="/exercises/levels/intermediate"
            class="rounded bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
          >
            Intermediate
          </NuxtLink>
          <NuxtLink
            to="/exercises/levels/advanced"
            class="rounded bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
          >
            Advanced
          </NuxtLink>
        </div>
      </div>

      <ExerciseList :exercises="exercises"> </ExerciseList>
    </div>
  </div>
</template>

<script setup>
const exercises = await queryContent("exercises").sort({ level: 2 }).find();
</script>