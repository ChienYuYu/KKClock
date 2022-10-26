<template>
  <div class="container d-flex justify-content-center pt-5">
    <div class="col-lg-6">
      <h2 class="text-center text-myred py-3">付款完成</h2>
      <div class="text-center mb-5">
        <p class="mb-2">您的訂單編號</p>
        <p class="text-myorange mb-2 h3">{{ orderId }}</p>
        <p class="text-secondary">此編號能用於查詢訂單明細</p>
      </div>
      <ul class="list-unstyled border-bottom border-top py-5 mb-0">
        <li class="d-flex">
          <i class="bi bi-caret-right-fill me-2" />
          <p>
            訂購與配送：完成訂購流程後，商品將依訂單順序於 3-5 日工作天內出貨， 出貨後的 3-5
            日工作天可送達指定地址。出貨工作日為週一至週五，週末不出貨，
            若遇缺貨、瑕疵等商品狀況，會以電話或 email 聯繫。
          </p>
        </li>
        <li class="d-flex">
          <i class="bi bi-caret-right-fill me-2" />
          <p>
            週末與國定假日訂購及配送：週四晚間 6 點
            至週日全天之間完成訂購之訂單，我們會在下個星期一起依訂購順序為您處理包裝出貨。
            如遇國定假日，則會順延至正常上班日依序出貨，敬請見諒。
          </p>
        </li>
        <li class="d-flex">
          <i class="bi bi-caret-right-fill me-2" />
          <p class="mb-0">
            臺灣配送時程：臺北市地區於出貨後 1-2 日內即會送達；
            臺灣其他地區（不含偏遠與離島）則於出貨後的 1-3 日內送達；
            臺灣本島偏遠地區與離島則需視投遞狀況調整配送時間。
          </p>
        </li>
      </ul>
      <div class="d-flex justify-content-center py-5">
        <router-link to="/product_list/全部商品" class="btn btn-secondary px-4 px-lg-5 mx-3">
          繼續購物
        </router-link>
        <router-link to="/order_search" class="btn btn-secondary px-4 px-lg-5 mx-3">
          訂單查詢
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orderId: '',
    };
  },
  created() {
    this.orderId = this.$route.params.orderId;
  },
};
</script>
