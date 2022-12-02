import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    products: [],
  },
  mutations: {
    productDataWrite(state, res) {
      state.products = res.data.products;
    },
    loadingStatus(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    getProducts(context) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      context.commit('loadingStatus');
      axios.get(api)
        .then((res) => {
          context.commit('productDataWrite', res);
          context.commit('loadingStatus');
        })
        .catch(() => {
          Swal.fire({
            title: '似乎有些問題 請稍後再來訪',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    },
  },
  getters: {},
};
