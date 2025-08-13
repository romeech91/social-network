<template>
  <div class="info-item">
    <span class="info-item__label">{{ props.item.label }}</span>
    <div class="info-item__value">
      {{ props.item.value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { InfoItem } from "./types";

const props = defineProps<{
  item: InfoItem
}>()
</script>

<style lang="less" scoped>
.info-item {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__label {
    color: #797C7B;
    font-size: 14px;
  }

  &__value {
    color: #000E08;
    font-size: 18px;
  }
}
</style>