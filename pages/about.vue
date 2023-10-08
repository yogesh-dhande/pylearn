<template>
  <div class="">
    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-50 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true" />
        <div class="mx-auto max-w-7xl px-6 pt-8 sm:pt-16 pb-32 lg:px-8">
          <h1 class="my-4 text-lg text-indigo-600 font-bold leading-tight">About</h1>
          <div
            class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h2 class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Let's go on a coding journey together!
            </h2>
            <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 text-lg leading-8 text-gray-600">
              <p class="my-4">
                Hi, my name is Yogesh. When I started learning Python over a decade ago, I spent countless hours watching
                Youtube videos and reading tutorials. It wasn't until I started building my own projects that I became
                confident in my programming skills. I want you to start coding and problem solving as early as possible in
                your learning journey. That's why I made this website! My goal is to promote learning Python with hands-on
                coding practice.
              </p>
              <p class="my-4 ">This website is my passion project. It's built on top of several great open-source projects and
                frameworks without which it wouldn't exist.
              <div class="flex flex-col space-y-2 mt-4">
                <li>Python</li>
                <li>Pyodide</li>
                <li>Vue3 and Nuxt3</li>
              </div>
              </p>
            </div>
            <img src="/me.jpg?url" alt=""
              class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36" />
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

    </main>
  </div>
</template>

<script setup>
definePageMeta({
  documentDriven: false,
});
</script>
