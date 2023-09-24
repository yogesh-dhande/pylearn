<template>
  <div class="max-w-5xl mx-auto my-12">
    <h1 class="text-3xl font-bold my-4">{{ page.title }}</h1>
    <p v-html="prompt"></p>
    <div class="my-8">
      <Submit @click="run" class="my-2" />
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab as="template" :key="category" v-slot="{ selected }">
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
          <Tab as="template" :key="category" v-slot="{ selected }">
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
            :key="idx"
            :class="[
              'rounded-xl bg-white ',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <AceEditor v-model="code"></AceEditor>
          </TabPanel>
          <TabPanel
            :key="idx"
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

function formatText(text) {
  text = text.replaceAll("\n", "<br>");
  //   text = text.replace(" ", "&nbsp;");
  //   text = text.replace("\\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
  return text;
}

function run() {
  console.log(code.value);
}
</script>


<style scoped>
</style>
