<template>
  <section class="bg-white py-5">
    <div class="container" data-aos="fade-up">
      <h2 class="text-secondary mb-4">
        特價商品
        <hr />
      </h2>
      <div class="pb-5">

        <swiper :slidesPerView="slidesPerView" :spaceBetween="20" :slidesPerGroup="1" :loop="true"
          :loopFillGroupWithBlank="true" :pagination="{
            clickable: true,
          }" :navigation="true" :modules="modules" class="mySwiper p-3" ref="myswiper">
          <swiper-slide v-for="item in products" :key="item.id">
            <div class="card product_card rounded-1
            overflow-hidden h-100 border-0 position-relative">
              <span class="flag text-white p-1">特價</span>
              <a href="#" class="text-decoration-none
              text-dark" @click.prevent="getProductData(item.id)">
                <img :src="item.imageUrl" class="card-img-top" alt="clock" />
                <div class="card-body py-1">
                  <h3 class="card-text fs-6">{{ item.title }}</h3>
                  <div class="d-flex align-items-center justify-content-between">
                    <p class="text-secondary mb-0 ogPrice">
                      原價NT${{ currency(item.origin_price) }}
                    </p>
                    <p class="text-myred mb-0">NT${{ currency(item.price) }}</p>
                  </div>
                </div>
              </a>
              <button type="button" :disabled="loadingItem == item.id"
              class="btn btn-outline-secondary m-2 py-1"
                @click="addCart(item.id)">
                <div class="spinner-border spinner-border-sm text-mygreey"
                role="status" v-if="loadingItem == item.id">
                  <span class="visually-hidden">Loading...</span>
                </div>
                加入購物車
              </button>
            </div>
          </swiper-slide>
        </swiper>

      </div>
      <div class="text-center">
        <router-link to="product_list/全部商品" class="btn btn-myorange2 text-white view-more px-5">
          查看更多商品<i class="bi bi-caret-right-fill" />
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import emitter from '@/methods/emitter';
import currency from '@/methods/currency';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import '../../assets/scss/helpers/swiper-vars.scss';
import '../../assets/scss/helpers/swiper.scss';
import '../../assets/scss/helpers/navigation.scss';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const axios = inject('axios');
    const router = useRouter();
    const loadingItem = ref('');
    const products = ref([]);
    const modules = ref([Navigation]);
    const deviceWidth = ref(0);
    const slidesPerView = ref(5);

    const getDiscountedProduct = () => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      axios.get(api)
        .then((res) => {
          products.value = res.data.products.filter((item) => item.category === '特價');
        })
        .catch(() => {
          Swal.fire({
            title: '網頁似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    };
    getDiscountedProduct(); // 原created 執行

    const getProductData = (id) => {
      router.push(`/product_list/product/${id}`);
    };

    const addCart = (id) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      loadingItem.value = id;
      const cart = {
        product_id: id,
        qty: 1,
      };
      axios.post(api, { data: cart })
        .then(() => {
          loadingItem.value = '';
          emitter.emit('updateData');
          // SweetAlert-----
          Swal.fire({
            title: '加入成功',
            position: 'top-end',
            toast: true,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          loadingItem.value = '';
          Swal.fire({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    };

    // 設定swiper不同解析度顯示張數
    const swiperNum = () => {
      if (deviceWidth.value < 650) {
        slidesPerView.value = 1;
      } else if (deviceWidth.value < 1200) {
        slidesPerView.value = 3;
      } else {
        slidesPerView.value = 5;
      }
    };

    onMounted(() => {
      deviceWidth.value = window.innerWidth;
      swiperNum();
      window.onresize = () => {
        deviceWidth.value = window.innerWidth;
        swiperNum();
      };
    });

    return {
      currency,
      loadingItem,
      products,
      modules,
      deviceWidth,
      slidesPerView,
      getDiscountedProduct,
      getProductData,
      addCart,
      swiperNum,
    };
  },
};
</script>

<style lang="scss">
.product_card {
  transition: 0.3s;

  &:hover {
    transform: scale(105%);
  }
}

.ogPrice {
  font-size: 12px;
  text-decoration: line-through;
}

.flag {
  position: absolute;
  border-radius: 0 0 10px 10px;
  // background: #fda35a;
  background: #CF4900;
  border: 3px solid #fff;
  box-shadow: 3px 3px #333;
  left: 3%;
  top: 2%;
}

.swiper-button-prev,
.swiper-button-next {
  color: #eee;
  background: rgba(75, 75, 75, 0.3);
  padding: 26px 20px;
  transform: scale(75%);
}

.swiper-button-prev {
  border-radius: 10px 0 0 10px;
  margin-left: -15px;
}

.swiper-button-next {
  border-radius: 0 10px 10px 0;
  margin-right: -15px;
}
</style>
