import axios from "axios";
import { App } from "vue";
import router from "@/router";
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
      notificationsStore.addItem({
        type: "error",
        message: error.response?.data?.message || "Unknown error",
        title: "Auth error",
      });
      router.push({ name: 'login' })
    } else if (status === 404) {
      notificationsStore.addItem({
        type: "error",
        message: error.response?.data?.message || "Error 404",
        title: "Resource not found",
      });
    } else {
      notificationsStore.addItem({
        type: "error",
        message: error.response?.data || "Произошла неизвестная ошибка",
        title: "Error request",
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
    app.config.globalProperties.$axios = apiClient;
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
