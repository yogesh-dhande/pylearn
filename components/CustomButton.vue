<template>
  <button
    class="px-4 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
    @click="click"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);
function click(e) {
  e.preventDefault();
  emit("click");
}
</script>