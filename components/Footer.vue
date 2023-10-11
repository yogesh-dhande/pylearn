<template>
  <div class="py-8 sm:py-12">
    <p class="text-center text-base text-gray-500 my-4 sm:my-8">
      &copy;{{ new Date().getFullYear() }}
      <span class="font-bold"> pythonexercises.com</span>, All Rights Reserved.
    </p>
        <div class="flex justify-center space-x-4 text-sm">
        <NuxtLink to="/about" class="underline text-gray-500 hover:text-gray-400">About</NuxtLink>
        <NuxtLink to="/exercises" class="underline text-gray-500 hover:text-gray-400">Exercises</NuxtLink>
        <NuxtLink to="/concepts" class="underline text-gray-500 hover:text-gray-400">Concepts</NuxtLink>
        <NuxtLink to="/terms" class="underline text-gray-500 hover:text-gray-400">Terms and Conditions</NuxtLink>
        <NuxtLink to="/privacy" class="underline text-gray-500 hover:text-gray-400">Privacy Policy</NuxtLink>
      </div>
  </div>
</template>

<script setup>
</script>
