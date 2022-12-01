import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue';
import router from './router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import store from './store';
import 'aos/dist/aos.css';

const app = createApp(App).use(store);
app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios); // provide 'axios'
app.use(router);
app.component('LoadingPlugin', Loading);
app.mount('#app');
