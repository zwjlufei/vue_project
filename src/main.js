// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueScroller from 'vue-scroller'
import qs from 'qs'
Vue.use(VueScroller)
Vue.prototype.$qs = qs

Vue.use(Mint);
Vue.prototype.$http = axios
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false
Vue.prototype.URL='http://test.www.ayi800.com/api'
axios.defaults.timeout =  10000;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
