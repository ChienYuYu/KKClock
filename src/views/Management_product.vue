<template>
 <div class="container">
  <div class="my-4 d-flex justify-content-between">
    <h2>產品管理</h2>
    <button type="button" class="btn btn-dark text-warning"
    @click="$refs.productModal.showModal()">
    <i class="bi bi-bag-plus-fill me-2"></i>新增產品&ensp;</button>
  </div>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">類別</th>
      <th scope="col">名稱</th>
      <th scope="col">原價</th>
      <th scope="col">售價</th>
      <th scope="col">是否啟用</th>
      <th scope="col">編輯/刪除</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>撞色系</td>
      <td>金童鐘</td>
      <td>399</td>
      <td>349</td>
      <td>
        <span>啟用</span>
        <!-- <span>未啟用</span> -->
      </td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-primary text-white">編輯</button>
          <button type="button" class="btn btn-danger text-white"
          @click="$refs.deleteProductModal.showModal()">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
 </div>

 <ProductModal ref="productModal"></ProductModal>
 <DeleteProductModal ref="deleteProductModal"></DeleteProductModal>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import DeleteProductModal from '../components/DeleteProductModal.vue';

export default {
  components: {
    ProductModal,
    DeleteProductModal,
  },
};
</script>
