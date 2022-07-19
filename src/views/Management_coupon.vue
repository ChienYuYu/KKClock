<template>
 <div class="container">
  <div class="my-4 d-flex justify-content-between">
    <h2>優惠券管理</h2>
    <button type="button" class="btn btn-dark text-warning"
    @click="$refs.couponModal.showModal()">
    <i class="bi bi-bag-plus-fill me-2"></i>新增優惠券&ensp;</button>
  </div>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">名稱</th>
      <th scope="col">優惠碼</th>
      <th scope="col">折扣百分比</th>
      <th scope="col">到期日</th>
      <th scope="col">是否啟用</th>
      <th scope="col">編輯/刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">三折券</td>
      <td>333sttp09</td>
      <td>30</td>
      <td>2022/8/1</td>
      <td>
        <span class="text-success">啟用</span>
        <!-- <span>未啟用</span> -->
      </td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary text-white">編輯</button>
          <button type="button" class="btn btn-danger text-white"
          @click="$refs.deleteCouponModal.showModal()">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
 </div>

 <CouponModal ref="couponModal"></CouponModal>
 <DeleteCouponModal ref="deleteCouponModal"></DeleteCouponModal>

</template>

<script>
import CouponModal from '../components/CouponModal.vue';
import DeleteCouponModal from '../components/DeleteCouponModal.vue';

export default {
  components: {
    CouponModal,
    DeleteCouponModal,
  },
};
</script>
