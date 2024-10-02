import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import Router from "./router";
import "./service/axios";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
const router = Router;

app.use(pinia);
app.use(router);

app.mount("#app");
