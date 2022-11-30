<template>
  <LoadingPlugin :active="isLoading" />
  <ProgressBar />
  <div class="container mt-5">
    <div class="col-12 col-md-10 mx-auto">
      <table class="table align-middle">
        <thead>
          <tr>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col">合計</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carts" :key="item.id">
            <td class=" text-nowrap small-font ps-1 pe-0">{{ item.product.title }}</td>
            <td>
              <div class="d-flex col-12 col-md-6 col-lg-3">
                <button
                  class="btn btn-sm btn-secondary rounded-0"
                  type="button"
                  @click="updateCart(item.id, item.qty + 1)"
                >
                  <i class="bi bi-plus" />
                </button>
                <input
                  type="number"
                  class="form-control rounded-0 px-1 text-center bg-white"
                  min="1"
                  id="qty"
                  v-model="item.qty"
                  aria-label="qty"
                  disabled
                />
                <button
                  class="btn btn-sm btn-secondary rounded-0"
                  type="button"
                  @click="updateCart(item.id, item.qty - 1)"
                  :disabled="item.qty === 1"
                >
                  <i class="bi bi-dash" />
                </button>
              </div>
            </td>
            <td class="small-font">${{ currency(item.total) }}</td>
            <td>
              <button type="button" class="btn btn-danger btn" @click="deleteCart(item.id)">
                <i class="bi bi-trash" />
              </button>
            </td>
          </tr>
          <tr>
            <td class="border-0" />
          </tr>
          <tr>
            <td colspan="4">
              <div class="col-md-8 col-lg-4">
                <div class="input-group mb-3">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="useCouponCode"
                    :disabled="discount > 0"
                  >
                    套用優惠碼
                  </button>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入優惠碼"
                    aria-label="coupon"
                    aria-describedby="button-coupon"
                    v-model="couponCode"
                  />
                </div>
                <p class="text-myorange text-center" v-if="couponStatus === true">
                  優惠碼套用成功!
                </p>
                <p class="text-myred text-center" v-else-if="couponStatus === false">
                  優惠碼無效 請重新輸入!
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <p class="text-mygreen text-end px-5">合計 ${{ currency(totalPrice) }}</p>
              <p class="text-myorange text-end px-5">
                優惠券折扣 ${{ currency(Math.round(discount)) }}
              </p>
              <p class="text-myred text-end px-5">總計 ${{ currency(Math.round(finalPrice)) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center p-5">
        <button type="button" class="btn btn-danger"
        @click="$router.push('/buyer_info')">
          下一步
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/front/ProgressBar.vue';

export default {
  components: {
    ProgressBar,
  },
  data() {
    return {
      carts: [],
      totalPrice: 0,
      finalPrice: 0,
      discount: 0,
      couponCode: '',
      couponStatus: '',
      isLoading: false,
    };
  },
  inject: ['emitter', 'currency'],
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.totalPrice = res.data.data.total;
          this.finalPrice = res.data.data.final_total;
          this.discount = this.totalPrice - this.finalPrice;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal({
            title: '似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
          this.$router.push('/');
        });
    },
    updateCart(id, num) {
      const cart = { data: { product_id: id, qty: num } };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios
        .put(api, cart)
        .then(() => {
          this.getCarts();
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios
        .delete(api)
        .then(() => {
          this.getCarts();
          this.emitter.emit('updateData');
        })
        .catch(() => {
          this.$swal({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },
    useCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.axios
        .post(api, { data: { code: this.couponCode } })
        .then((res) => {
          this.getCarts();
          if (res.data.success) {
            this.couponStatus = true;
          } else {
            this.couponStatus = false;
          }
        })
        .catch(() => {
          this.$swal({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },
  },
  created() {
    this.getCarts();
  },
  mounted() {
    this.emitter.on('updateData', () => {
      this.getCarts();
    });
  },
};
</script>

<style scoped>
@media (max-width: 575.98px) {
  .small-font {
    font-size: 14px;
  }
}
</style>
