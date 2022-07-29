import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';
import router from './router';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.component('LoadingPlugin', Loading);
app.mount('#app');
