import HomeLayout from "@/layout/HomeLayout.vue";
import Home from "@/pages/Home.vue";
import Gifts from "@/pages/Gifts.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeLayout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/gifts",
        component: Gifts,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
