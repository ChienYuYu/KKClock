<template>
<LoadingPlugin :active="isLoading"></LoadingPlugin>
  <section class="py-5">
    <div class="container">
      <h2 class="text-center d-lg-none">產品項目</h2>
      <div class="row">
        <div class="col-lg-2 pt-md-5">
          <ul class="list-unstyled d-flex flex-lg-column
          text-nowrap overflow-auto product-list-group">
            <li>
              <a href="#" class="list-item px-4 px-lg-5 py-2 d-block text-decoration-none
              text-center border-top"
              :class="{'list-active': category === '全部商品'}"
              @click.prevent="getCategory('全部商品')">全部商品</a>
            </li>
            <li>
               <a href="#" class="list-item px-4 px-lg-5 py-2 d-block text-decoration-none
               text-center"
               :class="{'list-active': category === '特價'}"
               @click.prevent="getCategory('特價')">特價</a>
            </li>
            <li>
              <a href="#" class="list-item px-4 px-lg-5 py-2 d-block text-decoration-none
              text-center"
              :class="{'list-active': category === '流行炫彩'}"
              @click.prevent="getCategory('流行炫彩')">流行炫彩</a>
            </li>
            <li>
              <a href="#" class="list-item px-4 px-lg-5 py-2 d-block text-decoration-none
              text-center"
              :class="{'list-active': category === '超級號碼'}"
              @click.prevent="getCategory('超級號碼')">超級號碼</a>
            </li>
            <li>
              <a href="#" class="list-item px-4 px-lg-5 py-2 d-block text-decoration-none
              text-center"
              :class="{'list-active': category === '四數大字'}"
              @click.prevent="getCategory('四數大字')">四數大字</a>
            </li>
            <li>
              <a href="#" class="list-item px-4 px-lg-5 py-2 d-block text-decoration-none
              text-center"
              :class="{'list-active': category === '經典鬧鐘'}"
              @click.prevent="getCategory('經典鬧鐘')">經典鬧鐘</a>
            </li>
            <li>
              <a href="#" class="list-item px-4 px-lg-5 py-2 d-block text-decoration-none
              text-center"
              :class="{'list-active': category === '其他'}"
              @click.prevent="getCategory('其他')">其他</a>
            </li>
          </ul>
        </div>
        <!-- ------------------------------- -->
        <div class="col-lg-10">
          <h3>{{category}}<hr></h3>
          <div class="row row-cols-lg-5 row-cols-md-3 row-cols-2 g-3">
            <!-- --------------------- -->
            <ProductCard
            :products="products"
            @get-product-data="getProductData"
            ></ProductCard>
            <!-- --------------------- -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';

export default {
  data() {
    return {
      products: [],
      category: '全部商品',
      isLoading: false,
    };
  },
  components: {
    ProductCard,
  },
  methods: {
    // 取得產品
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        if (this.category !== '全部商品') {
          this.products = res.data.products.filter((item) => item.category === this.category);
        } else {
          this.products = res.data.products;
        }
        this.isLoading = false;
        console.log('getProducts()', res);
      });
    },
    // 取得類別
    getCategory(category) {
      this.category = category;
      console.log(category);
      this.$router.push(`${category}`);
      this.getProducts();
    },
    // 取得單一產品
    getProductData(id) {
      this.$router.push(`product/${id}`);
    },
  },
  created() {
    this.category = this.$route.params.category;
    this.getProducts();
  },
};
</script>

<style lang="scss">
.list-item{
  color: #777;
  border-bottom: 1px solid #dee2e6;
  &:hover{
    background: #59d2c8;
    color: #fff;
  }
}
.list-active{
  background: #59d2c8;
  color: #fff;
}
.product-list-group{
  @media (min-width: 992px) {
    position: fixed;
   }
}
</style>
