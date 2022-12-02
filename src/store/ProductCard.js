import Swal from 'sweetalert2';
import axios from 'axios';
import emitter from '@/methods/emitter';

export default {
  namespaced: true,
  state: {
    loadingItem: '',
  },
  mutations: {
    loadingItemStatus(state, id) {
      state.loadingItem = id;
    },
    loadingItemClean(state) {
      state.loadingItem = '';
    },
  },
  actions: {
    addCart(context, id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      context.commit('loadingItemStatus', id);
      const cart = {
        product_id: id,
        qty: 1,
      };
      axios.post(api, { data: cart })
        .then(() => {
          context.commit('loadingItemClean');
          emitter.emit('updateData'); // 觸發 / 請參考mitt套件說明
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
          context.commit('loadingItemClean');
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
