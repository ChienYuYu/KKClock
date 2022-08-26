import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
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
        component: () => import('../views/ManagementProduct.vue'),
      },
      {
        path: 'coupon_management',
        component: () => import('../views/ManagementCoupon.vue'),
      },
      {
        path: 'order_management',
        component: () => import('../views/ManagementOrder.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../views/KKClockView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/KKClockHome.vue'),
        meta: {
          title: 'KKClock 時鐘專賣 送禮最佳選擇',
        },
      },
      {
        path: 'product_list/:category',
        component: () => import('../views/KKClockProduct.vue'),
        meta: {
          title: 'KKClock 產品',
        },
      },
      {
        path: 'product_list/product/:id',
        component: () => import('../views/KKClockProductItem.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/KKClockCart.vue'),
        meta: {
          title: 'KKClock 確認訂單',
        },
      },
      {
        path: 'buyer_info',
        component: () => import('../views/KKClockBuyerInfo.vue'),
        meta: {
          title: 'KKClock 填寫訂單資料',
        },
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/KKClockCheckout.vue'),
        meta: {
          title: 'KKClock 付款',
        },
      },
      {
        path: 'pay_completed/:orderId',
        component: () => import('../views/KKClockPayCompleted.vue'),
        meta: {
          title: 'KKClock 付款已完成',
        },
      },
      {
        path: 'order_search',
        component: () => import('../views/KKClockOrderSearch.vue'),
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
