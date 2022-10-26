<template>
  <ProgressBar />
  <BuyerInfo />
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue';
import BuyerInfo from '@/components/BuyerInfo.vue';

export default {
  components: {
    BuyerInfo,
    ProgressBar,
  },
};

</script>
