<template>
  <div class="flex flex-wrap">
    <div>
      <div
        ref="itemRef"
        class="ease-linear transition-all duration-150"
        @mouseenter="toggleTooltip()"
        @mouseleave="toggleTooltip()"
      >
        <slot></slot>
      </div>
      <div
        ref="tooltipRef"
        :class="{ hidden: !show, block: show }"
        class="bg-gray-200 text-gray-200 border-0 ml-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg shadow-lg"
      >
        <div class="text-gray-800 font-semibold px-3 py-2 rounded">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createPopper } from "@popperjs/core";

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
});

const itemRef = ref(null);
const tooltipRef = ref(null);
const show = ref(false);

function toggleTooltip() {
  if (show.value) {
    show.value = false;
  } else {
    show.value = true;
    createPopper(itemRef.value, tooltipRef.value, {
      placement: "top-start",
    });
  }
}
</script>