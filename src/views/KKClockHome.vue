<template>
  <CarouselView />
  <CouponBanner />
  <HotProduct />
  <MonthFeatured />
  <DProductCard />
</template>

<script>
import CarouselView from '../components/CarouselView.vue';
import CouponBanner from '../components/CouponBanner.vue';
import HotProduct from '../components/HotProduct.vue';
import MonthFeatured from '../components/MonthFeatured.vue';
import DProductCard from '../components/ProductCardDiscounted.vue';

export default {
  components: {
    CarouselView,
    CouponBanner,
    HotProduct,
    MonthFeatured,
    DProductCard,
  },
};
</script>
