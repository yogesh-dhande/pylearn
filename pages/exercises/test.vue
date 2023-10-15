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

const { $getPyWorker } = useNuxtApp();

let pyWorker

function outputHandler(output) {
  const failedRegex = /FAILED .+\.py::(.*?) -/g;
  const matches = output.matchAll(failedRegex);
  const failedTests = Array.from(matches, (match) => match[1]);

  const errorRegex = /ERROR .+\.py/g;
  const pass = failedTests.length === 0 && !output.match(errorRegex)
  outputs.value.push({
    path: "All tests passed",
    pass,
  });
}

onMounted(() => {
  pyWorker = $getPyWorker(outputHandler)
    if (process.client) {
    let testFileContent = "";
    exercises.value.forEach((exercise) => {
      testFileContent =
        testFileContent +
        `
${exercise.solution ?? ""}

${exercise.tests ?? ""}
`;
    });
    const toRun = `
import js
import os
import pytest
from io import StringIO
import sys
import pyodide
filename = "all.py"

with open(filename, "w+") as f:
    f.write(r'''${testFileContent}''')

# Capture the output
output = StringIO()
sys.stdout = output

# Run the tests
pytest.main(["-qq", filename])

# Get the captured output
captured_output = output.getvalue()

# Restore the original stdout
sys.stdout = sys.__stdout__

captured_output
                    
`
    pyWorker.run(toRun)
  }
});

</script>