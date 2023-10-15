<template>
  <div class="max-w-4xl mx-auto my-12">
    <h1 class="text-2xl sm:text-4xl font-bold my-4">{{ page.title }}</h1>
    <div class="flex mt-4 mb-8">
      <ExerciseTags :exercise="page" />
    </div>

    <p v-html="prompt" class="text-lg"></p>
    <div class="my-8">
      <TabGroup>
        <TabList class="flex items-center space-x-1 rounded-xl p-1">
          <Tab as="template" v-slot="{ selected }">
            <button :class="[
              'rounded-lg px-6 py-2 text-sm font-bold leading-5 text-indigo-700 ',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
              selected
                ? 'shadow bg-indigo-200 text-indigo-100  '
                : 'bg-gray-200 shadow hover:bg-indigo-500 hover:text-white',
            ]">
              Code
            </button>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <button :class="[
              'rounded-lg px-6 py-2 text-sm font-bold leading-5 text-indigo-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
              selected
                ? 'shadow bg-indigo-200  text-indigo-100  '
                : 'bg-gray-200 shadow hover:bg-indigo-500 hover:text-white',
            ]">
              Tests
            </button>
          </Tab>
          <div class="flex items-center grow justify-end space-x-2">
            <!-- Pyodide warning -->
            <div class="relative group">
              <div class="z-10 absolute top-0 right-0 flex flex-col items-center hidden mr-8 group-hover:flex">
                <p class="bg-gray-700 text-gray-100 w-80 px-3 py-2 rounded shadow text-sm">Code is executed with <a
                    href="https://pyodide.org/" class="underline text-indigo-400 hover:text-indigo-500">Pyodide</a>,
                  a port of CPython to WebAssembly/Emscripten. Some <a
                    href="https://pyodide.org/en/stable/usage/wasm-constraints.html" class="underline text-indigo-400 hover:text-indigo-500">functionality</a> in Python may
                  not be avaiable or may not work as expected.</p>

              </div>
              <ExclamationTriangleIcon class="text-yellow-600 h-7 w-7" aria-hidden="true" />

            </div>
            <!-- End Pyodide warning -->
            <Submit v-if="!success" @click="runCode" :is-loading="isLoading" label="Run"
              btnClasses="bg-green-600 hover:bg-green-700" />
          </div>
        </TabList>

        <TabPanels class="mt-2">
          <TabPanel :class="[
            'rounded-xl bg-white ',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
          ]">
            <AceEditor v-model="code" :readonly="false" :showLineNumbers="false"></AceEditor>
          </TabPanel>
          <TabPanel :class="[
            'rounded-xl bg-white ',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
          ]">
            <AceEditor v-model="testFileContent" readonly></AceEditor>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <textarea id="pytest-output" type="text" class="hidden" v-model="testOutput" />
      <div v-if="testOutput && !success">
        <p class="text-red-500 font-bold text-center px-3 py-2 my-2">
          Tests failed!
        </p>
        <AceEditor v-model="testOutput" :key="testOutput" readonly :showLineNumbers="false" theme="xcode" />
      </div>

      <div v-else-if="success">
        <p class="bg-green-500 text-gray-100 font-bold text-center px-3 py-2 my-2">
          All tests passed!
        </p>
      </div>
    </div>

    <h5 class="mt-8 sm:mt-16 font-bold text-lg">Related exercises</h5>
    <ul class="my-2">
      <li class="list-disc ml-4" v-for="relatedExercise in related" :key="relatedExercise._path">
        <NuxtLink :to="relatedExercise._path" class="my-2 underline text-indigo-600 hover:text-indigo-700">{{
          relatedExercise.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";

const { page } = useContent();
const prompt = formatText(page.value.prompt);
const code = ref(page.value.starter);
const success = ref(false);
const testOutput = ref("");
const isLoading = ref(false)

function formatText(text) {
  text = text.replaceAll("\n", "<br>");
  //   text = text.replace(" ", "&nbsp;");
  //   text = text.replace("\\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
  return text;
}
const { $getPyWorker, $analytics } = useNuxtApp();

let pyWorker

function outputHandler(output) {
  testOutput.value = output
  const failedRegex = /FAILED .+\.py::(.*?) -/g;
  const matches = output.matchAll(failedRegex);
  const failedTests = Array.from(matches, (match) => match[1]);

  const errorRegex = /ERROR .+\.py/g;
  success.value = failedTests.length === 0 && !output.match(errorRegex)
  isLoading.value = false
  $analytics.track("TEST_ATTEMPT", {
    exercise: page.value._path,
    pass: success.value,
  });
}

onMounted(() => {
  pyWorker = $getPyWorker(outputHandler)
});

watch(code, () => {
  testOutput.value = "";
});

// Update test file content when code changes so that the line numbers
// in pytest output match the line numbers in the editor
const testFileContent = computed(() => {
  return `${code.value}

${page.value.tests}
`;
});


function runCode() {
  isLoading.value = true
  const filename = `${page.value._path.replace(
    "/exercises/",
    (Math.random() + 1).toString(36).substring(2, 5) + "_"
  )}.py`;
  const toRun = `
import js
import os
import pytest
from io import StringIO
import sys
import pyodide
filename = "${filename}"

with open(filename, "w+") as f:
    f.write(r'''${testFileContent.value}''')

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

};

const exercises = await queryContent("exercises").only(["_path", "title", "tags"]).find();

const related = exercises.filter(e => e.tags && e.tags.includes(page.value.tags[0]) && e._path != page.value._path)
</script>


