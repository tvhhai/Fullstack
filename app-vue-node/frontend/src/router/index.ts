import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/views/layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainLayout,
      children: [
        {
          path: "/count",
          name: "count",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/Count.vue"),
        },
      ],
    },
  ],
});

export default router;
