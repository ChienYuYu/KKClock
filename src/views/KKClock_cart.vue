<template>
<LoadingPlugin :active="isLoading"></LoadingPlugin>
<div class="container">
  <div class="col-12 col-md-10 mx-auto">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">品名</th>
          <th scope="col">數量</th>
          <th scope="col">合計</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in carts" :key="item.id">
          <td>{{item.product.title}}</td>
          <td>
            <!-- <div class="col-md-3 col-lg-4">
              <div class="input-group input-group-sm mb-3">
                <input type="number" class="form-control" aria-label="qty" min="1">
              </div>
            </div> -->
            <div class="d-flex col-10 col-md-6 col-lg-3">
                  <button class="btn btn-sm btn-secondary rounded-0" type="button"
                  @click="updateCart(item.id, item.qty + 1)">
                    <i class="bi bi-plus"></i>
                  </button>
                    <input type="number" class="form-control rounded-0 px-0 text-center bg-white"
                      min="1" id="qty" v-model="item.qty" aria-label="qty"
                      disabled>
                  <button class="btn btn-sm btn-secondary rounded-0" type="button"
                  @click="updateCart(item.id, item.qty - 1)"
                  :disabled="item.qty === 1">
                    <i class="bi bi-dash"></i>
                  </button>
                </div>
          </td>
          <td>${{(item.total)}}</td>
           <td>
            <!-- 刪除 -->
            <button type="button" class="btn btn-danger btn-sm"
            @click="deleteCart(item.id)">
            <i class="bi bi-trash"></i> </button>
          </td>
        </tr>
        <tr>
          <td class="border-0" colspan="">
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="col-md-8 col-lg-4">
              <div class="input-group mb-3">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  @click="useCouponCode">
                  套用優惠碼
                </button>

                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入優惠碼"
                  aria-label="coupon"
                  aria-describedby="button-coupon"
                  v-model="couponCode">
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <p class="text-mygreen text-end px-5">合計 ${{totalPrice}}</p>
            <p class="text-myorange text-end px-5">
              優惠券折扣 ${{Math.round(totalPrice - finalPrice)}}</p>
            <p class="text-myred text-end px-5">
              總計 ${{Math.round(finalPrice)}}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="col-12 col-md-10 col-lg-6 mx-auto border p-4 my-5">
      <form @submit="createOrder">
        <h2 class="mb-3">請填寫訂購資料 <span class="ms-3 h6 text-danger">*必填</span></h2>
        <div class="mb-3">
          <label for="email" class="form-label w-100">Email*
            <input
            type="email"
            class="form-control mt-2"
            id="email"
            aria-describedby="emailHelp"
            placeholder="請輸入Email"
            v-model="form.user.email">
          </label>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label w-100">收件人姓名*
            <input
            type="text"
            class="form-control mt-2"
            id="name"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人姓名"
            v-model="form.user.name">
          </label>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label w-100">收件人電話*
            <input
            type="tel"
            class="form-control mt-2"
            id="phone"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人電話"
            v-model="form.user.tel">
          </label>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label w-100">收件人地址*
            <input
            type="text"
            class="form-control mt-2"
            id="address"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人地址"
            v-model="form.user.address">
          </label>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label w-100">
            留言
             <textarea
            name=""
            id="message"
            class="form-control mt-2"
            v-model="form.message"
          ></textarea>
          </label>
        </div>

        <button type="submit" class="btn btn-danger">送出訂單 & 付款去</button>
      </form>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      totalPrice: 0,
      finalPrice: 0,
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      orderId: '',
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        console.log('getCarts()', res);
        this.isLoading = false;
        this.carts = res.data.data.carts;
        this.totalPrice = res.data.data.total;
        this.finalPrice = res.data.data.final_total;
      });
    },
    updateCart(id, num) {
      const cart = { data: { product_id: id, qty: num } };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.put(api, cart).then((res) => {
        console.log('updateCart(item, num)', res);
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
    useCouponCode() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.axios.post(api, { data: { code: this.couponCode } }).then((res) => {
        console.log('useCouponCode', res);
        this.getCarts();
      });
    },
    createOrder() {
      console.log(this.form);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.axios.post(api, { data: order }).then((res) => {
        console.log('createOrder', res);
        this.emitter.emit('updateData');
        this.orderId = res.data.orderId;
        this.$router.push(`checkout/${this.orderId}`);
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
