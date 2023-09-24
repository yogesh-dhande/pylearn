<template>
  <div class="max-w-5xl mx-auto my-12">
    <h1 class="text-3xl font-bold">{{ page.title }}</h1>
    <ContentDoc> </ContentDoc>
  </div>
</template>
<script setup>
const { page } = useContent();
</script>


<style scoped>
</style>
