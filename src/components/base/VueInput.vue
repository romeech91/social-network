<template>
  <input
    class="vue-input"
    type="text"
    :value="modelValue"
    @input="onInput"
    placeholder="Type a message ..."
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Получаем проп modelValue и его обновление через emit
const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

// Обрабатываем изменение в input
const onInput = (event) => {
  emit("update:modelValue", event.target.value); // Обновляем modelValue через emit
};
</script>

<style lang="less" scoped>
.vue-input {
  height: 56px;
  padding: 0 16px;
  background-color: #f4f4f5;
  border-radius: 8px;
  border: none;

  &:focus,
  &:focus-visible,
  &:active {
    border: none;
    outline: none;
  }
}
</style>
