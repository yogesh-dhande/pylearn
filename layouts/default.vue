<template>
  <div class="bg-gray-50 text-gray-900">
    <div class="min-h-screen">
      <NavBar />
      <div class="max-w-7xl mx-4 lg:mx-auto">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>