import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import Product from "../views/Product.vue";
import Account from "../views/Account.vue";
import Delivery from "../views/Delivery.vue";
import Policy from "../views/Policy.vue";
import Order from "../views/Order.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/policy",
    name: "Policy",
    component: Policy,
  },
  {
    path: "/delivery",
    name: "Delivery",
    component: Delivery,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
