import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../pages/Main.vue";
import Auth from "../pages/Auth.vue";
import Direct from "../pages/Direct.vue";
import ChatList from "../pages/ChatList.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Auth,
  },
  {
    path: "/direct",
    name: "direct",
    component: Direct,
  },
  {
    path: "/chat-list",
    name: "chat-list",
    component: ChatList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
