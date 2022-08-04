import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/kkClock_administrator/login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'KKClock 管理員登入',
    },
  },
  {
    path: '/backstage',
    component: () => import('../views/ManagementView.vue'),
    meta: {
      title: 'KKClock 後台管理',
    },
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
        meta: {
          title: 'KKClock 時鐘專賣 送禮最佳選擇',
        },
      },
      {
        path: 'product_list/:category',
        component: () => import('../views/KKClock_product.vue'),
        meta: {
          title: 'KKClock 產品',
        },
      },
      {
        path: 'product_list/product/:id',
        component: () => import('../views/KKClock_productItem.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/KKClock_cart.vue'),
        meta: {
          title: 'KKClock 填寫訂單資料',
        },
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/KKClock_checkout.vue'),
        meta: {
          title: 'KKClock 訂單明細',
        },
      },
      {
        path: 'order_search',
        component: () => import('../views/KKClock_orderSearch.vue'),
        meta: {
          title: 'KKClock 訂單查詢',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },

});

export default router;
