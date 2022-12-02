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
import { useStore } from 'vuex';
import { toRefs, computed } from 'vue';
import { useRouter } from 'vue-router';
import currency from '@/methods/currency';

export default {
  props: ['filterCategory'],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    // eslint-disable-next-line no-unused-vars
    const { filterCategory } = toRefs(props);
    const loadingItem = computed(() => store.state.ProductCard.loadingItem);

    const addCart = (id) => {
      store.dispatch('ProductCard/addCart', id);
    };

    // 取得單一產品
    const getProductData = (id) => {
      router.push(`product/${id}`);
    };

    return {
      loadingItem, addCart, getProductData, currency,
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
