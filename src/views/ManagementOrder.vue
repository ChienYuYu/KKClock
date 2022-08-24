<template>
  <LoadingPlugin :active="isLoading" />
  <div class="container">
    <div class="my-4 d-flex justify-content-between">
      <h2>訂單管理</h2>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">姓名 / Email</th>
          <th scope="col">購買項目</th>
          <th scope="col">應付金額</th>
          <th scope="col">付款</th>
          <th scope="col">檢視/刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ new Date(item.create_at * 1000).toLocaleDateString() }}</td>
          <td>{{ item.user.name }} / {{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="purchaseItem in item.products" :key="purchaseItem.id">
                {{ purchaseItem.product.title }}
              </li>
            </ul>
          </td>
          <td>{{ currency(Math.round(item.total)) }}</td>
          <td>
            <div class="form-check form-switch">
              <label class="form-check-label" for="flexSwitchCheckDefault">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-primary text-white"
                @click="openOrderModal(item)"
              >
                檢視
              </button>
              <button type="button" class="btn btn-danger text-white" @click="openDelModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <OrderModal ref="orderModal" :order="tempOrder" />
  <DeleteOrderModal ref="delOrderModal" @delete-order="deleteOrder" :order="tempOrder" />
  <Pagination
    :pages="pagination"
    @pre-page="getOrders"
    @page-num="getOrders"
    @next-page="getOrders"
  />
</template>

<script>
import OrderModal from '../components/OrderModal.vue';
import DeleteOrderModal from '../components/DeleteOrderModal.vue';
import Pagination from '../components/PaginationView.vue';

export default {
  components: {
    OrderModal,
    DeleteOrderModal,
    Pagination,
  },
  inject: ['currency', 'emitter'],
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {
        user: {},
      },
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
          this.$swal({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
          this.isLoading = false;
        });
    },
    updatePaid(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.isLoading = true;
      this.axios
        .put(api, { data: item })
        .then(() => {
          this.emitter.emit('push-message', {
            style: 'mygreen',
            title: '付款狀態已更改',
          });
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.$swal({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
        });
    },
    openOrderModal(item) {
      this.$refs.orderModal.showModal();
      this.tempOrder = { ...item };
    },
    openDelModal(item) {
      this.$refs.delOrderModal.showModal();
      this.tempOrder = { ...item };
    },
    deleteOrder(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.axios
        .delete(api)
        .then(() => {
          this.$refs.delOrderModal.hideModal();
          this.getOrders();
          this.emitter.emit('push-message', {
            style: 'mygreen',
            title: '刪除成功',
          });
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
    this.getOrders();
  },
};
</script>
