<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm fixed-top">
      <div class="container">
        <h1 class="m-0">
          <router-link to="/kkClock/home" class="navbar-brand p-0 d-block">
            <img src="../assets/img/fakeLogo05.png" alt="logo" height="40">
          </router-link>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/kkClock/home" class="nav-link">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/kkClock/product_list/全部商品" class="nav-link">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/kkClock/" class="nav-link">訂單查詢</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"
                @click.prevent="openOffcanvas()">
                購物車
                <i class="bi bi-cart-fill position-relative">
                  <span class="position-absolute top-0 start-100
                  translate-middle badge badge_txt rounded-circle bg-myorange">{{cartQty}}</span>
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
 <!-- -components-- -->
 <CartOffcanvas ref="cartOffcanvas"></CartOffcanvas>
 <!-- --------------------------- -->
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
    };
  },
  methods: {
    // 打開購物車
    openOffcanvas() {
      this.$refs.cartOffcanvas.showOffcanvas();
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(api).then((res) => {
        console.log('getCarts()', res);
        this.cartQty = res.data.data.carts.length;
      });
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
};
</script>

<style>
.badge_txt{
  font-size: 8px;
}
</style>
