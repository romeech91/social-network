import axios from "axios";
import type { App } from "vue";
import { useNotificationsStore } from "../stores/notifications";

let notificationsStore: ReturnType<typeof useNotificationsStore> | null = null;

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!notificationsStore) {
      notificationsStore = useNotificationsStore();
    }

    const status = error.response ? error.response.status : null;
    if (status === 401) {
      window.location.href = '/login';
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

apiClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

export default {
  install: (app: App) => {
    app.config.globalProperties.$axios = axios.create();
  },
  get(url: string, params = {}) {
    return apiClient.get(url, params);
  },
  post(url: string, data: any) {
    return apiClient.post(url, data);
  },
  put(url: string, data: any) {
    return apiClient.put(url, data);
  },
  delete(url: string) {
    return apiClient.delete(url);
  },
};
