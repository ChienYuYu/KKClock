<template>
  <div class="d-flex">
    <aside class="sidebar vh-100 border-end bg-dark d-flex flex-column position-fixed">
      <h2 class="px-5 py-4 text-white">後臺管理</h2>
      <ul class="list-group list-unstyled text-center">
        <li>
          <router-link
            to="/backstage/product_management"
            class="menuItem text-decoration-none d-block p-4">
            <i class="bi bi-basket-fill me-2"></i>產品管理&emsp;
          </router-link>
        </li>
        <li>
          <router-link
            to="/backstage/order_management"
            class="menuItem text-decoration-none d-block p-4">
            <i class="bi bi-list-ul me-2"></i>訂單管理&emsp;
          </router-link>
        </li>
        <li>
          <router-link
            to="/backstage/coupon_management"
            class="menuItem text-decoration-none d-block p-4">
            <i class="bi bi-ticket me-2"></i>優惠券管理&emsp;
          </router-link>
        </li>
        <li>
          <router-link
            to="/"
            target="_blank"
            class="menuItem text-decoration-none d-block p-4">
            <i class="bi bi-card-image me-2"></i>開啟前台&emsp;
          </router-link>
        </li>
      </ul>
      <a
        href="#"
        class="mt-auto menuItem text-decoration-none d-block text-center border-top p-4"
        @click.prevent="logout">
        <i class="bi bi-box-arrow-left me-2"></i>登出&emsp;</a>
    </aside>
    <main class="main bg-light">
      <router-view />
    </main>
    <ToastArea class="ToastArea"/>
  </div>
</template>

<script>
import currency from '@/methods/currency';
import emitter from '@/methods/emitter';
import ToastArea from '@/components/ToastArea.vue';

export default {
  components: {
    ToastArea,
  },
  provide() {
    return {
      currency,
      emitter,
    };
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.axios.post(api).then(() => {
        this.$router.push('/login');
      });
    },
  },
  beforeCreate() {
    document.title = this.$route.meta.title;
  },
  created() {
    // 從cookie取出token↓
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)kkclock\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // axios全域設定，之後發送api自動夾帶token在header裡
    this.axios.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.axios.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push('/kkClock_administrator/login');
      }
    });
  },
};
</script>

<style lang="scss">
.sidebar {
  width: 230px;
  .menuItem {
    color: #fff;
    background: transparent;
    transition: 0.3s;
    &:hover {
      color: #444;
      background: #eee;
    }
  }
}
.main {
  width: calc(100% - 230px);
  margin-left: 230px;
}
.router-link-exact-active {
  background: #fa0 !important;
  color: #111 !important;
}
.ToastArea {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;
}
</style>
