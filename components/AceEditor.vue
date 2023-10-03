<template>
  <VAceEditor
    v-model:value="code"
    lang="python"
    :theme="theme"
    :minLines="6"
    :maxLines="40"
    :options="{
      useWorker: true,
      fontSize: '12pt',
      showLineNumbers: showLineNumbers,
    }"
    :readonly="readonly"
    @init="editorInit"
  />
</template>

<script setup>
import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: true,
  },
  showLineNumbers: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: "dracula",
  },
});

function editorInit(editor) {
  editor.renderer.setScrollMargin(12, 12, 12, 12);
}

const emit = defineEmits(["update:modelValue"]);
const code = useVModel(props, emit);
</script>