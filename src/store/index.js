import { createStore } from 'vuex';
import ProductPage from './KKClockProduct';
import ProductCard from './ProductCard';
import ProductCardDiscounted from './ProductCardDiscounted';
import KKClockProductItem from './KKClockProductItem';

export default createStore({

  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    ProductPage,
    ProductCard,
    ProductCardDiscounted,
    KKClockProductItem,
  },
});
