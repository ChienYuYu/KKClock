<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h5 class="modal-title">產品管理</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
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
                      placeholder="請輸入產品名稱">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="productCategory" class="form-label w-100">
                    <p class="mb-2">分類</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productCategory"
                      placeholder="請輸入分類名稱">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="productUnit" class="form-label w-100">
                    <p class="mb-2">單位</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productUnit"
                      placeholder="請輸入單位名稱">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="originalPrice" class="form-label w-100">
                    <p class="mb-2">原價</p>
                    <input
                      type="number"
                      class="form-control"
                      id="originalPrice"
                      placeholder="請輸入原價">
                  </label>
                </div>
                <div class="col-6 mb-3">
                  <label for="productPrice" class="form-label w-100">
                    <p class="mb-2">售價</p>
                    <input
                      type="number"
                      class="form-control"
                      id="productPrice"
                      placeholder="請輸入售價">
                  </label>
                </div>
                <div class="col-12 mb-3">
                  <label for="productDescription" class="form-label w-100">
                    <p class="mb-2">產品描述</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productDescription"
                      placeholder="請輸入產品描述">
                  </label>
                </div>
                <div class="col-12 mb-3">
                  <label for="productContent" class="form-label w-100">
                    <p class="mb-2">產品內容</p>
                    <input
                      type="text"
                      class="form-control"
                      id="productContent"
                      placeholder="請輸入產品內容">
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
                      placeholder="輸入圖片網址">
                  </label>
                </div>
                <div class="col-12 mb-3">
                  <label for="uploadImg" class="form-label w-100">
                    <p class="mb-2">上傳圖片</p>
                    <input
                      type="file"
                      class="form-control"
                      id="uploadImg">
                  </label>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <label class="form-check-label" for="enableProduct">
                      啟用
                      <input class="form-check-input" type="checkbox"
                      value="" id="enableProduct" checked>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary text-white">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Modal from 'bootstrap/js/dist/modal';
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
    };
  },
  mixins: [modalMixin],
  // methods: {
  //   showModal() {
  //     this.modal.show();
  //   },
  //   hideModal() {
  //     this.modal.hide();
  //   },
  // },
  // mounted() {
  //   this.modal = new Modal(this.$refs.modal);
  // },
};
</script>
