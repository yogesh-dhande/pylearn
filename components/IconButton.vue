<template>
  <button class="h-8 w-8 p-1.5 rounded" @click="click">
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