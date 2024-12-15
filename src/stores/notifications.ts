import { defineStore } from "pinia";

type NotificationItem = {
  type: string;
  message: string;
};

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as NotificationItem[],
  }),
  actions: {
    addItem(item: NotificationItem) {
      this.notifications.push(item);
    },
  },
});
