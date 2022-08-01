<template>
<LoadingPlugin :active="isLoading"></LoadingPlugin>
<div class="container mt-5">
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
          <td>${{currency(item.total)}}</td>
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
            <p class="text-mygreen text-end px-5">合計 ${{currency(totalPrice)}}</p>
            <p class="text-myorange text-end px-5">
              優惠券折扣 ${{currency(Math.round(totalPrice - finalPrice))}}</p>
            <p class="text-myred text-end px-5">
              總計 ${{currency(Math.round(finalPrice))}}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="col-12 col-md-10 col-lg-6 mx-auto border p-4 my-5">

      <Form @submit="createOrder" v-slot="{ errors }">
        <h2 class="mb-3">請填寫訂購資料 <span class="ms-3 h6 text-danger">*必填</span></h2>
        <div class="mb-3">
          <label for="email" name="email" class="form-label w-100">Email*
            <Field
            :rules="validateEmail"
             :class="{ 'is-invalid': errors['email'] }"
            type="email"
            class="form-control mt-2"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="請輸入Email"
            v-model="form.user.email">
            </Field>
            <ErrorMessage name="email" class="text-danger" />
          </label>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label w-100">收件人姓名*
            <Field
            :rules="validateName"
            :class="{ 'is-invalid': errors['name'] }"
            type="text"
            class="form-control mt-2"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人姓名"
            v-model="form.user.name">
            </Field>
            <ErrorMessage name="name" class="text-danger" />
          </label>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label w-100">收件人電話*
            <Field
            :rules="validateTel"
            :class="{ 'is-invalid': errors['phone'] }"
            type="tel"
            class="form-control mt-2"
            id="phone"
            name="phone"
            aria-describedby="emailHelp"
            placeholder="請輸入手機ex 0912345678"
            v-model="form.user.tel">
            </Field>
            <ErrorMessage name="phone" class="text-danger" />
          </label>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label w-100">收件人地址*
            <Field
            :rules="validateAddress"
             :class="{ 'is-invalid': errors['address'] }"
            type="text"
            class="form-control mt-2"
            id="address"
            name="address"
            aria-describedby="emailHelp"
            placeholder="請輸入收件人地址"
            v-model="form.user.address">
            </Field>
            <ErrorMessage name="address" class="text-danger" />
          </label>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label w-100">
            留言
             <Field
            name="message"
            id="message"
            class="form-control mt-2"
            v-model="form.message"
          ></Field>
          </label>
        </div>

        <button type="submit" class="btn btn-danger">送出訂單 & 付款去</button>
      </Form>
    </div>
</div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
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
  inject: ['emitter', 'currency'],
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
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.axios.post(api, { data: order }).then((res) => {
        if (res.data.success) {
          console.log('createOrder', res);
          this.emitter.emit('updateData');
          this.orderId = res.data.orderId;
          this.$router.push(`checkout/${this.orderId}`);
        }
      });
    },
    // 表單驗證規則----------------
    validateEmail(value) {
      if (!value) {
        return '這是必填欄位';
      }

      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return '此字段必須是有效的電子郵件';
      }
      return true;
    },
    validateName(value) {
      if (!value) {
        return '這是必填欄位';
      }
      return true;
    },
    validateTel(value) {
      if (!value) {
        return '這是必填欄位';
      }
      const phoneNumber = /^(09)[0-9]{8}$/;
      if (!phoneNumber.test(value)) {
        return '需要正確的手機號碼格式';
      }
      return true;
    },
    validateAddress(value) {
      if (!value) {
        return '這是必填欄位';
      }
      return true;
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
