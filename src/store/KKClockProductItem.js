import Swal from 'sweetalert2';
// import emitter from '@/methods/emitter';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    product: {},
  },
  mutations: {
    productData(state, res) {
      // state.product = res.data.product;
      state.product = { ...res.data.product };
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
  },
  getters: {},
};
