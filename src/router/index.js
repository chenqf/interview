import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/conditionalRendering",
    name: "conditionalRendering",
    component: () => import("../views/conditional_rendering/index.vue")
  },
  {
    path: "/other",
    name: "other",
    component: () => import("../views/other/index.vue")
  },
  {
    path: "/vModel",
    name: "vModel",
    component: () => import("../views/v_model/index.vue")
  },
  {
    path: "/com",
    name: "com",
    component: () => import("../views/com/index.vue")
  },
  {
    path: "/forceUpdate",
    name: "forceUpdate",
    component: () => import("../views/force_update/index.vue")
  },
  {
    path: "/life",
    name: "life",
    component: () => import("../views/life/index.vue")
  },
  {
    path: "/pass",
    name: "pass",
    component: () => import("../views/pass/index.vue")
  },
  {
    path: "/watcher",
    name: "watcher",
    component: () => import("../views/watcher/index.vue")
  },
  {
    path: "/functional",
    name: "functional",
    component: () => import("../views/functional/index.vue")
  },
  {
    path: "/element",
    name: "element",
    component: () => import("../views/element/index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
