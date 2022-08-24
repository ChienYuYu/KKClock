<template>
  <div
    ref="carousel"
    id="carouselExampleIndicators"
    class="carousel slide carousel-fade container"
    data-bs-ride="carousel"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      />
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      />
    </div>
    <div class="carousel-inner rounded-3">
      <div class="carousel-item active">
        <img
          src="../assets/img/banner04.jpg"
          class="banner d-block w-100"
          height="400"
          alt="banner1"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../assets/img/banner07.jpg"
          class="banner d-block w-100"
          height="400"
          alt="banner2"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../assets/img/banner05.jpg"
          class="banner d-block w-100"
          height="400"
          alt="banner3"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true" />
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true" />
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  data() {
    return {
      carousel: {},
    };
  },
  methods: {},
  mounted() {
    this.carousel = new Carousel(this.$refs.carousel, {
      interval: 3500,
    });
  },
};
</script>

<style scoped>
.banner {
  object-fit: cover;
}
</style>
