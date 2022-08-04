<template>
<div class="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-2 g-3 ms-1">
  <div class="col" v-for="item in products" :key="item.id">
    <div class="card product_card rounded-1 overflow-hidden h-100 border-0">
      <a href="#" class="text-decoration-none text-dark"
        @click.prevent="getProductData(item.id)">
        <img :src="item.imageUrl" class="card-img-top" alt="clock">
        <div class="card-body py-1">
          <h3 class="card-text fs-6">{{item.title}}</h3>
          <div class="d-flex align-items-center justify-content-between">
            <p class="text-secondary mb-0 ogPrice">原價NT${{currency(item.origin_price)}}</p>
            <p class="text-myred mb-0">NT${{currency(item.price)}}</p>
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
  </div>
</div>
</template>

<script>
export default {
  props: ['products'],
  data() {
    return {
      loadingItem: '',
    };
  },
  inject: ['emitter', 'currency'],
  methods: {
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
    // 取得單一產品
    getProductData(id) {
      this.$router.push(`product/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
