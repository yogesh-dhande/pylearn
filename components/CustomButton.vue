<template>
  <button
    class="block w-full px-6 py-2 border border-transparent shadow-sm text-sm font-bold rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
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