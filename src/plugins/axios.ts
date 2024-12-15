import axios from "axios";
import type { App } from "vue";
import { useNotificationsStore } from "../stores/notifications";

let notificationsStore: ReturnType<typeof useNotificationsStore> | null = null;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!notificationsStore) {
      notificationsStore = useNotificationsStore();
    }

    const status = error.response ? error.response.status : null;
    if (status === 401) {
      console.log("Unauthorized");
    } else if (status === 404) {
      console.log("404 Not Found");
    } else {
      notificationsStore.addItem({
        type: "error",
        message: error.response?.data || "Произошла неизвестная ошибка",
      });
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export default {
  install: (app: App) => {
    app.config.globalProperties.$axios = axios.create();
  },
};
