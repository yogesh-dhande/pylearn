<template>
  <div class="max-w-5xl mx-auto my-8 sm:my-12">
    <h1 class="text-3xl sm:text-5xl font-bold my-8">{{ page.title }}</h1>
    <ContentDoc>
      <template #not-found>
        <h2>Topic ({{ $route.params.topic }}) not found</h2>
      </template>
    </ContentDoc>
    <!-- Code Along -->

    <div
      class="bg-gray-600 text-gray-100 pt-3 fixed inset-x-0 bottom-0 z-10 max-h-96 overflow-auto"
    >
      <div class="lg:hidden text-center pb-2">
        Open this page on desktop to code along as you read the article.
      </div>
      <div class="hidden lg:block">
        <div @click="open = !open" class="hover:text-gray-300 cursor-pointer">
          <div class="flex items-center justify-between">
            <div class="w-full text-center">
              The best way to learn is through
              <span class="text-cyan-500 font-semibold italic"
                >hands-on practice</span
              >. Code along as you read the article!
            </div>
            <ChevronDoubleDownIcon v-if="open" class="h-6 w-6" />
            <ChevronDoubleUpIcon v-else class="h-6 w-6" />
          </div>
        </div>
        <div class="relative mt-2 flex-1">
          <!-- Content -->
          <div v-if="open" class="grid grid-cols-2">
            <div class="bg-slate-800">
              <AceEditor v-model="code" :readonly="false"></AceEditor>
            </div>
            <div class="p-4 bg-gray-100">
              <button
                class="flex items-center bg-gray-600 hover:bg-gray-700 text-gray-100 px-3 py-1 rounded-md"
                @click="runCode(code)"
              >
                <PlayIcon class="h-5 w-5 inline-block mr-1" />
                <div>Run</div>
              </button>
              <div
                v-if="showOutput"
                id="pyodide-output"
                class="text-gray-700 leading-loose"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Prev and next links -->
    <div class="grid grid-cols-2 gap-8 sm:gap-16 my-12 sm:my-24">
      <div
        v-if="prev?._path.includes('/concepts/')"
        class="bg-gray-100 hover:bg-gray-200 group relative border border-gray-500 rounded-md p-4"
      >
        <h3
          class="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
        >
          <NuxtLink :to="prev._path">
            <span class="absolute inset-0" />
            {{ prev.title }}
          </NuxtLink>
        </h3>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {{ prev.description }}
        </p>
        <ArrowLongLeftIcon class="h-8 w-8" />
      </div>
      <div v-else></div>

      <div
        v-if="next?._path.includes('/concepts/')"
        class="bg-gray-100 hover:bg-gray-200 group relative border border-gray-500 rounded-md p-4"
      >
        <h3
          class="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
        >
          <NuxtLink :to="next._path">
            <span class="absolute inset-0" />
            {{ next.title }}
          </NuxtLink>
        </h3>
        <p class="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {{ next.description }}
        </p>
        <div class="flex justify-end">
          <ArrowLongRightIcon class="h-8 w-8" />
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PlayIcon,
} from "@heroicons/vue/20/solid";

const open = ref(true);

const code = ref("");
const showOutput = ref(false);
const { page } = useContent();
const { data } = await useAsyncData(() =>
  queryContent("/concepts")
    .sort({ $numeric: false })
    .findSurround(page.value._path)
);
const [prev, next] = data.value;

const { $runPython, $initializePyodide, $analytics } = useNuxtApp();

onMounted(() => {
  $initializePyodide();
});

async function runCode(code) {
  $analytics.track("CODE_ALONG", {
    topic: page.value._path,
  });
  const toRun = `
import js
import sys
from io import StringIO
# Capture the output
output = StringIO()
sys.stdout = output

# Run the code
${code}

# Get the captured output
captured_output = output.getvalue()

# Restore the original stdout
sys.stdout = sys.__stdout__

# Send the captured output to HTML
captured_output = captured_output.replace("\\n", "<br>")
captured_output = captured_output.replace(" ", "&nbsp;")
captured_output = captured_output.replace("\\t", "&nbsp;&nbsp;&nbsp;&nbsp;")
js.document.getElementById("pyodide-output").innerHTML = captured_output
`;
  showOutput.value = true;

  return await $runPython(toRun);
}
</script>


<style>
p {
  margin: 1rem 0;
}

p[data-v-inspector] a {
  @apply underline text-cyan-600 hover:text-cyan-700;
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
