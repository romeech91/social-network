<template>
  <button class="vue-button">
    <span v-if="iconName" class="icon" v-html="svgIcon"></span>
    <template v-else>
      <slot></slot>
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
});

const svgIcon = computed(() => {
  return icons[props.iconName];
});
</script>

<style lang="less">
.vue-button {
  background-color: #2aafeb;
  border: none;
  height: 56px;
  width: 63px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
