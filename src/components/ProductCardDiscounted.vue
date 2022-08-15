<template>
  <swiper
    :slidesPerView="this.slidesPerView"
    :spaceBetween="20"
    :slidesPerGroup="1"
    :loop="true"
    :loopFillGroupWithBlank="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper p-3"
    ref="myswiper">
    <swiper-slide v-for="item in products" :key="item.id" class="">
      <div class="card product_card rounded-1 overflow-hidden h-100 border-0 position-relative">
        <span class="flag text-white p-1">特價</span>
        <a href="#" class="text-decoration-none text-dark"
          @click.prevent="getProductData(item.id)">
          <img :src="item.imageUrl" class="card-img-top" alt="clock">
          <div class="card-body py-1">
            <h3 class="card-text fs-6">{{ item.title }}</h3>
            <div class="d-flex align-items-center justify-content-between">
              <p class="text-secondary mb-0 ogPrice">原價NT${{ currency(item.origin_price) }}</p>
              <p class="text-myred mb-0">NT${{ currency(item.price) }}</p>
            </div>
          </div>
        </a>
        <button type="button"
          :disabled="this.loadingItem == item.id"
          class="btn btn-mygreen text-white m-2 py-1"
          @click="addCart(item.id)">
          <div class="spinner-border spinner-border-sm text-white"
            role="status" v-if="this.loadingItem == item.id">
            <span class="visually-hidden">Loading...</span>
          </div>
          加入購物車
        </button>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import '../assets/scss/helpers/swiper-vars.scss';
import '../assets/scss/helpers/swiper.scss';
import '../assets/scss/helpers/navigation.scss';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      loadingItem: '',
      products: [],
      modules: [Navigation],
      deviceWidth: 0,
      slidesPerView: 5,
    };
  },
  inject: ['emitter', 'currency'],
  methods: {
    // 先取得產品再filter篩選
    getDiscountedProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(api).then((res) => {
        this.products = res.data.products.filter((item) => item.category === '特價');
      });
    },
    getProductData(id) {
      this.$router.push(`/product_list/product/${id}`);
    },
    // 加入購物車
    addCart(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.loadingItem = id;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.axios.post(api, { data: cart }).then(() => {
        this.loadingItem = '';
        this.emitter.emit('updateData');
        // SweetAlert-----
        this.$swal({
          title: '加入成功',
          position: 'top-end',
          toast: true,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    },
    // 設定swiper不同解析度顯示張數
    swiperNum() {
      if (this.deviceWidth < 650) {
        this.slidesPerView = 1;
      } else if (this.deviceWidth < 1050) {
        this.slidesPerView = 3;
      } else {
        this.slidesPerView = 5;
      }
    },
  },
  created() {
    this.getDiscountedProduct();
  },
  // 參考 https://reurl.cc/oQdvE5
  mounted() {
    this.deviceWidth = window.innerWidth;
    this.swiperNum();
    window.onresize = () => {
      this.deviceWidth = window.innerWidth;
      this.swiperNum();
    };
  },
};
</script>

<style lang="scss">
.product_card{
  box-shadow: 4px 4px 5px rgb(227, 227, 227);
  transition: .3s;
  &:hover{
    transform: scale(105%);
  }
}
.ogPrice{
  font-size: 12px;
  text-decoration: line-through;
}
.flag{
  position: absolute;
  border-radius: 0 0 10px 10px;
  background: #fda35a;
  border:3px solid #fff;
  box-shadow: 3px 3px #333;
  left: 3%;
  top: 2%;
}
.swiper-button-prev, .swiper-button-next{
  color: #fff;
  background: rgba(255, 112, 112, 0.5);
  padding: 26px 20px;
  transform: scale(75%);
}
.swiper-button-prev{
  border-radius:10px 0 0 10px;
  margin-left: -15px;
}
.swiper-button-next{
  border-radius:0 10px 10px 0;
  margin-right: -15px;
}
</style>
