<template>
  <button
    :disabled="props.disabled"
    class="vue-button"
    :class="{ 'vue-button--disabled': props.disabled }"
  >
    <span
      v-if="iconName"
      class="icon"
      v-html="svgIcon"
    />
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineProps } from "vue";
import icons from "@/assets/svg-icons";

const props = defineProps({
  iconName: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const svgIcon = computed(() => {
  return icons[props.iconName];
});
</script>

<style lang="less">
.vue-button {
  background-color: var(--grey);
  border: none;
  height: 48px;
  width: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;

  &--disabled {
    background-color: var(--lightgrey);
    color: var(--midgrey);
  }
}
</style>
