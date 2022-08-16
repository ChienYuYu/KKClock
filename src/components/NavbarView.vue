<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm fixed-top">
    <div class="container">
      <h1 class="m-0">
        <router-link to="/" class="navbar-brand p-0 d-block">
          <img src="../assets/img/fakeLogo05.png" alt="logo" height="40" />
        </router-link>
      </h1>
      <button
        ref="navbarBtn"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        :aria-expanded="navStatus"
        @click="navStatusChange"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav" ref="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product_list/全部商品" class="nav-link">購物</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/order_search" class="nav-link">訂單查詢</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="openOffcanvas()">
              購物車
              <i class="bi bi-cart-fill position-relative">
                <span
                  class="position-absolute top-0 start-100 translate-middle
                  badge badge_txt rounded-circle bg-myorange"
                  :class="cartQty == 0 ? 'd-none' : 'd-block'"
                  >{{ cartQty }}
                </span>
              </i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <CartOffcanvas ref="cartOffcanvas"></CartOffcanvas>
</template>

<script>
import CartOffcanvas from './CartOffcanvas.vue';

export default {
  components: {
    CartOffcanvas,
  },
  data() {
    return {
      cartQty: '',
      navStatus: false,
    };
  },
  methods: {
    openOffcanvas() {
      this.$refs.cartOffcanvas.showOffcanvas();
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(api).then((res) => {
        this.cartQty = res.data.data.carts.length;
      });
    },
    // navStatusChange()與下方監聽搭配使用
    navStatusChange() {
      this.navStatus = !this.navStatus; // 切換布林
    },
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('updateData', () => {
      this.getCarts();
    });
  },
  created() {
    this.getCarts();
  },
  // 監聽$route解決nav收闔問題
  // 參考 https://ithelp.ithome.com.tw/m/articles/10284730
  watch: {
    $route() {
      if (document.body.offsetWidth < 992) {
        if (this.navStatus === true) {
          this.$refs.navbarBtn.click();
        }
      }
    },
  },
};
</script>

<style>
.badge_txt {
  font-size: 8px;
}
.nav-spacing {
  padding-bottom: 65px;
}
.router-link-exact-active {
  color: #5fd0c3 !important;
}
</style>
