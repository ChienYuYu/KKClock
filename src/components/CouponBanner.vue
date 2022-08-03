<template>
  <div class="row mb-3 justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-5 d-flex justify-content-center">
        <img src="../assets/img/saying01.jpg" alt="old clock image"
          class="pic rounded-3 shadow mb-3 mb-md-0">
      </div>
      <div class="col-12 col-md-8 col-lg-5 mt-md-3">
        <p class="coupon_text">日子總是像從指尖流過的細沙，在不經意間悄然滑落。<br>那些往日的憂愁和悲傷，
          在似水流年的盪滌下隨波輕輕地逝去，<br>而留下的歡樂和笑靨就在記憶深處歷久彌新。
        </p>
        <p class="coupon_code text-secondary text-end mt-5">
                結帳輸入優惠碼: 【clock8989】即享89折優惠
        </p>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.coupon_text{
  line-height:1.8;
}
.coupon_code{
  font-size: 14px;
}
.pic{
  width: 380px;
  object-fit: cover;
  @media (min-width: 992px) {
    width: 450px;
  }
}
</style>
