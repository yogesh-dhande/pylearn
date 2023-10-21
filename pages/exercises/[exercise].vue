<template>
  <div class="max-w-4xl mx-auto my-12">
    <Exercise :exercise="page" />

    <div class="p-4">
      <h5 class="mt-8 sm:mt-16 font-bold text-lg">Related exercises</h5>
      <ul class="my-2">
        <li
          class="list-disc ml-4"
          v-for="relatedExercise in related"
          :key="relatedExercise._path"
        >
          <NuxtLink
            :to="relatedExercise._path"
            class="my-2 underline text-indigo-600 hover:text-indigo-700"
            >{{ relatedExercise.title }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { page } = useContent();

const exercises = await queryContent("exercises")
  .only(["_path", "title", "tags"])
  .find();

const related = exercises.filter(
  (e) =>
    e.tags && e.tags.includes(page.value.tags[0]) && e._path != page.value._path
);
</script>


