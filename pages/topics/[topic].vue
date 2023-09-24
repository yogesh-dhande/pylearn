<template>
  <div class="max-w-5xl mx-auto my-12">
    <h1 class="text-3xl font-bold my-8">{{ page.title }}</h1>
    <ContentDoc>
      <template #not-found>
        <h2>Topic ({{ $route.params.topic }}) not found</h2>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup>
const { page } = useContent();
</script>


<style scoped>
</style>
