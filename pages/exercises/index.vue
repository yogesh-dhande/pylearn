<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Python Coding Exercises
        </h2>
        <p class="mt-2 text-xl leading-8 text-gray-600">
          Write code and run it in real-time to get instant feedback on your
          progress.
        </p>
        <ContentList
          :query="{
            path: '/exercises',
            sort: [{ level: 1 }],
          }"
          v-slot="{ list }"
        >
          <div
            class="mt-4 space-y-4 border-t border-gray-200 pt-4 sm:mt-8 sm:pt-8"
          >
            <article
              v-for="(exercise, i) in list"
              :key="i"
              class="flex max-w-xl flex-col items-start justify-between"
            >
              <div class="w-full hover:bg-gray-200 p-4 rounded group relative">
                <h3
                  class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                >
                  <NuxtLink :to="exercise._path">
                    <span class="absolute inset-0" />
                    {{ exercise.title }}
                  </NuxtLink>
                </h3>
                <div class="flex flex-wrap items-center">
                  <div
                    v-if="exercise.level == 1"
                    class="rounded bg-teal-600 text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
                  >
                    Beginner
                  </div>
                  <div
                    v-else-if="exercise.level == 2"
                    class="rounded bg-indigo-600 text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
                  >
                    Intermediate
                  </div>
                  <div
                    v-else-if="exercise.level == 3"
                    class="rounded bg-purple-600 text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
                  >
                    Advanced
                  </div>
                  <div
                    v-for="tag in exercise.tags"
                    :key="tag"
                    class="rounded bg-gray-600 text-gray-100 font-medium text-sm px-2 py-0.5 my-1 mr-1"
                  >
                    {{ tag }}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </ContentList>
      </div>
    </div>
  </div>
</template>
