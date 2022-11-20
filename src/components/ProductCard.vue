<template>
  <div class="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-2 g-3 ms-lg-2">
    <div class="col" v-for="item in filterCategory" :key="item.id">
      <div class="card product_card rounded-1 overflow-hidden h-100 border-0">
        <a href="#" class="text-decoration-none text-dark" @click.prevent="getProductData(item.id)">
          <img :src="item.imageUrl" class="card-img-top" alt="clock" />
          <div class="card-body py-1">
            <h3 class="card-text fs-6">{{ item.title }}</h3>
            <div class="d-flex align-items-center justify-content-between">
              <p class="text-secondary mb-0 ogPrice">原價NT${{ currency(item.origin_price) }}</p>
              <p class="text-myred mb-0">NT${{ currency(item.price) }}</p>
            </div>
          </div>
        </a>
        <button
          type="button"
          :disabled="loadingItem == item.id"
          class="btn btn-outline-secondary m-2 py-1 mt-auto"
          @click="addCart(item.id)"
        >
          <div
            class="spinner-border spinner-border-sm text-mygrey"
            role="status"
            v-if="loadingItem == item.id"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  inject: ['emitter', 'currency'],
  props: ['filterCategory'],
  setup(props) {
    const router = useRouter();
    const axios = inject('axios'); // inject axios
    const emitter = inject('emitter');// inject emitter ( KKClockView.vue 裡 provide )
    const { filterCategory } = toRefs(props);
    console.log(filterCategory);
    const loadingItem = ref('');

    // 加入購物車
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

    // 取得單一產品
    const getProductData = (id) => {
      router.push(`product/${id}`);
    };

    return {
      loadingItem, addCart, getProductData,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
