<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm fixed-top">
    <div class="container">
      <h1 class="m-0">
        <router-link to="/" class="navbar-brand p-0 d-block">
          <img src="../../assets/img/fakeLogo05.png" alt="logo" height="40" />
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
              :class="{ 'item-active': navItem === '首頁' }"
            >
              首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/product_list/全部商品"
              class="nav-link"
              :class="{ 'item-active': navItem === '購物' }"
            >
              購物</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/order_search"
              class="nav-link"
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
import {
  ref, inject, onMounted, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import emitter from '@/methods/emitter';
import CartOffcanvas from './CartOffcanvas.vue';

export default {
  components: {
    CartOffcanvas,
  },
  setup() {
    const route = useRoute();
    const axios = inject('axios');
    const cartQty = ref('');
    const navStatus = ref(false);
    const navItem = ref('');
    const navbarBtn = ref(null);
    const cartOffcanvas = ref(null);

    const getCarts = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      axios.get(api)
        .then((res) => {
          cartQty.value = res.data.data.carts.length;
        })
        .catch(() => {
          Swal.fire({
            title: '網頁似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    };
    const checkUrl = () => {
      if (route.path === '/') {
        navItem.value = '首頁';
      }
      if (route.path === '/order_search') {
        navItem.value = '訂單查詢';
      }
      if ((route.path !== '/') && (route.path !== '/order_search')) {
        navItem.value = '購物';
      }
    };
    getCarts();
    checkUrl();
    onMounted(() => {
      emitter.on('updateData', () => { // mitt 監聽(接收)
        getCarts();
      });
    });

    const openOffcanvas = () => {
      cartOffcanvas.value.showOffcanvas();
    };
    const navStatusChange = () => {
      navStatus.value = !navStatus.value;
    };

    watch(route, () => {
      if (document.body.offsetWidth < 992) {
        if (navStatus.value === true) {
          navbarBtn.value.click();
        }
      }
      // ↓避免沒有從navbar進入 active效果沒切換
      checkUrl();
    });

    return {
      cartQty,
      navStatus,
      navItem,
      navbarBtn,
      cartOffcanvas,
      openOffcanvas,
      getCarts,
      checkUrl,
      navStatusChange,
    };
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
