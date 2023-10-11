<template>
  <div class="max-w-5xl mx-auto my-8 sm:my-12">
    <h1 class="text-3xl sm:text-5xl font-bold my-8">{{ page.heading }}</h1>
    <ContentDoc>
      <template #not-found>
        <h2>Topic ({{ $route.params.topic }}) not found</h2>
      </template>
    </ContentDoc>
    <!-- Code Along -->

    <div class="bg-gray-600 text-gray-100 pt-3 fixed inset-x-0 bottom-0 z-10 max-h-96 overflow-auto">
      <div class="lg:hidden text-center pb-2">
        Open this page on desktop to code along as you read the article.
      </div>
      <div class="hidden lg:block">
        <div @click="open = !open" class="hover:text-gray-300 cursor-pointer">
          <div class="flex items-center justify-between">
            <div class="w-full text-center">
              The best way to learn is through
              <span class="text-cyan-500 font-semibold italic">hands-on practice</span>. Code along as you read the
              article!
            </div>
            <ChevronDoubleDownIcon v-if="open" class="h-6 w-6" />
            <ChevronDoubleUpIcon v-else class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex-1">
          <div v-if="open" class="grid grid-cols-2">
            <div class="bg-slate-800 relative">
              <button
                class="absolute right-2 top-2 z-10 inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-gray-100 px-3 py-1 rounded-md"
                @click="runCode(code)">
                <PlayIcon class="h-5 w-5 inline-block mr-1" />
                <div>Run</div>
              </button>
              <AceEditor v-model="code" :readonly="false"></AceEditor>
            </div>
            <div class="p-4 bg-gray-200 relative">

              <div id="pyodide-output" class=" font-mono text-gray-700 leading-loose">

              </div>
              <div class="absolute right-2 top-2 z-10">
                <!-- Pyodide warning -->
                <div class="relative group">
                  <div class="z-10 absolute top-0 right-0 flex flex-col items-center hidden mr-8 group-hover:flex">
                    <p class="bg-gray-700 text-gray-100 w-80 px-3 py-2 rounded shadow text-sm">Code is executed with <a
                        href="https://pyodide.org/">Pyodide</a>,
                      a port of CPython to WebAssembly/Emscripten. Some <a
                        href="https://pyodide.org/en/stable/usage/wasm-constraints.html">functionality</a> in Python may
                      not be avaiable or may not work as expected.</p>

                  </div>
                  <ExclamationTriangleIcon class="text-yellow-600 h-7 w-7" aria-hidden="true" />

                </div>
                <!-- End Pyodide warning -->
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Prev and next links -->
    <div class="grid grid-cols-2 gap-8 sm:gap-16 my-12 sm:my-24">
      <div v-if="prev?._path.includes('/concepts/')"
        class="bg-gray-100 hover:bg-gray-200 border border-gray-500 rounded-md p-4">
        <div class="flex flex-col items-start">
          <NuxtLink :to="prev._path"
            class="text-right mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            {{ prev.heading }}
          </NuxtLink>
          <ArrowLongLeftIcon class="h-8 w-8" />
        </div>
      </div>
      <div v-else></div>

      <div v-if="next?._path.includes('/concepts/')"
        class="bg-gray-100 hover:bg-gray-200 border border-gray-500 rounded-md p-4">
        <div class="flex flex-col items-end">
          <NuxtLink :to="next._path"
            class="text-right mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            {{ next.heading }}
          </NuxtLink>
          <ArrowLongRightIcon class="h-8 w-8" />
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  PlayIcon,
} from "@heroicons/vue/20/solid";

const { page } = useContent();

const open = ref(true);
const code = ref("");
const isLoading = ref(false)

const { data } = await useAsyncData(() =>
  queryContent("/concepts")
    .sort({ $numeric: false })
    .findSurround(page.value._path)
);
const [prev, next] = data.value;

const { $getPyWorker, $analytics } = useNuxtApp();

let pyWorker

function outputHandler(output) {
  document.getElementById("pyodide-output").innerHTML = output
  isLoading.value = false
}

onMounted(() => {
  pyWorker = $getPyWorker(outputHandler)
});

async function runCode(code) {
  isLoading.value = true

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
captured_output
`;

  pyWorker.run(toRun);
  $analytics.track("CODE_ALONG", {
    topic: page.value._path,
  });
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
