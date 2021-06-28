import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import Product from "../views/Product.vue";
import Account from "../views/Account.vue";
import Delivery from "../views/Delivery.vue";
import Policy from "../views/Policy.vue";
import Order from "../views/Order.vue";
import Organizations from "../views/Organizations.vue";
import Jobs from "../views/Jobs.vue";
import Sales from "../views/Sales.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Главная"
    }
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
    meta: {
      title: "Каталог"
    }
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: {
      title: "Товар"
    }
  },
  {
    path: "/policy",
    name: "Policy",
    component: Policy,
    meta: {
      title: "Политика конфиденциальности"
    }
  },
  {
    path: "/delivery",
    name: "Delivery",
    component: Delivery,
    meta: {
      title: "Доставка и самовывоз"
    }
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      title: "Учетная запись"
    }
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: {
      title: "Оформление заказа"
    }
  },
  {
    path: "/jobs",
    name: "Order",
    component: Jobs,
    meta: {
      title: "Вакансии"
    }
  },
  {
    path: "/sale",
    name: "Order",
    component: Sales,
    meta: {
      title: "Акции"
    }
  },
  {
    path: "/organization",
    name: "Order",
    component: Organizations,
    meta: {
      title: "Для юридических лиц"
    }
  },
  {
    path: "/contacts",
    name: "About",
    meta: {
      title: "Связаться с нами"
    },
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
