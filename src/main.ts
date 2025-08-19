import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "./plugins/axios";
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

import 'vue3-perfect-scrollbar/style.css';
import 'primeicons/primeicons.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(axios);
app.use(PrimeVue, {
  theme: {
      preset: Aura,
      options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
      }
  }
});
app.use(ToastService);

app.use(PerfectScrollbarPlugin, {
  componentName: 'scroll-bar',
});

app.mount("#app");
