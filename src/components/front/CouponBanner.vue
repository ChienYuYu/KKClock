<template>
  <section class="bg-light py-5">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col d-flex justify-content-center">
          <img src="../../assets/img/saying01.jpg" alt="old clock image"
          data-aos="fade-up"
          data-aos-duration="1500"
          class="pic rounded-3 shadow mb-4 mb-lg-0" />
        </div>
        <div class="col-xl-7 col-md-9 px-4" data-aos="fade-left" data-aos-duration="1800">
          <p class="coupon_text">
            日子總是像從指尖流過的細沙，在不經意間悄然滑落。 那些往日的憂愁和悲傷，
            在似水流年的盪滌下隨波輕輕地逝去， 而留下的歡樂和笑靨就在記憶深處歷久彌新。
          </p>
          <p class="coupon_code text-secondary text-end pe-lg-5 mt-5">
            結帳輸入優惠碼: 【clock8989】即享89折優惠
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
};
</script>
<style lang="scss" scoped>
.coupon_text {
  line-height: 1.8;
}

.coupon_code {
  font-size: 14px;
}

.pic {
  width: 350px;
  object-fit: cover;

  @media (min-width: 992px) {
    width: 450px;
  }
}
</style>
