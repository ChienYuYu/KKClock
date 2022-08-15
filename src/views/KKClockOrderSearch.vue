<template>
  <LoadingPlugin :active="isLoading" />
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-5">
        <label for="order_search" class="form-label d-block text-center h4 mb-4">訂單查詢</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="order_search"
            aria-describedby="inputGroupPrepend2"
            required
            v-model="orderId"
          />
          <button type="button" class="btn btn-mygreen text-white" @click="searchOrder">
            查詢
          </button>
        </div>
        <p
          class="text-myred text-center mb-0 mt-2 py-2"
          :class="{ 'd-none': this.tempOrderId !== 'error' }"
        >
          訂單編號輸入錯誤，請確認是否輸入正確!
        </p>
      </div>
    </div>
    <div v-if="this.orderId !== this.tempOrderId" class="text-center">
      <h2 class="text-mygreen py-4">請輸入訂單編號</h2>
      <p class="text-secondary">( 20碼數字+符號+英文大小寫 )</p>
      <p class="text-secondary">範例: -N8RgQpyakFeuOluP-o-</p>
    </div>
    <div class="row justify-content-center my-5" v-else>
      <form class="col-md-10 col-lg-6" @submit.prevent="checkout">
        <table class="table align-middle">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th class="text-end">小計</th>
            <th class="text-end">優惠價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }}</td>
              <td class="text-end">${{ currency(item.total) }}</td>
              <td class="text-end">
                <span class="mb-0 d-inline-block text-truncate text-myorange"
                  >${{ currency(item.final_total) }}
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td colspan="2" class="text-end">
                <p class="text-myred mb-0">總計 ${{ currency(Math.round(order.total)) }}</p>
                <span class="text-muted remind">(小數點四捨五入)</span>
              </td>
            </tr>
          </tfoot>
        </table>
        <table class="table">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span class="text-success" v-if="order.is_paid">付款完成</span>
                <span class="v-else text-myred" v-else>尚未付款</span>
              </td>
            </tr>
            <tr>
              <th>訂單編號</th>
              <td>{{ orderId }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-end">
          <input type="button" value="付款已完成" class="btn btn-secondary disabled"
          v-if="order.is_paid">
          <input type="submit" value="付款" class="btn btn-danger" v-else>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['currency'],
  data() {
    return {
      tempOrderId: 'xyz',
      orderId: '',
      order: {
        user: {},
      },
      isLoading: false,
    };
  },
  methods: {
    searchOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.axios.get(api).then((res) => {
        if (res.data.order !== null) {
          this.order = res.data.order;
          this.tempOrderId = res.data.order.id;
        } else {
          this.tempOrderId = 'error';
        }
        this.isLoading = false;
      });
    },
    checkout() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.axios.post(api).then(() => {
        this.searchOrder();
      });
    },
  },
  beforeCreate() {
    document.title = this.$route.meta.title;
  },
};
</script>
<style scoped>
.remind {
  font-size: 12px;
}
</style>
