<template>
  <div class="text-lg text-gray-600 leading-8">
    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-gray-50 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true" />
        <div class="px-6 pt-8 sm:pt-16 pb-32 lg:px-8">
          <h1 class="text-3xl sm:text-5xl text-gray-700 font-bold leading-tight">About</h1>
          <div class="mx-auto lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 ">

            <div class="mt-8 max-w-xl   ">
              <p class="my-4">
                When I started learning Python over a decade ago, I spent countless hours watching
                Youtube videos and reading tutorials. It wasn't until I started building my own projects that I became
                confident in my programming skills. I want you to start coding and problem solving as early as possible in
                your learning journey and that's why I made this website! My goal is to promote learning
              Python with hands-on
              coding practice.
              </p>
            <p class="my-4 ">This website is built on top of several great open-source projects and
              frameworks without which it wouldn't exist.
            </p>
            </div>
            <img src="/me.jpg?url" alt="" class="mt-16 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover" />
          </div>

          <div class="my-16">
            <h2 class="font-bold text-xl sm:text-2xl my-4">Python</h2>
            <p class="text-gray-600"><a href="https://www.python.org/">Python</a> is a powerful and versatile programming
              language known for its simplicity and
              readability. Developed in
              the late 1980s, Python has gained immense popularity due to its ease of use and its extensive range of
              applications. From web development to data analysis, machine learning to artificial intelligence, Python is
              used
              across various domains.
            </p>
          </div>
          <div class="my-16">
            <h2 class="font-bold text-xl sm:text-2xl my-4">Pyodide</h2>
            <p class="text-gray-600">
              This platform provides an in-browser execution environment powered by <a
                href="https://pyodide.org/">Pyodide</a>,
              a
              port of CPython
              to WebAssembly/Emscripten. Pyodide enables the installation and execution of Python packages in the browser
              using
              micropip, supporting a wide range of packages including general-purpose and scientific ones.
            </p>
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

<style scoped>
a {
  @apply underline text-blue-600 hover:text-blue-700
}</style>
