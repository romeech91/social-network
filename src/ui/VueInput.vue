<template>
  <div
    class="vue-input"
    :class="{ 'vue-input--flat': flat }"
  >
    <span
      v-if="props.label"
      class="vue-input__label"
    >{{ props.label }}</span>
    <input
      class="vue-input__field"
      :type="props.type"
      :value="modelValue"
      :placeholder="props.placeholder"
      @input="onInput"
    >
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  flat: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="less" scoped>
@parent: .vue-input;

@{parent} {
  &--flat {
    & @{parent}__field {
      border-radius: 0;
      background-color: transparent;
      border-bottom: 1px solid #cdd1d0;
      width: 100%;
      padding: 0;
    }
  }

  &__field {
    height: 56px;
    padding: 0 16px;
    background-color: #f4f4f5;
    border-radius: 8px;
    border: none;

    &:focus,
    &:focus-visible,
    &:active {
      // border: none;
      outline: none;
    }
  }

  &__label {
    color: var(--grey);
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
