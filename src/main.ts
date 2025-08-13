import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "./plugins/axios";
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(axios);
app.use(PerfectScrollbarPlugin, {
  componentName: 'scroll-bar',
});
app.mount("#app");
