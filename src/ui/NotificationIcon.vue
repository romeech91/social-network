<template>
  <div
    class="notification-icon"
    :class="`notification-icon--${type}`"
  >
    <span v-html="crossMini" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type {Notification} from "@/globalTypes/index";
import { crossMini } from "@/assets/svg-icons";

defineProps<{
  type: Notification.Type;
}>();
</script>

<style lang="less" scoped>
.notification-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &--error {
    background-color: #E88B76;
  }

  & span {
    width: 8px;
    height: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }


}
</style>