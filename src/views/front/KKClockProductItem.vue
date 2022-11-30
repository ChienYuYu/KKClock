<template>
  <section class="bg-white py-5">
    <div class="container">
      <div class="card p-3 p-md-4 border-0">
        <div class="row g-0">
          <div class="col-md-6">
            <img :src="product.imageUrl" class="img-fluid rounded-3 shadow" alt="clock" />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h2 class="card-title">{{ product.title }}</h2>
              <p class="card-text">{{ product.description }}</p>
              <div class="d-flex align-items-center mb-3">
                <p class="ogPrice text-secondary mb-0 ogPrice me-3">
                  原價NT${{ currency(product.origin_price) }}
                </p>
                <p class="text-myred mb-0 h3">NT${{ currency(product.price) }}</p>
              </div>
              <div class="d-flex col-10 col-md-6 col-lg-3 mb-4">
                <button class="btn btn-sm btn-secondary rounded-0" type="button" @click="qty += 1">
                  <i class="bi bi-plus" />
                </button>
                <input
                  type="number"
                  class="form-control rounded-0 px-0 text-center bg-white"
                  min="1"
                  id="qty"
                  aria-label="qty"
                  v-model="qty"
                  disabled
                />
                <button
                  class="btn btn-sm btn-secondary rounded-0"
                  type="button"
                  @click="qty -= 1"
                  :disabled="qty === 1"
                >
                  <i class="bi bi-dash" />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-secondary p-2 col-12 col-lg-5 me-2 mb-3"
                  @click="addCart(product.id, false)"
                >
                  <div
                    class="spinner-border spinner-border-sm text-white"
                    role="status"
                    v-if="loadingItem == product.id"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加入購物車
                </button>
                <button
                  type="button"
                  class="direct-buy btn p-2 col-12 col-lg-5 mb-3"
                  @click="addCart(product.id, true)"
                >
                  直接購買
                </button>
              </div>
              <div class="d-none d-lg-block text-secondary">
                <div class="col mt-3">
                  <h3 class="py-3">購物須知</h3>
                  <ul class="list-unstyled">
                    <li class="d-flex">
                      <i class="bi bi-caret-right-fill me-2" />
                      <p>
                        訂購與配送：完成訂購流程後，商品將依訂單順序於 3-5 日工作天內出貨， 出貨後的
                        3-5 日工作天可送達指定地址。出貨工作日為週一至週五，週末不出貨，
                        若遇缺貨、瑕疵等商品狀況，會以電話或 email 聯繫。
                      </p>
                    </li>
                    <li class="d-flex">
                      <i class="bi bi-caret-right-fill me-2" />
                      <p>
                        週末與國定假日訂購及配送：週四晚間 6 點
                        至週日全天之間完成訂購之訂單，我們會在下個星期一起依訂購順序為您處理包裝出貨。
                        如遇國定假日，則會順延至正常上班日依序出貨，敬請見諒。
                      </p>
                    </li>
                    <li class="d-flex">
                      <i class="bi bi-caret-right-fill me-2" />
                      <p>
                        臺灣配送時程：臺北市地區於出貨後 1-2 日內即會送達；
                        臺灣其他地區（不含偏遠與離島）則於出貨後的 1-3 日內送達；
                        臺灣本島偏遠地區與離島則需視投遞狀況調整配送時間。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="d-lg-none text-secondary">
            <div class="col mt-4">
              <h3 class="py-3 text-center">購物須知</h3>
              <ul class="list-unstyled">
                <li class="d-flex">
                  <i class="bi bi-caret-right-fill me-2" />
                  <p>
                    訂購與配送：完成訂購流程後，商品將依訂單順序於 3-5 日工作天內出貨， 出貨後的 3-5
                    日工作天可送達指定地址。出貨工作日為週一至週五，週末不出貨，
                    若遇缺貨、瑕疵等商品狀況，會以電話或 email 聯繫。
                  </p>
                </li>
                <li class="d-flex">
                  <i class="bi bi-caret-right-fill me-2" />
                  <p>
                    週末與國定假日訂購及配送：週四晚間 6 點
                    至週日全天之間完成訂購之訂單，我們會在下個星期一起依訂購順序為您處理包裝出貨。
                    如遇國定假日，則會順延至正常上班日依序出貨，敬請見諒。
                  </p>
                </li>
                <li class="d-flex">
                  <i class="bi bi-caret-right-fill me-2" />
                  <p>
                    臺灣配送時程：臺北市地區於出貨後 1-2 日內即會送達；
                    臺灣其他地區（不含偏遠與離島）則於出貨後的 1-3 日內送達；
                    臺灣本島偏遠地區與離島則需視投遞狀況調整配送時間。
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container py-5">
    <h2 class="text-secondary text-center text-myred mb-4">
      你可能會喜歡
      <i class="bi bi-caret-down-fill" />
    </h2>
    <DProductCard />
  </section>
</template>

<script>
import DProductCard from '@/components/front/ProductCardDiscounted.vue';

export default {
  inject: ['emitter', 'currency'],
  components: {
    DProductCard,
  },
  data() {
    return {
      id: '',
      product: {},
      qty: 1,
      loadingItem: '',
    };
  },
  methods: {
    getProductDetail() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.axios
        .get(api)
        .then((res) => {
          this.product = res.data.product;
        })
        .catch(() => {
          this.$swal({
            title: '網頁似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
          this.$router.push('/');
        });
    },
    addCart(id, directPurchase) {
      this.loadingItem = id;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        data: {
          product_id: id,
          qty: this.qty,
        },
      };
      this.axios
        .post(api, cart)
        .then(() => {
          this.emitter.emit('updateData');
          this.loadingItem = '';
          this.$swal({
            title: '加入成功',
            position: 'top-end',
            toast: true,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          this.loadingItem = '';
          this.$swal({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
      if (directPurchase) {
        this.$router.push('/cart');
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getProductDetail();
  },

  // 下方產品卡
  // 參考https://book.vue.tw/CH4/4-2-route-settings.html
  computed: {
    paramsId() {
      return this.$route.params.id;
    },
  },
  watch: {
    paramsId() {
      this.id = this.paramsId;
      this.getProductDetail();
    },
  },
};
</script>

<style lang="scss" scoped>
.direct-buy{
  border: 1px solid #ff953d;
  color: #ff953d;
    &:hover{
    background: #ff953d;
    color: #fff;
  }
}
</style>
