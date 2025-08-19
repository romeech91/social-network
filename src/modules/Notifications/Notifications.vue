<template>
  <div class="notifications">
    <Toast />
  </div>
</template>

<script lang="ts" setup>
//ts
import type { Notification } from "@/globalTypes/notification";
import { useNotificationsStore } from "../../stores/notifications";
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

const toast = useToast();

const store = useNotificationsStore();

const cachedIds = new Set();

function addNotification(item: Notification.Item) {
  toast.add({
    severity: item.type,
    summary: item.title,
    detail: item.message,
    life: 3000,
  });
}

store.$subscribe((mutation, state) => {
  const events = mutation.events;

  if (!events) return;
  if (state.notifications.length === 0) cachedIds.clear();

  if (Array.isArray(events)) {
    events.forEach(event => {
      if (!cachedIds.has(event.newValue.id)) {
        addNotification(event.newValue);
        cachedIds.add(event.newValue.id);
      }
    });
  } else {
    if (events?.newValue?.id && !cachedIds.has(events.newValue.id)) {
      addNotification(events.newValue);
      cachedIds.add(events.newValue.id);
    }
  }
});


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
