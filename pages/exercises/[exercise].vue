<template>
  <div class="max-w-4xl mx-auto my-12">
    <h1 class="text-2xl sm:text-4xl font-bold my-4">{{ page.title }}</h1>
    <div class="flex mt-4 mb-8">
      <ExerciseTags :exercise="page" />
    </div>

    <p v-html="prompt" class="text-lg"></p>
    <div class="my-8">
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl p-1">
          <Tab as="template" v-slot="{ selected }">
            <button
              :class="[
                'rounded-lg px-6 py-2.5 text-lg font-medium leading-5 text-indigo-700 ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'shadow bg-indigo-200 text-indigo-100  '
                  : 'bg-gray-200 shadow hover:bg-indigo-500 hover:text-white',
              ]"
            >
              Code
            </button>
          </Tab>
          <Tab as="template" v-slot="{ selected }">
            <button
              :class="[
                'rounded-lg px-6 py-2.5 text-lg font-medium leading-5 text-indigo-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'shadow bg-indigo-200  text-indigo-100  '
                  : 'bg-gray-200 shadow hover:bg-indigo-500 hover:text-white',
              ]"
            >
              Tests
            </button>
          </Tab>
          <div class="flex grow justify-end">
            <Submit
              v-if="!success"
              @click="runCode"
              :is-loading="loading"
              :errors="errors"
              label="Run"
              btnClasses="bg-green-600 hover:bg-green-700"
            />
          </div>
        </TabList>

        <TabPanels class="mt-2">
          <TabPanel
            :class="[
              'rounded-xl bg-white ',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
            ]"
          >
            <AceEditor
              v-model="code"
              :readonly="false"
              :showLineNumbers="false"
            ></AceEditor>
          </TabPanel>
          <TabPanel
            :class="[
              'rounded-xl bg-white ',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
            ]"
          >
            <AceEditor v-model="testFileContent" readonly></AceEditor>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <textarea
        id="pytest-output"
        type="text"
        class="hidden"
        v-model="testOutput"
      />
      <div v-if="testOutput && !success">
        <p class="text-red-500 font-bold text-center px-3 py-2 my-2">
          Tests failed!
        </p>
        <AceEditor
          v-model="testOutput"
          :key="testOutput"
          readonly
          :showLineNumbers="false"
          theme="xcode"
        />
      </div>

      <div v-else-if="success">
        <p
          class="bg-green-500 text-gray-100 font-bold text-center px-3 py-2 my-2"
        >
          All tests passed!
        </p>
      </div>
    </div>

    <h5 class="font-bold text-lg">Related exercises</h5>
    <ul class="my-2">
      <li class="list-disc ml-4" v-for="relatedExercise in related" :key="relatedExercise._path" >
        <NuxtLink :to="relatedExercise._path" class="block my-2 underline text-cyan-600 hover:text-cyan-700">{{ relatedExercise.title }}</NuxtLink>
      </li>
    </ul>
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
const { $initializePyodide, $analytics } = useNuxtApp();

onMounted(() => {
  $initializePyodide();
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
  $analytics.track("TEST_ATTEMPT", {
    exercise: page.value._path,
    pass: pass,
  });
});

const exercises = await queryContent("exercises").only(["_path", "title", "tags"]).find();

const related = exercises.filter(e => e.tags && e.tags.includes(page.value.tags[0]) && e._path != page.value._path)
</script>


