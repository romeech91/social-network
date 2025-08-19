import { defineStore } from "pinia";
import type { Notification } from "@/globalTypes/notification";
import { v4 as uuidv4 } from "uuid";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as Notification.Item[],
  }),
  actions: {
    addItem(item: Notification.Item) {
      const currentItem = {
        ...item,
        id: uuidv4(),
      }

      this.notifications.push(currentItem);

      setTimeout(() => {
        this.deleteItem(currentItem);
      }, 3000);
    },
    deleteItem(item: Notification.Item) {
      const currentItem = this.notifications.find(n => n.id === item.id) as Notification.Item;
      const index = this.notifications.indexOf(currentItem);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }
  },
});
