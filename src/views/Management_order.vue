<template>
  <div class="container">
  <div class="my-4 d-flex justify-content-between">
    <h2>訂單管理</h2>
  </div>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">購買時間</th>
      <th scope="col">Email</th>
      <th scope="col">購買項目</th>
      <th scope="col">應付金額</th>
      <th scope="col">是否付款</th>
      <th scope="col">檢視/刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2022/7/11</td>
      <td>333ddfs@fddd.com</td>
      <td>撞色系潮流鐘</td>
      <td>799</td>
      <td>
        <div class="form-check form-switch">
          <label class="form-check-label" for="flexSwitchCheckDefault">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked>
            <span>已付款</span>
            <!-- <span v-else>未付款</span> -->
            </label>
        </div>
      </td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary text-white"
          @click="$refs.orderModal.showModal()"
          >檢視</button>
          <button type="button" class="btn btn-danger text-white"
          @click="$refs.deleteOrderModal.showModal()">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
 </div>

 <OrderModal ref="orderModal"></OrderModal>
 <DeleteOrderModal ref="deleteOrderModal"></DeleteOrderModal>
</template>

<script>
import OrderModal from '../components/OrderModal.vue';
import DeleteOrderModal from '../components/DeleteOrderModal.vue';

export default {
  components: {
    OrderModal,
    DeleteOrderModal,
  },
};
</script>
