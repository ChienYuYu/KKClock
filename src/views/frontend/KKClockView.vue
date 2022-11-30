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
import Navbar from '@/components/frontend/NavbarView.vue';
import Footer from '@/components/frontend/FooterView.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  provide() {
    return {
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
