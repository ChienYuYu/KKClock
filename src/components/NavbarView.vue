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
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav" ref="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              @click.prevent="getNavItem('首頁')"
              :class="{ 'item-active': navItem === '首頁' }"
            >
              首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/product_list/全部商品"
              class="nav-link"
              @click.prevent="getNavItem('購物')"
              :class="{ 'item-active': navItem === '購物' }"
            >
              購物</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/order_search"
              class="nav-link"
              @click.prevent="getNavItem('訂單查詢')"
              :class="{ 'item-active': navItem === '訂單查詢' }"
            >
              訂單查詢</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="openOffcanvas">
              購物車
              <i class="bi bi-cart-fill position-relative">
                <span
                  class="position-absolute top-0 start-100
                  translate-middle badge badge_txt rounded-circle bg-myorange"
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

  <CartOffcanvas ref="cartOffcanvas" />
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
      navItem: '',
    };
  },
  methods: {
    openOffcanvas() {
      this.$refs.cartOffcanvas.showOffcanvas();
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios
        .get(api)
        .then((res) => {
          this.cartQty = res.data.data.carts.length;
        })
        .catch(() => {
          this.$swal({
            title: '網頁似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },
    getNavItem(item) {
      this.navItem = item;
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
    // 避免active效果失效 watch也要寫
    if (this.$route.path === '/') {
      this.navItem = '首頁';
    }
    if (this.$route.path === '/order_search') {
      this.navItem = '訂單查詢';
    }
    if ((this.$route.path !== '/') && (this.$route.path !== '/order_search')) {
      this.navItem = '購物';
    }
  },
  watch: {
    $route() {
      // 監聽$route解決nav收闔問題
      // 參考 https://ithelp.ithome.com.tw/m/articles/10284730
      if (document.body.offsetWidth < 992) {
        if (this.navStatus === true) {
          this.$refs.navbarBtn.click();
        }
      }
      // 避免active效果失效
      if (this.$route.path === '/') {
        this.navItem = '首頁';
      }
      if (this.$route.path === '/order_search') {
        this.navItem = '訂單查詢';
      }
      if (this.$route.path !== '/' && this.$route.path !== '/order_search') {
        this.navItem = '購物';
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
.item-active {
  color: #CF4900 !important;
}
</style>
