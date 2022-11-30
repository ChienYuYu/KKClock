<template>
  <LoadingPlugin :active="isLoading" />
  <div
    ref="cOffcanvas"
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasWithBackdrop"
    aria-labelledby="offcanvasWithBackdropLabel"
    data-bs-backdrop="true"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">購物車</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div v-if="carts.length === 0" class="position-relative h-100">
      <button
        type="button"
        class="btn btn-myorange text-white rounded-0 w-100"
        @click="goProductPage"
      >
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
                  @click="updateCart(item, item.qty + 1)"
                >
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
                  disabled
                />
                <button
                  class="btn btn-sm btn-secondary rounded-0"
                  type="button"
                  @click="updateCart(item, item.qty - 1)"
                  :disabled="item.qty === 1"
                >
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
      <button type="button" class="btn btn-mybrown text-white w-100" @click="cartOffcanvas.hide()">
        繼續購物
      </button>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import currency from '@/methods/currency';
import Swal from 'sweetalert2';
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Offcanvas from 'bootstrap/js/dist/offcanvas';

export default {
  setup() {
    const axios = inject('axios');
    const router = useRouter();
    const cartOffcanvas = ref({});
    const carts = ref([]);
    const totalPrice = ref(0);
    const qty = ref(1);
    const isLoading = ref(false);
    const cOffcanvas = ref(null);

    const getCarts = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      axios.get(api)
        .then((res) => {
          carts.value = res.data.data.carts;
          totalPrice.value = res.data.data.total;
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
    getCarts(); // 原 created

    onMounted(() => {
      cartOffcanvas.value = new Offcanvas(cOffcanvas.value);
    });

    const showOffcanvas = () => {
      cartOffcanvas.value.show();
      getCarts();
    };

    const updateCart = (item, num) => {
      const cart = { data: { product_id: item.id, qty: num } };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      isLoading.value = true;
      axios.put(api, cart)
        .then(() => {
          emitter.emit('updateData');
          isLoading.value = false;
          getCarts();
        })
        .catch(() => {
          isLoading.value = false;
          Swal.fire({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    };

    // 刪除品項
    const deleteCart = (id) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      axios.delete(api)
        .then(() => {
          getCarts();
          emitter.emit('updateData');
        })
        .catch(() => {
          Swal.fire({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    };

    // 清空購物車
    const clearCart = () => {
      Swal.fire({
        title: '確認清空購物車?',
        text: '所有已加入購物車商品都將移除',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ec4079',
        cancelButtonColor: '#bbb',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
      })
        .then((result) => {
          if (result.isConfirmed) {
            const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
            axios.delete(api)
              .then(() => {
                emitter.emit('updateData');
                getCarts();
                Swal.fire({
                  icon: 'success',
                  title: '購物車已清空!',
                  showConfirmButton: false,
                  timer: 1500,
                });
                cartOffcanvas.value.hide();
              })
              .catch(() => {
                Swal.fire({
                  title: '似乎有些問題 請稍後再嘗試',
                  icon: 'error',
                  showConfirmButton: false,
                  timer: 2000,
                });
              });
          }
        });
    };

    const goCartPage = () => {
      router.push('/cart');
      cartOffcanvas.value.hide();
    };

    const goProductPage = () => {
      router.push('/product_list/全部商品');
      cartOffcanvas.value.hide();
    };

    return {
      cartOffcanvas,
      carts,
      totalPrice,
      qty,
      isLoading,
      getCarts,
      showOffcanvas,
      updateCart,
      deleteCart,
      clearCart,
      goCartPage,
      goProductPage,
      cOffcanvas,
      currency, // @/methods/currency
    };
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
.fs-14 {
  font-size: 14px;
}
</style>
