import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/backstage',
    component: () => import('../views/ManagementView.vue'),
    children: [
      {
        path: 'product_management',
        component: () => import('../views/Management_product.vue'),
      },
      {
        path: 'coupon_management',
        component: () => import('../views/Management_coupon.vue'),
      },
      {
        path: 'order_management',
        component: () => import('../views/Management_order.vue'),
      },
    ],
  },
  {
    path: '/kkClock',
    component: () => import('../views/KKClockView.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/KKClock_home.vue'),
      },
      {
        path: 'product_list',
        component: () => import('../views/KKClock_product.vue'),
      },
      {
        path: 'product_list/:id',
        component: () => import('../views/KKClock_productItem.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/KKClock_cart.vue'),
      },
      {
        path: 'checkout/:id',
        component: () => import('../views/KKClock_checkout.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
