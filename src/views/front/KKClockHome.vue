<template>
  <CarouselView />
  <CouponBanner />
  <HotProduct />
  <MonthFeatured />
  <DProductCard />
</template>

<script>
import CarouselView from '@/components/front/CarouselView.vue';
import CouponBanner from '@/components/front/CouponBanner.vue';
import HotProduct from '@/components/front/HotProduct.vue';
import MonthFeatured from '@/components/front/MonthFeatured.vue';
import DProductCard from '@/components/front/ProductCardDiscounted.vue';

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
