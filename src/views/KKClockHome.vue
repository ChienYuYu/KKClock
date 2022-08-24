<template>
  <div class="bg-white pb-5 pt-5">
    <CarouselView />
  </div>
  <section class="bg-light py-5">
    <div class="container">
      <CouponBanner />
    </div>
  </section>
  <section class="py-5 bg-white">
    <div class="container">
      <h2 class="text-secondary mb-4">
        熱門商品
        <hr />
      </h2>
      <HotProduct />
    </div>
  </section>
  <section class="py-5 bg-light">
    <div class="container">
      <h2 class="text-secondary mb-5">
        本月主打
        <hr />
      </h2>
      <MonthFeatured />
    </div>
  </section>
  <section class="bg-white py-5">
    <div class="container">
      <h2 class="text-secondary mb-4">
        特價商品
        <hr />
      </h2>
      <div class="pb-5">
        <DProductCard />
      </div>
      <div class="text-center">
        <router-link to="product_list/全部商品" class="btn btn-secondary px-5">
          查看更多商品<i class="bi bi-caret-right-fill" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import CarouselView from '../components/CarouselView.vue';
import CouponBanner from '../components/CouponBanner.vue';
import HotProduct from '../components/HotProduct.vue';
import MonthFeatured from '../components/MonthFeatured.vue';
import DProductCard from '../components/ProductCardDiscounted.vue';
import titleMixin from '../mixins/titleMixin';

export default {
  components: {
    CarouselView,
    CouponBanner,
    HotProduct,
    MonthFeatured,
    DProductCard,
  },
  mixins: [titleMixin],
};
</script>
