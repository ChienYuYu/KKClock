<template>
  <ProgressBar />
  <BuyerInfo />
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue';
import BuyerInfo from '@/components/BuyerInfo.vue';
import titleMixin from '../mixins/titleMixin';

export default {
  components: {
    BuyerInfo,
    ProgressBar,
  },
  mixins: [titleMixin],
};

</script>
