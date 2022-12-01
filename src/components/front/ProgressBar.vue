<template>
  <div class="mt-5 pt-5 container d-flex justify-content-center">
    <ul class="step-list list-unstyled rounded-3 overflow-hidden">
      <li :class="{ 'step-active': stepStatus === 1 }">STEP1<br />確認訂單</li>
      <li :class="{ 'step-active': stepStatus === 2 }">STEP2<br />填寫資料</li>
      <li :class="{ 'step-active': stepStatus === 3 }">STEP3<br />確認付款</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stepStatus: 0,
    };
  },
  created() {
    if (this.$route.path === '/cart') {
      this.stepStatus = 1;
    }
    if (this.$route.path === '/buyer_info') {
      this.stepStatus = 2;
    }
    if (this.$route.path === `/checkout/${this.$route.params.orderId}`) {
      this.stepStatus = 3;
    }
  },
};
</script>

<style lang="scss">
.step-list {
  border: 1px solid #777;
  text-align: center;
  display: flex;
  justify-content: center;
  li {
    padding: 0 5rem;
    @media (max-width: 767.98px) {
      padding: 0 1.4rem;
    }
  }
  li + li {
    border-left: 1px solid #777;
  }
}
.step-active {
  background: #777;
  color: #fff;
}
</style>
