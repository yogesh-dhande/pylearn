import { computed } from "vue";

export function useVModel(props, emit) {
  return computed({
    get: () => props.modelValue,
    set: (value) => {
      emit("update:modelValue", value);
    },
  });
}
