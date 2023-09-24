<template>
  <div class="max-w-5xl mx-auto my-12">
    <h1 class="text-3xl font-bold my-4">{{ page.title }}</h1>
    <p v-html="prompt"></p>
    <div class="my-8">
      <textarea
        id="pytest-output"
        type="text"
        class="hidden"
        v-model="testOutput"
      />
      <AceEditor
        v-if="testOutput"
        v-model="testOutput"
        :key="testOutput"
        readonly
      />
      <Submit
        @click="runCode"
        class="my-2"
        :is-loading="loading"
        :errors="errors"
      />
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab as="template" v-slot="{ selected }">
            <button
              :class="[
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              Code
            </button>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <button
              :class="[
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
              ]"
            >
              Tests
            </button>
          </Tab>
        </TabList>

        <TabPanels class="mt-2">
          <TabPanel
            :class="[
              'rounded-xl bg-white ',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <AceEditor v-model="code" :readonly="false"></AceEditor>
          </TabPanel>
          <TabPanel
            :class="[
              'rounded-xl bg-white ',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <AceEditor v-model="page.tests" readonly></AceEditor>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const { page } = useContent();
const prompt = formatText(page.value.prompt);
const code = ref(page.value.starter);
const testOutput = ref("");

function formatText(text) {
  text = text.replaceAll("\n", "<br>");
  //   text = text.replace(" ", "&nbsp;");
  //   text = text.replace("\\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
  return text;
}

const {
  loading,
  errors,
  asyncHandler: runCode,
} = useAsyncHandler(async () => {
  testOutput.value = "";
  const filename = `${page.value._path.replace("/exercises/", "")}.py`;
  const pyodide = await loadPyodide();
  await pyodide.loadPackage("pytest");
  await pyodide.runPythonAsync(`
import js
import pytest
from io import StringIO
import sys
import pyodide
filename = "${filename}"

content = '''
${code.value}

${page.value.tests}
'''

print(content)

with open(filename, "w") as f:
    f.write(content)


# Capture the output
output = StringIO()
sys.stdout = output

# Run the tests
pytest.main(["-qq", filename])

# Get the captured output
captured_output = output.getvalue()

# Restore the original stdout
sys.stdout = sys.__stdout__

js.document.getElementById("pytest-output").value = captured_output
                    
`);
  testOutput.value = document.getElementById("pytest-output").value;
});
</script>


<style scoped>
</style>
