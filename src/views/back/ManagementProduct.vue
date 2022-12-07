<template>
  <LoadingPlugin v-model:active="isLoading" />
  <div class="container">
    <div class="my-4 d-flex justify-content-between">
      <h2>產品管理</h2>
      <button type="button" class="btn btn-dark text-warning" @click="openProductModal(true)">
        <i class="bi bi-bag-plus-fill me-2" />新增產品&ensp;
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

  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
  <DeleteProductModal
    ref="deleteProductModal"
    :product="tempProduct"
    @delete-item="deleteProduct"
  />
  <div class="container">
    <Pagination
      :pages="pagination"
      @page-num="getProducts"
      @pre-page="getProducts"
      @next-page="getProducts"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import emitter from '@/methods/emitter';
import ProductModal from '@/components/back/ProductModal.vue';
import DeleteProductModal from '@/components/back/DeleteProductModal.vue';
import Pagination from '@/components/back/PaginationView.vue';

export default {
  inject: ['currency', 'emitter'],
  components: {
    ProductModal,
    DeleteProductModal,
    Pagination,
  },
  setup() {
    const products = ref([]);
    const pagination = ref({});
    const tempProduct = ref({});
    const isNew = ref(false);
    const isLoading = ref(false);
    const productModal = ref(null);
    const deleteProductModal = ref(null);

    const getProducts = (page = 1) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      isLoading.value = true;
      axios.get(api)
        .then((res) => {
          products.value = res.data.products;
          pagination.value = res.data.pagination;
          isLoading.value = false;
        })
        .catch(() => {
          Swal.fire({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
          isLoading.value = false;
        });
    };

    getProducts(); // created執行

    const openProductModal = (newTF, item) => {
      if (newTF) {
        tempProduct.value = {};
      } else {
        tempProduct.value = { ...item };
      }
      productModal.value.showModal();
      isNew.value = newTF;
    };

    const updateProduct = (item) => {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (isNew.value === false) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      axios[httpMethod](api, { data: item }).then((res) => {
        productModal.value.hideModal();
        if (res.data.success) {
          getProducts();
          emitter.emit('push-message', {
            style: 'mygreen',
            title: isNew.value ? '新增成功' : '更新成功',
          });
        } else {
          emitter.emit('push-message', {
            style: 'myred',
            title: isNew.value ? '新增失敗' : '更新失敗',
            content: res.data.message.join('、'),
          });
        }
      }).catch(() => {
        Swal.fire({
          title: '似乎有些問題 請稍後再嘗試',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      });
    };

    const openDeleteModal = (item) => {
      deleteProductModal.value.showModal();
      tempProduct.value = item;
    };

    const deleteProduct = (item) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
      axios.delete(api).then(() => {
        deleteProductModal.value.hideModal();
        getProducts();
        emitter.emit('push-message', {
          style: 'mygreen',
          title: '刪除成功',
        });
      }).catch(() => {
        Swal.fire({
          title: '似乎有些問題 請稍後再嘗試',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      });
    };

    return {
      products,
      pagination,
      tempProduct,
      isNew, // 用於判斷是新增還是編輯
      isLoading,
      productModal,
      deleteProductModal,
      getProducts,
      openProductModal,
      updateProduct,
      openDeleteModal,
      deleteProduct,
    };
  },
};
</script>
