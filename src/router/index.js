import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "tea-pot"
  },
  {
    path: "/flip-image",
    name: "flip-image",
    component: () => import( /* webpackChunkName: "FlipImage" */ "@/components/FlipImage")
  },
  {
    path: "/tea-pot",
    name: "tea-pot",
    component: () => import( /* webpackChunkName: "TeaPot" */ "@/components/TeaPot")
  }
]

const router = new VueRouter({
  mode: 'history', // 去掉url中的#
  base: "/vue-threejs-pages/",
  scrollBehavior: () => ({
    y: 0
  }),
  routes
});

export default router;