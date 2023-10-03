<template>
  <div>
    <div
      class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20"
    >
      <div
        class="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40"
      >
        <div class="px-6 lg:px-0 lg:pt-4">
          <div class="mx-auto max-w-5xl">
            <div class="max-w-lg">
              <h1
                class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Practice
                <span class="text-purple-600">Python</span> with Hands-on
                <span class="text-purple-600">Exercises!</span>
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">
                No sign-ups, no payments, no commitments - just pure Python
                learning. Start coding, exploring, and discovering the wonders
                of Python today!
              </p>
              <div class="mt-10 flex items-center gap-x-6">
                <NuxtLink
                  href="/exercises"
                  class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >Coding Exercises</NuxtLink
                >
                <NuxtLink
                  href="/concepts"
                  class="text-sm font-semibold leading-6 text-gray-900"
                  >Read Articles <span aria-hidden="true">→</span></NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen"
        >
          <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-gray-50 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div class="shadow-lg md:rounded-3xl">
            <div
              class="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]"
            >
              <div
                class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <div class="overflow-hidden rounded-tl-xl bg-gray-900">
                    <div class="px-6 pb-14 pt-6">
                      <img src="/code.png?url" />
                      <img src="/failure.png?url" class="mt-8 sm:mt-16" />
                    </div>
                  </div>
                </div>
                <div
                  class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"
      />
    </div>
    <div class="bg-gray-200 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">
            Learn faster
          </h2>
          <p
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Learn By Doing
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            We believe that the best way to learn Python is through hands-on
            practice. Our platform allows you to write code directly in the
            browser and run it in real-time, so you can get instant feedback on
            your progress.
          </p>
        </div>
      </div>
    </div>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">
            Learn for free
          </h2>
          <p
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            No Sign-ups, No Hassle
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Unlike other platforms, PythonExercises.com doesn't require you to
            create an account. Simply visit our website and start coding right
            away.
          </p>
        </div>
      </div>
      <div class="mt-10 flex justify-center items-center gap-x-6">
        <NuxtLink
          href="/exercises"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Coding Challenges</NuxtLink
        >
        <NuxtLink
          href="/concepts"
          class="text-sm font-semibold leading-6 text-gray-900"
          >Read Articles <span aria-hidden="true">→</span></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
</script>