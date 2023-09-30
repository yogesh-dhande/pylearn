<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="p-4">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bite-sized Python Concepts
        </h2>
        <p class="mt-2 text-xl leading-8 text-gray-600">
          We get it - Python can be intimidating. That's why we've crafted these
          bite-sized concept articles that break down complex Python topics into
          easy-to-digest nuggets. Our articles explain Python concepts in a
          language that even beginners can understand.
        </p>
      </div>

      <ContentList path="/concepts" v-slot="{ list }">
        <div
          class="mt-4 space-y-8 border-t border-gray-200 pt-4 sm:mt-8 sm:pt-8"
        >
          <article
            v-for="topic in list"
            :key="topic._path"
            class="flex flex-col items-start justify-between"
          >
            <div class="w-full hover:bg-gray-200 p-4 rounded group relative">
              <h3
                class="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
              >
                <NuxtLink :to="topic._path">
                  <span class="absolute inset-0" />
                  {{ topic.title }}
                </NuxtLink>
              </h3>
              <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ topic.description }}
              </p>
            </div>
          </article>
        </div>
      </ContentList>
    </div>
  </div>
</template>