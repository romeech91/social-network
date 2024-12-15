<template>
  <div
    class="notification__item"
    :class="'notification__item--' + item.type"
  >
    <span class="notification__item-title">{{ title }}</span>
    <span class="notification__item-message">{{ item.message }}</span>
  </div>
</template>

<script lang="ts" setup>
//vue
import { defineProps, computed } from "vue";
//ts
import { NotificationItem } from "@/globalTypes/index";

const props = defineProps<{
  item: NotificationItem;
}>();

const title = computed(() => {
  if (props.item.type === 'error') {
    return 'Error';
  } else {
    return 'Success';
  }
});
</script>

<style lang="less" scoped>
.notification__item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  gap: 10px;
  padding-right: 60px;

  &-title {
    color: #27303A;
    font-size: 14px;
    font-weight: 700;
  }

  &-message {
    color: #2F3F53;
    font-size: 12px;
  }

  &--error {
    background-color: #FFF5F3;
    border: 1px solid #F4B0A1;
  }
}
</style>