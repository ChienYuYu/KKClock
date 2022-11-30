<template>
  <ProgressBar />
  <BuyerInfo />
</template>

<script>
import ProgressBar from '@/components/frontend/ProgressBar.vue';
import BuyerInfo from '@/components/frontend/BuyerInfo.vue';

export default {
  components: {
    BuyerInfo,
    ProgressBar,
  },
};

</script>
