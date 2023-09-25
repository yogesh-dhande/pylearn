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
      <div v-if="testOutput && !success">
        <p
          class="bg-red-500 text-gray-100 font-bold text-center px-3 py-2 my-2"
        >
          Tests failed!
        </p>
        <AceEditor
          v-model="testOutput"
          :key="testOutput"
          readonly
          :showLineNumbers="false"
        />
      </div>

      <div v-else-if="success">
        <p
          class="bg-green-500 text-gray-100 font-bold text-center px-3 py-2 my-2"
        >
          All tests passed!
        </p>
      </div>
      <div class="flex justify-between space-x-2 my-2">
        <NuxtLink
          v-if="prev"
          :to="prev._path"
          class="bg-gray-700 text-gray-100 px-6 py-2 rounded shadow text-lg font-bold"
          >Previous</NuxtLink
        >
        <Submit
          v-if="!success"
          @click="runCode"
          :is-loading="loading"
          :errors="errors"
          label="Run"
          class="grow"
        />
        <div v-else></div>
        <NuxtLink
          v-if="next"
          :to="next._path"
          class="bg-gray-700 text-gray-100 px-6 py-2 rounded shadow text-lg font-bold"
          >Next</NuxtLink
        >
      </div>

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
            <AceEditor v-model="testFileContent" readonly></AceEditor>
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
const success = ref(false);
const testOutput = ref("");

function formatText(text) {
  text = text.replaceAll("\n", "<br>");
  //   text = text.replace(" ", "&nbsp;");
  //   text = text.replace("\\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
  return text;
}

// Update test file content when code changes so that the line numbers
// in pytest output match the line numbers in the editor
const testFileContent = computed(() => {
  return `
${code.value}

${page.value.tests}
`;
});

const {
  loading,
  errors,
  asyncHandler: runCode,
} = useAsyncHandler(async () => {
  const { result, pass } = await useTestRunner(
    testFileContent.value,
    page.value
  );
  testOutput.value = result;
  success.value = pass;
});

const { data } = await useAsyncData(() =>
  queryContent("exercises")
    .only(["_path", "title"])
    .findSurround(page.value._path)
);
const [prev, next] = data.value;
</script>


<style scoped>
</style>
