<template>
  <LoadingPlugin v-model:active="isLoading"></LoadingPlugin>
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
                @click="openProductModal(false, item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-danger text-white"
                @click="openDeleteModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- components-- -->

  <!-- 新增/編輯 modal -->
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <!-- 刪除modal-- -->
  <DeleteProductModal
    ref="deleteProductModal"
    :product="tempProduct"
    @delete-item="deleteProduct"
  ></DeleteProductModal>
  <!-- 分頁------ -->
  <div class="container">
    <Pagination
      :pages="pagination"
      @page-num="getProducts"
      @pre-page="getProducts"
      @next-page="getProducts"
    ></Pagination>
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
      pagination: {}, // 分頁
      tempProduct: {},
      isNew: false, // 用於判斷是新增還是編輯
      isLoading: false, // 讀取效果插件
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.isLoading = false;
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      });
    },
    // 開啟新增/編輯modal
    openProductModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        // this.tempProduct = item;
        // 上面這樣寫會有bug↑，如果開啟編輯modal並改欄位的值，
        // 按取消關閉modal後更改的值會套用，需重新整理才會消失。
        // 用下面淺層拷貝寫法才不會有這個問題
        this.tempProduct = { ...item };
      }
      this.$refs.productModal.showModal();
      this.isNew = isNew;
    },
    updateProduct(item) {
      // this.tempProduct = item; // 這行刪掉應該沒影響
      // 新增
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
        this.axios.post(api, { data: item }).then((res) => {
          this.$refs.productModal.hideModal();
          if (res.data.success) {
            this.getProducts();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '新增成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '新增失敗',
              content: res.data.message.join('、'),
            });
          }
        });
        // 編輯
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        this.axios.put(api, { data: item }).then((res) => {
          this.$refs.productModal.hideModal();
          if (res.data.success) {
            this.getProducts();
            this.emitter.emit('push-message', {
              style: 'mygreen',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'myred',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        });
      }
    },
    // 開啟刪除modal
    openDeleteModal(item) {
      this.$refs.deleteProductModal.showModal();
      this.tempProduct = item;
    },
    // 刪除api
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
