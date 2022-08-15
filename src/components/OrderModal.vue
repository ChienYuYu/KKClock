<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">訂單資料</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="text-info">用戶資料</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="row">地址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                </tbody>
              </table>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="text-info">訂單細節</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">訂單編號</th>
                    <td>{{ order.id }}</td>
                  </tr>
                  <tr>
                    <th scope="row">下單時間</th>
                    <td>{{ new Date(order.create_at*1000).toLocaleDateString() }}</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>
                      <span class="text-success" v-if="order.is_paid">已付款</span>
                      <span class="text-danger" v-else>尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">付款時間</th>
                    <td>
                      <span v-if="order.paid_date" >
                        {{ new Date(order.paid_date*1000).toLocaleDateString() }}
                      </span>
                      <span v-else>尚未付款</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-6">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="text-info">選購商品</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <th scope="row">{{ item.product.title }}</th>
                    <td>數量:{{ item.qty }}</td>
                    <td>價格:NT${{ currency(item.final_total) }}</td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-end pe-4">
                      <p class="mb-0 text-myred">總計 ${{ currency(Math.round(order.total)) }}</p>
                      <span class="text-muted remind">(小數點四捨五入)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  inject: ['currency'],
  props: ['order'],
  data() {
    return {
      modal: {},
    };
  },
  mixins: [modalMixin],
};
</script>
