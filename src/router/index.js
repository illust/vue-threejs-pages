import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "cross-word-3d"
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
  },
  {
    path: "/texture-demo",
    name: "texture-demo",
    component: () => import( /* webpackChunkName: "TextureDemo" */ "@/components/TextureDemo")
  },
  {
    path: "/cross-word-3d",
    name: "cross-word-3d",
    component: () => import( /* webpackChunkName: "CrossWord3D" */ "@/components/CrossWord3D")
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