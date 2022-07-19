<template>
  <Navbar></Navbar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
// import Carousel from 'bootstrap/js/dist/carousel';
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
  methods: {},
};
</script>

<style>
.router-link-active{
  color: #5fd0c3 !important;
}
</style>
