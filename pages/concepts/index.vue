<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="p-4">
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Python Concepts
        </h1>
        <p class="mt-2 text-xl leading-8 text-gray-600">
          We get it - learning to code can be intimidating. That's why we've
          crafted these bite-sized concept articles that break down complex
          Python topics into easy-to-digest nuggets. These articles explain
          Python concepts in a language that even beginners can understand.
        </p>
      </div>

      <ContentList path="/concepts" v-slot="{ list }">
        <div
          class="grid grid-cols-2 auto-rows-max border-t border-gray-200 px-4 mt-4 sm:mt-8 sm:pt-8"
        >
          <div v-for="topic in list" :key="topic._path" class="my-4">
            <NuxtLink
              :to="topic._path"
              class="underline text-gray-900 hover:text-indigo-600 text-lg font-semibold leading-6"
            >
              {{ topic.heading }}
            </NuxtLink>
          </div>
        </div>
      </ContentList>
    </div>
  </div>
</template>