<template>
  <div class="py-8 sm:py-12">
    <p class="text-center text-base text-gray-400 my-4 sm:my-8">
      &copy;{{ new Date().getFullYear() }}
      <span class="font-bold"> pythonexercises.com</span>, All Rights Reserved.
    </p>
        <div class="flex justify-center space-x-4 text-sm">
        <NuxtLink to="/terms" class="underline text-gray-400 hover:text-gray-300">Terms and Conditions</NuxtLink>
        <NuxtLink to="/privacy" class="underline text-gray-400 hover:text-gray-300">Privacy Policy</NuxtLink>
      </div>
  </div>
</template>

<script setup>
</script>
