<template>
  <div class="bg-gray-50 text-gray-900">
    <div class="min-h-screen">
      <div class="max-w-7xl mx-4 lg:mx-auto">
        <NavBar />
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
/* Styles for markdown */
[data-content-id] h1 {
  @apply text-gray-800 text-2xl sm:text-4xl font-bold my-4 sm:my-8
}

[data-content-id] h3 {
  @apply text-gray-800 text-lg sm:text-xl font-semibold mt-4 sm:mt-8
}

[data-content-id] p {
  @apply text-gray-600 mt-4
}

[data-content-id] li {
  @apply list-disc ml-4 text-gray-600
}

[data-content-id] li>a {
  @apply underline text-indigo-500 hover:text-indigo-600
}
</style>