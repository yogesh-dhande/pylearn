<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Python Exercises
        </h2>
        <p class="mt-2 text-xl leading-8 text-gray-600">
          Learn to code in python.
        </p>
        <div
          class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"
        >
          <article
            v-for="(exercise, i) in exercises"
            :key="i"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="group relative">
              <h3
                class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
                <NuxtLink :to="exercise._path">
                  <span class="absolute inset-0" />
                  {{ exercise.title }}
                </NuxtLink>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ exercise.prompt }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const exercises = await queryContent("/exercises")
  .where({ _partial: false }) // exclude the Partial files
  .find();
</script>
