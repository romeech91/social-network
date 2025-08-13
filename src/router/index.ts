import { createWebHistory, createRouter } from "vue-router";

import Posts from "../pages/Posts.vue";
import Auth from "../pages/Auth.vue";
import Chat from "../pages/Chat.vue";
import ChatList from "../pages/ChatList.vue";
import SettingsPage from "../pages/SettingsPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Posts,
  },
  {
    path: "/login",
    name: "login",
    component: Auth,
  },
  {
    path: "/chat/:personId",
    name: "chat",
    params: {
      personId: Number,
    },
    props: true,
    component: Chat,
  },
  {
    path: "/chat-list",
    name: "chat-list",
    component: ChatList,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
