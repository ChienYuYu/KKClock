import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    component: () => import('../views/frontend/LoginView.vue'),
    meta: { title: 'KKClock 管理員登入' },
  },
  {
    path: '/backstage',
    component: () => import('../views/backend/ManagementView.vue'),
    meta: { title: 'KKClock 後台管理' },
    children: [
      {
        path: 'product_management',
        component: () => import('../views/backend/ManagementProduct.vue'),
        meta: { title: 'KKClock 產品管理' },
      },
      {
        path: 'coupon_management',
        component: () => import('../views/backend/ManagementCoupon.vue'),
        meta: { title: 'KKClock 優惠券管理' },
      },
      {
        path: 'order_management',
        component: () => import('../views/backend/ManagementOrder.vue'),
        meta: { title: 'KKClock 訂單管理' },
      },
    ],
  },
  {
    path: '/',
    component: () => import('../views/frontend/KKClockView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/frontend/KKClockHome.vue'),
        meta: { title: 'KKClock 時鐘專賣 送禮最佳選擇' },
      },
      {
        path: 'product_list/:category',
        component: () => import('../views/frontend/KKClockProduct.vue'),
        meta: { title: 'KKClock 購物' },
      },
      {
        path: 'product_list/product/:id',
        component: () => import('../views/frontend/KKClockProductItem.vue'),
        meta: { title: 'KKClock 購物' },
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/KKClockCart.vue'),
        meta: { title: 'KKClock 確認訂單' },
      },
      {
        path: 'buyer_info',
        component: () => import('../views/frontend/KKClockBuyerInfo.vue'),
        meta: { title: 'KKClock 填寫訂單資料' },
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/frontend/KKClockCheckout.vue'),
        meta: { title: 'KKClock 付款' },
      },
      {
        path: 'pay_completed/:orderId',
        component: () => import('../views/frontend/KKClockPayCompleted.vue'),
        meta: { title: 'KKClock 付款已完成' },
      },
      {
        path: 'order_search',
        component: () => import('../views/frontend/KKClockOrderSearch.vue'),
        meta: { title: 'KKClock 訂單查詢' },
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

router.beforeEach((to) => {
  document.title = to.meta.title;
});

export default router;
