<template>
  <CarouselView />
  <CouponBanner />
  <HotProduct />
  <MonthFeatured />
  <DProductCard />
</template>

<script>
import CarouselView from '@/components/frontend/CarouselView.vue';
import CouponBanner from '@/components/frontend/CouponBanner.vue';
import HotProduct from '@/components/frontend/HotProduct.vue';
import MonthFeatured from '@/components/frontend/MonthFeatured.vue';
import DProductCard from '@/components/frontend/ProductCardDiscounted.vue';

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
