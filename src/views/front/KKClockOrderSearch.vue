<template>
  <LoadingPlugin :active="isLoading" />
  <div class="container">
    <div class="row justify-content-center mt-5 pt-5">
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
          <button type="button" class="btn btn-myorange text-white" @click="searchOrder">
            查詢
          </button>
        </div>
        <p
          class="text-myred text-center mb-0 mt-2 py-2"
          :class="{ 'd-none': tempOrderId !== 'error' }"
        >
          訂單編號輸入錯誤，請確認是否輸入正確!
        </p>
      </div>
    </div>
    <div v-if="orderId !== tempOrderId" class="text-center">
      <h2 class="text-myorange py-4">請輸入訂單編號</h2>
      <p class="text-secondary">( 20碼數字+符號+英文大小寫 )</p>
      <p class="text-secondary">範例: -NANgXsFQqCED1tUrEIz</p>
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
              <td />
              <td />
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
              <th class="text-nowrap">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th class="text-nowrap">姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th class="text-nowrap">收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th class="text-nowrap">收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th class="text-nowrap">付款狀態</th>
              <td>
                <span class="text-success" v-if="order.is_paid">付款完成</span>
                <span class="v-else text-myred" v-else>尚未付款</span>
              </td>
            </tr>
            <tr>
              <th class="text-nowrap">訂單編號</th>
              <td>{{ orderId }}</td>
            </tr>
            <tr>
              <th class="text-nowrap">留言</th>
              <td>{{ order.message }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-end">
          <input
            type="button"
            value="付款已完成"
            class="btn btn-secondary disabled"
            v-if="order.is_paid"
          />
          <input type="submit" value="付款" class="btn btn-danger" v-else />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import currency from '@/methods/currency';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const axios = inject('axios');
    const tempOrderId = ref('xyz');
    const orderId = ref('');
    const order = ref({ user: {} });
    const isLoading = ref(false);
    const searchOrder = () => {
      if (orderId.value.trim() !== '') {
        isLoading.value = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId.value}`;
        axios.get(api)
          .then((res) => {
            if (res.data.order !== null) {
              order.value = res.data.order;
              tempOrderId.value = res.data.order.id;
            } else {
              tempOrderId.value = 'error';
            }
            isLoading.value = false;
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
      } else {
        tempOrderId.value = 'error';
      }
    };
    const checkout = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${orderId.value}`;
      axios.post(api)
        .then(() => {
          router.push(`/pay_completed/${orderId.value}`);
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
    return {
      tempOrderId, orderId, order, isLoading, searchOrder, checkout, currency,
    };
  },
};
</script>
<style scoped>
.remind {
  font-size: 12px;
}
</style>
