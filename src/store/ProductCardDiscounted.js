import Swal from 'sweetalert2';
import axios from 'axios';
import emitter from '@/methods/emitter';

export default {
  namespaced: true,
  state: {
    products: [],
    loadingItem: '',
  },
  mutations: {
    productDataWrite(state, res) {
      state.products = res.data.products.filter((item) => item.category === '特價');
    },

    loadingItemStatus(state, id) {
      state.loadingItem = id;
    },
    loadingItemClear(state) {
      state.loadingItem = '';
    },
  },
  actions: {
    // 取得特價產品
    getDiscountedProduct(context) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      axios.get(api)
        .then((res) => {
          context.commit('productDataWrite', res);
        })
        .catch(() => {
          Swal.fire({
            title: '網頁似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },

    // 加入購物車
    addCart(context, id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      context.commit('loadingItemStatus', id);
      const cart = {
        product_id: id,
        qty: 1,
      };
      axios.post(api, { data: cart })
        .then(() => {
          context.commit('loadingItemClear');
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
          context.commit('loadingItemClear');
          Swal.fire({
            title: '似乎有些問題 請稍後再嘗試',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },
  },
  getters: {},
};
