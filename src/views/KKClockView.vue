<template>
  <div class="wrapper bg-light">
    <div>
      <div class="nav-spacing">
        <Navbar></Navbar>
      </div>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import Carousel from 'bootstrap/js/dist/carousel';
import emitter from '@/methods/emitter';
import currency from '@/methods/currency';
import Navbar from '../components/NavbarView.vue';
import Footer from '../components/FooterView.vue';

export default {
  data() {
    return {};
  },
  components: {
    Footer,
    Navbar,
  },
  provide() {
    return {
      emitter,
      currency,
    };
  },
  methods: {},
};
</script>

<style>
.router-link-active{
  color: #5fd0c3 !important;
}
.nav-spacing{
  padding-bottom: 65px;
}
.wrapper{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
