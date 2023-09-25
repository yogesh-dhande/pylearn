<template>
  <div class="max-w-5xl mx-auto my-12">
    <h1 class="text-3xl sm:text-5xl font-bold my-8">{{ page.title }}</h1>
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


<style>
p {
  margin: 1rem 0;
}

.language-python {
  padding: 1rem;
  border-radius: 0.25rem;
}

ul {
  @apply list-disc list-inside;
}

li {
  @apply my-1;
}

code {
  @apply text-red-500 rounded-md;
}
</style>
