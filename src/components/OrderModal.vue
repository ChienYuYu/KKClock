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
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>mdfk426@gmail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>0987987987</td>
                  </tr>
                  <tr>
                    <th scope="row">地址</th>
                    <td>蘆洲火車站火字下</td>
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
                    <td>-N6fDYwKhS1kiLGbNEtQ</td>
                  </tr>
                  <tr>
                    <th scope="row">下單時間</th>
                    <td>2022/7/11</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>尚未付款</td>
                  </tr>
                  <tr>
                    <th scope="row">付款時間</th>
                    <td>????</td>
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
                  <tr>
                    <th scope="row">潮流撞色鐘</th>
                    <td>1/個</td>
                    <td>499</td>
                  </tr>
                  <tr>
                    <th scope="row">誠實鐘</th>
                    <td>1/個</td>
                    <td>799</td>
                  </tr>
                  <tr>
                    <th scope="row">金童鐘</th>
                    <td>1/個</td>
                    <td>299</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">確認?</button>
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
