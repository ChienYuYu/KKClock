<template>
  <LoadingPlugin v-model:active="isLoading"/>
  <div class="container">
    <div class="my-4 d-flex justify-content-between">
      <h2>產品管理</h2>
      <button type="button" class="btn btn-dark text-warning" @click="openProductModal(true)">
        <i class="bi bi-bag-plus-fill me-2"></i>新增產品&ensp;
      </button>
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
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ currency(item.origin_price) }}</td>
          <td>{{ currency(item.price) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                class="btn btn-primary text-white"
                @click="openProductModal(false, item)">
                編輯
              </button>
              <button
                type="button"
                class="btn btn-danger text-white"
                @click="openDeleteModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct">
  </ProductModal>
  <DeleteProductModal
    ref="deleteProductModal"
    :product="tempProduct"
    @delete-item="deleteProduct">
  </DeleteProductModal>
  <div class="container">
    <Pagination
      :pages="pagination"
      @page-num="getProducts"
      @pre-page="getProducts"
      @next-page="getProducts">
    </Pagination>
  </div>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import DeleteProductModal from '../components/DeleteProductModal.vue';
import Pagination from '../components/PaginationView.vue';

export default {
  inject: ['currency', 'emitter'],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false, // 用於判斷是新增還是編輯
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      });
    },
    // 開啟新增/編輯modal
    openProductModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.$refs.productModal.showModal();
      this.isNew = isNew;
    },
    updateProduct(item) {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (this.isNew === false) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.axios[httpMethod](api, { data: item }).then((res) => {
        this.$refs.productModal.hideModal();
        if (res.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'mygreen',
            title: (this.isNew ? '新增成功' : '更新成功'),
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'myred',
            title: (this.isNew ? '新增失敗' : '更新失敗'),
            content: res.data.message.join('、'),
          });
        }
      })
        .catch((res) => {
          console.log(res);
        });
    },
    openDeleteModal(item) {
      this.$refs.deleteProductModal.showModal();
      this.tempProduct = item;
    },
    deleteProduct(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      this.axios.delete(api).then(() => {
        this.$refs.deleteProductModal.hideModal();
        this.getProducts();
        this.emitter.emit('push-message', {
          style: 'mygreen',
          title: '刪除成功',
        });
      });
    },
  },
  components: {
    ProductModal,
    DeleteProductModal,
    Pagination,
  },
  created() {
    this.getProducts();
  },
};
</script>
