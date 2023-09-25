<template>
  <div class="max-w-2xl mx-auto">
    <textarea id="pytest-output" type="text" class="hidden" />
    <div
      v-for="output in outputs"
      :key="output.path"
      class="flex flex-col space-y-2 my-8"
    >
      <div
        class="px-3 py-1 rounded flex justify-between text-gray-100"
        :class="{ 'bg-green-600': output.pass, 'bg-red-600': !output.pass }"
      >
        <div>{{ output.path }}</div>
        <div>{{ output.pass }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const outputs = ref([]);
const { data: exercises } = await useAsyncData("exercises", () =>
  queryContent("/exercises")
    .where({ _partial: false }) // exclude the Partial files
    .find()
);

onMounted(() => {
  if (process.client) {
    exercises.value.forEach(async (exercise) => {
      const testFileContent = `
${exercise.solution}

${exercise.tests}
`;
      const { result, pass } = await useTestRunner(testFileContent, exercise);

      outputs.value.push({
        path: exercise._path,
        result,
        pass,
      });
    });
  }
});
</script>