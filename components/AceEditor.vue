<template>
  <VAceEditor
    v-model:value="code"
    lang="python"
    theme="dracula"
    :minLines="20"
    :maxLines="40"
    :options="{
      fontSize: '12pt',
    }"
    :readonly="readonly"
  />
</template>

<script setup>
import { VAceEditor } from "vue3-ace-editor";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const code = useVModel(props, emit);
</script>