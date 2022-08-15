<template>
  <div class="nav-spacing">
    <Navbar/>
  </div>
  <div class="wrapper bg-light">
    <div>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import currency from '@/methods/currency';
import emitter from '@/methods/emitter';
import Navbar from '../components/NavbarView.vue';
import Footer from '../components/FooterView.vue';

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    Footer,
  },
  provide() {
    return {
      emitter,
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
