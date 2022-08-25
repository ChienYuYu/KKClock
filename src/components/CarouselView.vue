<template>
  <div
    ref="carousel"
    id="carouselExampleCaptions"
    class="carousel slide carousel-fade container"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner rounded-3">
      <router-link to="product_list/全部商品" class="carousel-item active">
        <img
          src="../assets/img/banner04.jpg"
          class="banner d-block w-100"
          alt="banner1"
          height="400"
        />
        <div class="carousel-caption">
          <h5 class="mb-0 slogan rounded-3">
            kkClock<br />鐘的專家 最專業時鐘專賣<br />
          </h5>
          <button class="btn go-buy">
            &ensp;
            <i class="bi bi-cart me-1" />
            <span>來去逛逛</span>
            <i class="bi bi-caret-right" />
            <i class="bi bi-caret-right" />
          </button>
        </div>
      </router-link>
      <router-link to="product_list/全部商品" class="carousel-item">
        <img
          src="../assets/img/banner07.jpg"
          class="banner d-block w-100"
          alt="banner2"
          height="400"
        />
        <div class="carousel-caption">
          <h5 class="mb-0 slogan rounded-3">
            kkClock<br />鐘的專家 最專業時鐘專賣<br />
          </h5>
          <button class="btn go-buy">
            &ensp;
            <i class="bi bi-cart me-1" />
            <span>來去逛逛</span>
            <i class="bi bi-caret-right" />
            <i class="bi bi-caret-right" />
          </button>
        </div>
      </router-link>
      <router-link to="product_list/全部商品" class="carousel-item">
        <img
          src="../assets/img/banner08.jpg"
          class="banner d-block w-100"
          alt="banner3"
          height="400"
        />
        <div class="carousel-caption">
          <h5 class="mb-0 slogan rounded-3">
            kkClock<br />鐘的專家 最專業時鐘專賣<br />
          </h5>
          <button class="btn go-buy">
            &ensp;
            <i class="bi bi-cart me-1" />
            <span>來去逛逛</span>
            <i class="bi bi-caret-right" />
            <i class="bi bi-caret-right" />
          </button>
        </div>
      </router-link>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
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

<style lang="scss" scoped>
.banner {
  object-fit: cover;
}
.carousel-caption {
  right: 0;
  left: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.6));
  .slogan {
    font-size: 15px;
    color: #111;
    letter-spacing: 0.3rem;
    line-height: 1.5;
  }
  .go-buy {
    background: rgb(238, 123, 123);
    color: #fff;
    font-weight: bolder;
    margin-top: 5px;
    &:hover {
      background: rgb(239, 173, 173);
    }
  }
}
</style>
