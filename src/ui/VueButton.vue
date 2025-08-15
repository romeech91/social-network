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
//ts
import { computed } from "vue";
import icons from "@/assets/svg-icons";

const props = defineProps<{
  iconName?: string,
  disabled?: boolean,
}>()

const svgIcon = computed(() => {
  return icons[props.iconName as keyof typeof icons];
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
