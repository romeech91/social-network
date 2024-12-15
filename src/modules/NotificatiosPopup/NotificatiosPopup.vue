<template>
  <div class="notifications">
    <notification-item
      v-for="(item, idx) in notificationsStore"
      :key="idx"
      :item="item"
    />
  </div>
</template>

<script lang="ts" setup>
import { watch, computed } from "vue";
import { useNotificationsStore } from "../../stores/notifications";
import NotificationItem from "./components/NotificationItem.vue";

const notificationsStore = computed(() => {
  return useNotificationsStore().notifications;
});

watch(
  () => notificationsStore.value,
  (value) => {
    console.log(value);
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.notifications {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: 10px;
  gap: 10px;
}
</style>
