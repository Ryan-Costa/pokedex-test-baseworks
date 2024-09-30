import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import Router from "./router";
import "./service/axios";

const MyApp = createApp(App);

MyApp.use(Router);
MyApp.mount("#app");
