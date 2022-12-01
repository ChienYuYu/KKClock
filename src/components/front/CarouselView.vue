<template>
  <!-- <div class="bg-white pb-5 pt-5">
    <div ref="carousel" id="carouselExampleCaptions"
    class="carousel index-carousel slide carousel-fade container"
      data-bs-ride="carousel">
      <div class="carousel-inner rounded-3">
        <div class="carousel-caption">
          <h5 class="mb-0 slogan rounded-3">
            kkClock<br />鐘的專家 最專業時鐘專賣<br />
          </h5>
          <router-link to="product_list/全部商品" class="btn go-buy">
            &ensp;
            <i class="bi bi-cart me-1" />
            <span>來去逛逛</span>
            <i class="bi bi-caret-right" />
            <i class="bi bi-caret-right" />
          </router-link>
        </div>
        <router-link to="product_list/全部商品" class="carousel-item active">
          <img src="../../assets/img/banner04.jpg"
          class="banner d-block w-100" alt="banner1" height="500" />
        </router-link>
        <router-link to="product_list/全部商品" class="carousel-item">
          <img src="../../assets/img/banner07.jpg"
          class="banner d-block w-100" alt="banner2" height="500" />
        </router-link>
        <router-link to="product_list/全部商品" class="carousel-item">
          <img src="../../assets/img/banner08.jpg"
          class="banner d-block w-100" alt="banner3" height="500" />
        </router-link>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div> -->
  <div class="bg-white pb-">
    <div ref="carousel" id="carouselExampleCaptions"
    class="carousel index-carousel slide carousel-fade"
      data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-caption">
          <h5 class="mb-0 slogan rounded-3">
            kkClock<br />鐘的專家 最專業時鐘專賣<br />
          </h5>
          <router-link to="product_list/全部商品" class="btn go-buy">
            &ensp;
            <i class="bi bi-cart me-1" />
            <span>來去逛逛</span>
            <i class="bi bi-caret-right" />
            <i class="bi bi-caret-right" />
          </router-link>
        </div>
        <router-link to="product_list/全部商品" class="carousel-item active">
          <img src="@/assets/img/banner09.jpg"
          class="banner d-block w-100 vh-100" alt="banner1"/>
        </router-link>
        <router-link to="product_list/全部商品" class="carousel-item">
          <img src="@/assets/img/banner10.jpg"
          class="banner d-block w-100 vh-100" alt="banner2"/>
        </router-link>
        <router-link to="product_list/全部商品" class="carousel-item">
          <img src="@/assets/img/banner12.jpg"
          class="banner d-block w-100 vh-100" alt="banner3"/>
        </router-link>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  setup() {
    const carousel = ref(null);

    onMounted(() => {
      carousel.value = new Carousel(carousel.value, {
        interval: 1500,
      });
    });

    return { carousel };
  },

  // mounted() {
  //   this.carousel = new Carousel(this.$refs.carousel, {
  //     interval: 1500,
  //   });
  // },
};
</script>

<style lang="scss" scoped>
.banner {
  object-fit: cover;
}

.index-carousel {
  position: relative;
}

.carousel-caption {
  position: absolute;
  z-index: 99;
  left: 50%;
  bottom: 40%;
  transform: translateX(-50%);
  backdrop-filter: blur(5px);
  // background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4));
  background: linear-gradient(rgba(243, 243, 243, 0.2), rgba(220, 220, 220, 0.3));
  @media(max-width: 900px) {
    left: 0;
    right: 0;
    transform: translateX(0);
  }
  @media(max-width: 600px) {
    bottom: 45%;
  }

  .slogan {
    font-size: 16px;
    // color: #111;
    color: #fff;
    letter-spacing: 0.3rem;
    line-height: 1.5;
  }

  .go-buy {
    // background: rgb(238, 123, 123);
    background: #CF4900;
    color: #fff;
    font-weight: bolder;
    margin-top: 5px;

    &:hover {
      background: #da723a;
    }
  }
}
</style>
