<template>
<LoadingPlugin v-model:active="isLoading"/>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">產品管理</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-8">
              <div class="row">
                <div class="col-12 mb-3">
                  <label for="productName" class="form-label w-100">
                    <p class="mb-2">產品名稱</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productName"
                      placeholder="請輸入產品名稱"
                      v-model="tempProduct.title">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="productCategory" class="form-label w-100">
                    <p class="mb-2">分類</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productCategory"
                      placeholder="請輸入分類名稱"
                      v-model="tempProduct.category">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="productUnit" class="form-label w-100">
                    <p class="mb-2">單位</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productUnit"
                      placeholder="請輸入單位名稱"
                      v-model="tempProduct.unit">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="originalPrice" class="form-label w-100">
                    <p class="mb-2">原價</p>
                    <input
                      type="number"
                      class="form-control"
                      id="originalPrice"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="productPrice" class="form-label w-100">
                    <p class="mb-2">售價</p>
                    <input
                      type="number"
                      class="form-control"
                      id="productPrice"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price">
                  </label>
                </div>
                <div class="col-12 mb-3">
                  <label for="productDescription" class="form-label w-100">
                    <p class="mb-2">產品描述</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productDescription"
                      placeholder="請輸入產品描述"
                      v-model="tempProduct.description">
                  </label>
                </div>
                <div class="col-12 mb-3">
                  <label for="productContent" class="form-label w-100">
                    <p class="mb-2">產品內容</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productContent"
                      placeholder="請輸入產品內容"
                      v-model="tempProduct.content">
                  </label>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <div class="col-12 mb-3">
                  <label for="productUrl" class="form-label w-100">
                    <p class="mb-2">輸入圖片網址</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productUrl"
                      placeholder="輸入圖片網址"
                      v-model="tempProduct.imageUrl">
                  </label>
                </div>
                <div class="col-12 mb-3">
                  <label for="uploadImg" class="form-label w-100">
                    <p class="mb-2">上傳圖片</p>
                    <input
                      type="file"
                      class="form-control"
                      id="uploadImg"
                      ref="fileInput"
                      @change="uploadFile">
                  </label>
                </div>
                <div>
                  <img :src="tempProduct.imageUrl" alt="產品圖片" class="img-fluid">
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <label class="form-check-label" for="enableProduct">
                      啟用
                      <input class="form-check-input" type="checkbox"
                      id="enableProduct"
                      v-model="tempProduct.is_enabled">
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary text-white"
          @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: ['product'],
  emits: ['update-product'],
  data() {
    return {
      modal: {},
      tempProduct: {},
      isLoading: false,
    };
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    uploadFile() {
      // 參考https://openhome.cc/Gossip/ECMAScript/FormData.html
      const uploadImg = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadImg);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.isLoading = true;
      this.axios.post(api, formData).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$refs.fileInput.value = ''; // 完成後清空上傳圖片<input>
        }
      });
    },
  },
  mixins: [modalMixin],
};
</script>
