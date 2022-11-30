<template>
  <LoadingPlugin :active="isLoading" />
  <ProgressBar />
  <div class="container">
    <div class="row justify-content-center my-5">
      <form class="col-md-10 col-lg-6" @submit.prevent="checkout">
        <table class="table align-middle">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th class="text-end">小計</th>
            <th class="text-end">折扣後$</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }}</td>
              <td class="text-end">${{ currency(item.total) }}</td>
              <td class="text-end">
                <span class="mb-0 d-inline-block text-truncate text-myorange"
                  >${{ currency(item.final_total) }}</span
                >
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td colspan="2" class="text-end">
                <p class="text-myred mb-0">總計 ${{ currency(finalPrice) }}</p>
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
            <tr>
              <th>留言</th>
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
import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import ProgressBar from '@/components/frontend/ProgressBar.vue';

export default {
  inject: ['currency'],
  components: {
    ProgressBar,
  },
  setup() {
    const axios = inject('axios');
    const router = useRouter();
    const route = useRoute();
    const order = ref({ user: {} });
    // const order = ref({});
    const orderId = ref('');
    const finalPrice = ref(0);
    const isLoading = ref(false);

    orderId.value = route.params.orderId;

    const getOrder = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId.value}`;
      isLoading.value = true;
      axios.get(api)
        .then((res) => {
          order.value = res.data.order;
          finalPrice.value = Math.round(res.data.order.total);
          isLoading.value = false;
        })
        .catch(() => {
          isLoading.value = false;
          Swal.fire({
            title: '似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    };
    getOrder();

    const checkout = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${orderId.value}`;
      axios.post(api)
        .then(() => {
          getOrder();
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
      order,
      orderId,
      finalPrice,
      isLoading,
      getOrder,
      checkout,
    };
  },

};
</script>

<style scoped>
.remind {
  font-size: 12px;
}
</style>
