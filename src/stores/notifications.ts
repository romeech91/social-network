import { defineStore } from "pinia";
import type { Notification } from "@/globalTypes/notification";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as Notification.Item[],
  }),
  actions: {
    addItem(item: Notification.Item) {
      this.notifications.push(item);
    },
    deleteItem(item: Notification.Item) {
      const index = this.notifications.indexOf(item);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }
  },
});
