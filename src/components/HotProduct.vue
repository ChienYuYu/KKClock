<template>
  <div class="row row-cols-2 row-cols-md-4 g-3 pb-5">
    <div class="col">
      <div class="card border-0 rounded-3 overflow-hidden">
        <router-link to="product_list/流行炫彩" class="text-white">
          <img src="../assets/img/sample_product02.jpg" class="card-img" alt="流行炫彩系列" />
          <div class="mask mask1 card-img-overlay">
            <h5 class="hotTitle card-title m-0">流<br />行<br />炫<br />彩</h5>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col">
      <div class="card border-0 rounded-3 overflow-hidden">
        <router-link to="product_list/超級號碼" class="text-white">
          <img src="../assets/img/sample_product01.jpg" class="card-img" alt="超級號碼系列" />
          <div class="mask mask2 card-img-overlay">
            <h5 class="hotTitle card-title m-0">超<br />級<br />號<br />碼</h5>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col">
      <div class="card border-0 rounded-3 overflow-hidden">
        <router-link to="product_list/四數大字" class="text-white">
          <img src="../assets/img/sample_product03.jpg" class="card-img" alt="四數大字系列" />
          <div class="mask mask3 card-img-overlay">
            <h5 class="hotTitle card-title m-0">四<br />數<br />大<br />字</h5>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col">
      <div class="card border-0 rounded-3 overflow-hidden">
        <router-link to="product_list/經典鬧鐘" class="text-white">
          <img src="../assets/img/sample_product04.jpg" class="card-img" alt="經典系列" />
          <div class="mask mask4 card-img-overlay">
            <h5 class="hotTitle card-title m-0">經<br />典<br />鬧<br />鐘</h5>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div class="text-center">
    <router-link to="product_list/全部商品" class="go-buy btn px-5">
      <i class="bi bi-cart me-1" />
      購物去
      <i class="bi bi-caret-right" />
      <i class="bi bi-caret-right" />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.mask {
  transition: 0.6s;
  &:hover {
    opacity: 0;
  }
}
.mask1 {
  background: rgba(36, 124, 232, 0.6);
}
.mask2 {
  background: rgba(29, 146, 82, 0.6);
}
.mask3 {
  background: rgba(152, 146, 31, 0.6);
}
.mask4 {
  background: rgba(140, 28, 75, 0.6);
}
.hotTitle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.go-buy {
  // border: 1px solid #40d5ef;
  // color: #40d5ef;
  background: #CF4900;
    color: #fff;
  &:hover {
    background: #da723a;
  }
}
</style>
