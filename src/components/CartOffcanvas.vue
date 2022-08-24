<template>
  <LoadingPlugin :active="isLoading"/>
  <div
    ref="cartOffcanvas"
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasWithBackdrop"
    aria-labelledby="offcanvasWithBackdropLabel"
    data-bs-backdrop="true">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">購物車</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close" />
    </div>
    <div v-if="carts.length === 0" class="position-relative h-100">
      <button
        type="button"
        class="btn btn-mygreen text-white rounded-0 w-100"
        @click="goProductPage">
        前往購物
        <i class="bi bi-caret-right-fill" />
        <i class="bi bi-caret-right-fill" />
      </button>
      <div class="position-absolute top-50 start-50 translate-middle">
        <p class="text-center h3 text-dark">購物車空空的</p>
      </div>
      <img src="@/assets/img/nullcart.jpg" class="w-100 h-100 opacity-25" alt="空購物車" />
    </div>
    <div class="offcanvas-body" v-else>
      <table class="table">
        <thead>
          <tr class="text-nowrap text-center">
            <th scope="col" />
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carts" :key="item.id">
            <th scope="row" class="px-0">
              <!-- 刪除 -->
              <button type="button" class="btn btn-danger btn-sm" @click="deleteCart(item.id)">
                <i class="bi bi-trash" />
              </button>
            </th>
            <td class="text-nowrap fs-14">{{ item.product.title }}</td>
            <td class="px-0">
              <div class="d-flex">
                <button
                  class="btn btn-sm btn-secondary rounded-0"
                  type="button"
                  @click="updateCart(item, item.qty + 1)">
                  <!-- 增加 -->
                  <i class="bi bi-plus" />
                </button>
                <input
                  type="number"
                  class="form-control rounded-0 bg-white text-center fs-14 px-1"
                  min="1"
                  id="qty"
                  v-model="item.qty"
                  aria-label="qty"
                  disabled/>
                <button
                  class="btn btn-sm btn-secondary rounded-0"
                  type="button"
                  @click="updateCart(item, item.qty - 1)"
                  :disabled="item.qty === 1">
                  <!-- 減少 -->
                  <i class="bi bi-dash" />
                </button>
              </div>
            </td>
            <td class="text-center fs-14 px-0">{{ currency(item.total) }}</td>
          </tr>
        </tbody>
        <tr>
          <td colspan="2">
            <button type="button" class="btn btn-outline-danger btn-sm mt-2" @click="clearCart">
              清空購物車
            </button>
          </td>
          <td class="text-end">合計&ensp;</td>
          <td class="text-myred">NT${{ currency(totalPrice) }}</td>
        </tr>
      </table>
      <button type="button" class="btn btn-myorange text-white w-100 mb-3" @click="goCartPage">
        前往結帳
      </button>
      <button
        type="button"
        class="btn btn-mybrown text-white w-100"
        @click="cartOffcanvas.hide()">
        繼續購物
      </button>
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
  inject: ['emitter', 'currency'],
  methods: {
    showOffcanvas() {
      this.cartOffcanvas.show();
      this.getCarts();
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(api).then((res) => {
        this.carts = res.data.data.carts;
        this.totalPrice = res.data.data.total;
      });
    },
    // 變更數量
    updateCart(item, num) {
      const cart = { data: { product_id: item.id, qty: num } };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      this.axios.put(api, cart).then(() => {
        this.emitter.emit('updateData');
        this.isLoading = false;
        this.getCarts();
      });
    },
    // 刪除品項
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.delete(api).then(() => {
        this.getCarts();
        this.emitter.emit('updateData');
      });
    },
    // 清空購物車
    clearCart() {
      this.$swal({
        title: '確認清空購物車?',
        text: '所有已加入購物車商品都將移除',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ec4079',
        cancelButtonColor: '#bbb',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
          this.axios.delete(api).then(() => {
            this.emitter.emit('updateData');
            this.getCarts();
            this.$swal({
              icon: 'success',
              title: '購物車已清空!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.cartOffcanvas.hide();
          });
        }
      });
    },
    goCartPage() {
      this.$router.push('/cart');
      this.cartOffcanvas.hide();
    },
    goProductPage() {
      this.$router.push('/product_list/全部商品');
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
input[type='number'] {
  -moz-appearance: textfield;
}
.fs-14{
  font-size: 14px;
}
</style>
