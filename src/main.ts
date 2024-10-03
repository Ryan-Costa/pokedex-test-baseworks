import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import Router from "./router";
import "./service/axios";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import Lara from "@primevue/themes/lara";

const app = createApp(App);
const pinia = createPinia();
const router = Router;
const primevue = PrimeVue;

app.use(pinia);
app.use(router);
app.use(primevue, {
  theme: {
    preset: Lara,
    options: {
      prefix: "p",
      darkModeSelector: "",
      cssLayer: false,
    },
  },
});

app.mount("#app");
