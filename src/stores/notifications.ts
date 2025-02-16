import { defineStore } from "pinia";
// import type {Notification} from "@/globalTypes/index";

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
    deleteItem(item: NotificationItem) {
      const index = this.notifications.indexOf(item);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }
  },
});
