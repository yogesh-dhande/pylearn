<template>
  <nav>
    <div class="mx-auto px-2 py-4 sm:px-6 lg:px-8">
      <div
        class="relative flex whitespace-nowrap items-center justify-start h-12"
      >
        <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
          <!-- Mobile menu button-->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-100"
            aria-expanded="false"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <!--
            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <!--
            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg
              class="hidden h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex space-x-4 items-center justify-center lg:justify-start"
        >
          <div
            class="flex-shrink-0 text-gray-700 hover:text-indigo-600 text-2xl flex items-center border-transparent"
          >
            <nuxt-link to="/" class="">
              <span
                class="text-lg sm:text-xl font-semibold leading-tight text-gray-700 hover:text-indigo-600"
              >
                🐍
              </span>
            </nuxt-link>
          </div>
        </div>

        <div>
          <div class="hidden lg:block md:ml-6">
            <div class="flex space-x-4 items-center">
              <nuxt-link
                to="/exercises"
                class="px-4 py-2 text-lg sm:text-xl font-semibold text-gray-700 hover:text-indigo-600 border-transparent"
                >Exercises
              </nuxt-link>

              <nuxt-link
                to="/concepts"
                class="px-4 py-2 text-lg sm:text-xl font-semibold text-gray-700 hover:text-indigo-600 border-transparent"
                >Concepts
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
      <div
        class="lg:hidden bg-gray-100 mx-2 rounded"
        :class="{ hidden: !showMobileMenu }"
      >
        <nuxt-link
          to="/exercises"
          class="block px-4 py-2 text-lg sm:text-xl font-semibold text-gray-700 hover:text-indigo-600 border-transparent"
          >Exercises
        </nuxt-link>

        <nuxt-link
          to="/concepts"
          class="block px-4 py-2 text-lg sm:text-xl font-semibold text-gray-700 hover:text-indigo-600 border-transparent"
          >Concepts
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
const showMobileMenu = ref(false);
</script>
