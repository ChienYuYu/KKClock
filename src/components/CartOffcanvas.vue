<template>
<LoadingPlugin :active="isLoading"></LoadingPlugin>
 <div ref="cartOffcanvas" class="offcanvas offcanvas-start"
     tabindex="-1" id="offcanvasWithBackdrop"
      aria-labelledby="offcanvasWithBackdropLabel"
      data-bs-backdrop="true">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">購物車</h5>
        <button type="button" class="btn-close text-reset"
        data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <!-- -------- -->
      <div v-if="this.carts.length === 0" class="position-relative h-100">
       <div class="position-absolute top-50 start-50 translate-middle">
        <p class="text-center h3 text-dark">購物車空空的</p>
       </div>
       <img src="@/assets/img/nullcart.jpg" class="w-100 h-100 opacity-25" alt="">
      </div>
      <!-- -------- -->
      <div class="offcanvas-body" v-else>
        <table class="table">
          <thead>
            <tr class="text-nowrap">
              <th scope="col"></th>
              <th scope="col">品名</th>
              <th scope="col">數量</th>
              <th scope="col">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carts" :key="item.id">
              <th scope="row">
                <!-- 刪除 -->
                <button type="button" class="btn btn-danger btn-sm"
                @click="deleteCart(item.id)">
                <i class="bi bi-trash"></i> </button>
              </th>
              <td class="text-nowrap">{{item.product.title}}</td>
              <td>
                <div class="d-flex">
                  <button class="btn btn-sm btn-secondary rounded-0" type="button"
                  @click="updateCart(item, item.qty + 1)">
                    <!-- 增加 -->
                    <i class="bi bi-plus"></i>
                  </button>
                    <input type="number" class="form-control rounded-0 px-0 text-center bg-white"
                      min="1" id="qty" v-model="item.qty" aria-label="qty"
                      disabled>
                  <button class="btn btn-sm btn-secondary rounded-0" type="button"
                  @click="updateCart(item, item.qty - 1)"
                  :disabled="item.qty === 1">
                    <!-- 減少 -->
                    <i class="bi bi-dash"></i>
                  </button>
                </div>
              </td>
              <td>{{item.total}}</td>
            </tr>
          </tbody>
            <tr>
              <td colspan="2">
                <button class="btn btn-outline-danger btn-sm mt-2"
                @click="clearCart">清空購物車</button>
              </td>
              <td class="text-end">合計&ensp;</td>
              <td class="text-myred">NT${{totalPrice}}</td>
            </tr>
        </table>
        <button type="button" class="btn btn-myorange text-white w-100 mb-3"
        @click="goCartPage">前往結帳</button>
        <button type="button" class="btn btn-mybrown text-white w-100"
        @click="this.cartOffcanvas.hide()">繼續購物</button>
      </div>
    </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';

export default {
  data() {
    return {
      cartOffcanvas: {},
      carts: [],
      totalPrice: 0,
      qty: 1,
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    showOffcanvas() {
      this.cartOffcanvas.show();
      this.getCarts();
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        console.log('getCarts()', res);
        this.isLoading = false;
        this.carts = res.data.data.carts;
        this.totalPrice = res.data.data.total;
      });
    },
    updateCart(item, num) {
      console.log(item, num);
      const cart = { data: { product_id: item.id, qty: num } };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.axios.put(api, cart).then((res) => {
        console.log('updateCart(item, num)', res);
        this.emitter.emit('updateData');
        this.getCarts();
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.delete(api).then((res) => {
        console.log('deleteCart()', res);
        this.getCarts();
        this.emitter.emit('updateData');
      });
    },
    clearCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.axios.delete(api).then((res) => {
        console.log('clearCart()', res);
        this.getCarts();
        this.emitter.emit('updateData');
      });
    },
    goCartPage() {
      this.$router.push('/kkClock/cart');
      this.cartOffcanvas.hide();
    },
  },
  mounted() {
    this.cartOffcanvas = new Offcanvas(this.$refs.cartOffcanvas);
  },
  created() {
    this.getCarts();
  },
};
</script>

<style>
/* 消除input type=number箭頭 */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
