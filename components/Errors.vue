<template>
  <div
    class="text-pink-600 font-medium rounded my-2 text-sm"
    v-if="errors.length > 0"
  >
    <div v-for="error in errors" :key="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  errors: {
    default() {
      return [];
    },
    type: Array,
  },
});
</script>