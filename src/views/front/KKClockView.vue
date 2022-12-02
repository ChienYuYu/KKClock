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
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import currency from '@/methods/currency';
import Navbar from '@/components/front/NavbarView.vue';
import Footer from '@/components/front/FooterView.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    onMounted(() => {
      AOS.init({
        once: true,
      });
    });
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
