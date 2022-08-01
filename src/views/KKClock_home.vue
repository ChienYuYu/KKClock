<template>
<div class="bg-white pb-5 pt-5">
  <CarouselView></CarouselView>
</div>
<section class="bg-light py-5">
   <!-- <h2 class="text-center text-secondary mb-3">
    關於我們
  </h2> -->
  <div class="container">
    <div class="row mb-3 justify-content-center align-items-center">
      <div class="col-12 col-md-5 me-md-3 d-flex justify-content-center">
        <img src="../assets/img/saying01.jpg" alt=""
          class="pic rounded-3 shadow mb-3 mb-md-0">
      </div>
      <div class="col-12 col-md-5">
        <p>時光流逝了，記憶往事走遠了，卻深深的留在了記憶和腦海中，
          當歲月流逝，青春不再的時候，我就慢慢懂得了人生的意義和精彩之處，
          我們很多人都很捨不得這個世界，對於生活充滿著眷戀。
        </p>
        <p class="coupon_text text-secondary text-end mt-5">
                結帳輸入優惠碼: 【clock888】即享8折優惠
        </p>
      </div>
    </div>
  </div>
</section>
<!-- ------------------- -->
<section class="py-5 bg-white">
  <div class="container">
    <h2 class="text-secondary mb-4">
    熱門商品<hr>
    </h2>
    <div class="row row-cols-2 row-cols-md-4 g-3 pb-5">
      <div class="col">
        <div class="card border-0 rounded-3 overflow-hidden">
          <router-link to="product_list/流行炫彩" href="#" class="text-white">
            <img src="../assets/img/sample_product02.jpg" class="card-img" alt="...">
            <div class="mask mask1 card-img-overlay">
              <h5 class="hotTitle card-title m-0">流<br>行<br>炫<br>彩</h5>
            </div>
          </router-link>
        </div>
      </div>
      <div class="col">
        <div class="card border-0 rounded-3 overflow-hidden">
          <router-link to="product_list/超級號碼" href="#" class="text-white">
            <img src="../assets/img/sample_product01.jpg" class="card-img" alt="...">
            <div class="mask mask2 card-img-overlay">
              <h5 class="hotTitle card-title m-0">超<br>級<br>號<br>碼</h5>
            </div>
          </router-link>
        </div>
      </div>
      <div class="col">
        <div class="card border-0 rounded-3 overflow-hidden">
          <router-link to="product_list/四數大字" href="#" class="text-white">
            <img src="../assets/img/sample_product03.jpg" class="card-img" alt="...">
            <div class="mask mask3 card-img-overlay">
              <h5 class="hotTitle card-title m-0">四<br>數<br>大<br>字</h5>
            </div>
          </router-link>
        </div>
      </div>
      <div class="col">
        <div class="card border-0 rounded-3 overflow-hidden">
          <router-link to="product_list/經典鬧鐘" href="#" class="text-white">
            <img src="../assets/img/sample_product04.jpg" class="card-img" alt="...">
            <div class="mask mask4 card-img-overlay">
              <h5 class="hotTitle card-title m-0">經<br>典<br>鬧<br>鐘</h5>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="text-center">
      <a href="#" class="btn btn-outline-info px-5">
        <i class="bi bi-cart me-1"></i>
        購物去
        <i class="bi bi-caret-right"></i>
        <i class="bi bi-caret-right"></i>
      </a>
    </div>
  </div>
</section>
<!-- ------------------- -->
<!-- ------------------- -->
<section class="py-5 bg-light">
  <div class="container">
    <h2 class="text-secondary mb-5">
    本月主打<hr>
  </h2>
    <!-- <img src="../assets/img/kkcBanner.jpg" alt="" class="w-100"> -->
    <div class="row row-cols-1 row-cols-md-3 g-3">
      <div class="col">
        <router-link to="product_list/product/-N7o4O_-0lrDbAbqpVus" href="#">
          <div class="card text-white border-0 recommended_banner">
            <img src="../assets/img/pb01.jpg" class="card-img" alt="...">
            <div class="card-img-overlay p-0">
              <p class="card-text bg-danger bg-opacity-75 d-inline h4
                position-absolute bottom-0 p-2">
                購物去
                <i class="bi bi-caret-right-fill"></i>
                <i class="bi bi-caret-right-fill"></i>
              </p>
            </div>
          </div>
        </router-link>
        </div>
      <div class="col">
        <router-link to="product_list/product/-N7o1Z3lgnSsrV9jMXu3" href="#">
          <div class="card text-white border-0 recommended_banner">
            <img src="../assets/img/pb03.jpg" class="card-img" alt="...">
            <div class="card-img-overlay p-0">
              <p class="card-text bg-danger bg-opacity-75 d-inline h4
                position-absolute bottom-0 p-2">
                購物去
                <i class="bi bi-caret-right-fill"></i>
                <i class="bi bi-caret-right-fill"></i>
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col">
        <router-link to="product_list/product/-N7oAaExJAvb5F114Y0s" href="#">
          <div class="card text-white border-0 recommended_banner">
            <img src="../assets/img/pb02.jpg" class="card-img" alt="...">
            <div class="card-img-overlay p-0">
              <p class="card-text bg-danger bg-opacity-75 d-inline h4
                position-absolute bottom-0 p-2">
                購物去
                <i class="bi bi-caret-right-fill"></i>
                <i class="bi bi-caret-right-fill"></i>
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</section>
<!-- ------------------- -->
<section class="bg-white py-5">
  <div class="container">
    <h2 class="text-secondary mb-4">
      特價商品<hr>
    </h2>
    <!-- <div class="row row-cols-2 row-cols-md-5 g-3 pb-5">
      <DProductCard></DProductCard>
    </div> -->
    <!-- -------------- -->
    <!-- <div class="row g-3 pb-5">
      <DProductCard></DProductCard>
    </div> -->
    <!-- -------------- -->
    <div class="row row-cols-1  g-3 pb-5">
      <DProductCard></DProductCard>
    </div>
    <!-- -------------- -->
    <div class="text-center">
      <router-link to="product_list/全部商品" href="#"
      class="btn btn-secondary px-5">
        查看更多商品<i class="bi bi-caret-right-fill"></i>
      </router-link>
    </div>
  </div>
</section>
<!-- ------------------- -->
</template>

<script>
import CarouselView from '../components/CarouselView.vue';
import DProductCard from '../components/ProductCard_discounted.vue';

export default {
  data() {
    return {};
  },
  components: {
    CarouselView,
    DProductCard,
  },
};
</script>

<style lang="scss">
.coupon_text{
  font-size: 12px;
}
.mask{
  transition: .6s;
  &:hover{
    opacity: 0;
  }
}
.mask1{
  background: rgba(36, 124, 232, 0.6);
}
.mask2{
  background: rgba(29, 146, 82, 0.6);
}
.mask3{
  background: rgba(152, 146, 31, 0.6);
}
.mask4{
  background: rgba(140, 28, 75, 0.6);
}
.hotTitle{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* transform: translateY(-50%); */
}
.pic{
  width: 380px;
  object-fit: cover;
  // @include media-breakpoint-up(lg) {
  //   width: 450px;
  //  }
   @media (min-width: 992px) {
    width: 450px;
   }
}
// .special_offer .card{
//   width:180px;
// }
.recommended_banner{
  transition: .4s;
  &:hover{
    transform: translateY(-3%);
    box-shadow: 0 0 8px #bbb;
  }
}

.discount_product{
  box-shadow: 0 0  6px #ccc;
  transition: .2s;
  &:hover{
    box-shadow:0 0 15px #ccc;
  }
}
</style>
