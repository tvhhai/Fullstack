import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/views/layouts/MainLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import ProductManager from "@/views/product/ProductManager.vue";
import ProductType from "@/views/product/ProductType.vue";
import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/SignUp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: "/",
      name: "home",
      component: MainLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/",
          component: Dashboard,
          beforeEnter: (to, from, next) => {
            next("/dashboard");
          },
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "/phone",
          name: "phone",
          component: () => import("@/views/phone/PhoneManager.vue"),
        },
        {
          path: "product-manager",
          name: "product-manager",
          component: ProductManager,
        },
        {
          path: "product-type",
          name: "product-type",
          component: ProductType,
        },
        {
          path: "count",
          name: "count",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/Count.vue"),
        },
        {
          path: "/:catchAll(.*)*",
          component: Dashboard,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (false) {
      next({ name: "sign-in" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
