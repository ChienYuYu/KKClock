<template>
  <div class="nav-spacing">
    <Navbar />
  </div>
  <div class="wrapper bg-light">
    <div>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import currency from '@/methods/currency';
import emitter from '@/methods/emitter';
import Navbar from '../components/NavbarView.vue';
import Footer from '../components/FooterView.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  provide() {
    return {
      emitter, // 待刪除 直接在要用的vue檔內 import，用provide inject有點多餘
      currency,
    };
  },
};
</script>

<style>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
