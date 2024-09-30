import { createRouter, createWebHistory } from "vue-router";
import PokemonDetails from "../components/PokemonDetails.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokemon/:name",
    name: "PokemonDetails",
    component: PokemonDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
