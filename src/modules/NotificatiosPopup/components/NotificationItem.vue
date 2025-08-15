<template>
  <Transition name="fade">
    <div
      class="notification__item"
      :class="'notification__item--' + item.type"
    >
      <span
        class="notification__item-close"
        @click="close"
        v-html="cross"
      />
      <notification-icon :type="props.item.type" />
      <div class="notification__item-content">
        <span class="notification__item-title">{{ title }}</span>
        <span class="notification__item-message">{{ item.message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useNotificationsStore } from "@/stores/notifications";
//components
import NotificationIcon from "@/ui/NotificationIcon.vue";
//ts
import type {Notification} from "@/globalTypes/notification";
import { cross } from "@/assets/svg-icons";

const props = defineProps<{
  item: Notification.Item;
}>();

const notificationsStore = computed(() => {
  return useNotificationsStore();
});

const title = computed(() => {
  if (props.item.type === 'error') {
    return 'Error';
  } else {
    return 'Success';
  }
});

function close () {
  notificationsStore.value.deleteItem(props.item);
}
</script>

<style lang="less" scoped>
.notification__item {
  border-radius: 12px;
  position: relative;
  padding: 15px;
  display: flex;
  gap: 16px;

  &-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 60px;
  }

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>