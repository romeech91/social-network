<template>
  <button class="vue-button">
    <span v-if="iconName" class="icon" v-html="svgIcon"></span>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import icons from "@/assets/svg-icons.js";

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
