<template>
  <div>
    <Errors v-if="errors.length > 0" :errors="errors" />
    <Errors
      v-else-if="disabled"
      :errors="['Please correct all errors before proceeding.']"
    />
    <div v-if="!isLoading">
      <CustomButton
        :class="btnClasses"
        :disabled="errors.length > 0 || disabled"
        @click="click"
        >{{ label }}</CustomButton
      >
    </div>
    <div v-else>
      <CustomButton class="flex justify-center" :class="btnClasses" disabled>
        <LoadingIndicator />
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array,
    default() {
      return [];
    },
  },
  label: {
    type: String,
    default: "Submit",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  btnClasses: {
    type: String,
    default: "bg-indigo-500 hover:bg-indigo-600",
  },
});
const emit = defineEmits(["click"]);

function click() {
  emit("click");
}
</script>