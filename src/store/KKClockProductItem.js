import Swal from 'sweetalert2';
import emitter from '@/methods/emitter';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    product: {},
    loadingItem: '',
  },
  mutations: {
    productData(state, res) {
      // state.product = res.data.product;
      state.product = { ...res.data.product };
    },
    loadingItemStatus(state, id) {
      state.loadingItem = id;
    },
    loadingItemClear(state) {
      state.loadingItem = '';
    },
  },
  actions: {
    getProductDetail(context, id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      axios.get(api)
        .then((res) => {
          context.commit('productData', res);
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

    // 加入購物車 / 直接購買
    addCart(context, data) {
      context.commit('loadingItemStatus', data.productId);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        data: {
          product_id: data.productId,
          qty: data.num,
        },
      };
      axios.post(api, cart)
        .then(() => {
          emitter.emit('updateData');
          context.commit('loadingItemClear');
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
