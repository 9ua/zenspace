// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'; //解决ie浏览器不支持promise
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  Icon,
  NoticeBar,
  Actionsheet,
  Popup,
  Stepper,
  Dialog,
  Swipe,
  SwipeItem,
  Collapse,
  CollapseItem
} from 'vant';
import 'vant/lib/vant-css/index.css'
import 'lib-flexible/flexible.js'
import {
  Picker
} from 'vant';
import '@/assets/iconfont/iconfont.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import { Tab, Tabs } from 'vant';
import md5 from 'js-md5';
import popTo from "./components/public/pop"

Vue.use(popTo);
Vue.use(Collapse).use(CollapseItem)
Vue.use(Swipe).use(SwipeItem);
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
window.axios = axios;
Vue.use(Stepper);
Vue.use(Popup);
Vue.use(Tab).use(Tabs);
Vue.use(VueAxios, axios);
Vue.use(Actionsheet);
Vue.use(NoticeBar);
Vue.use(Icon);
Vue.use(Picker);
Vue.config.productionTip = false
/* eslint-disable no-new */

// 超时时间
axios.defaults.timeout = 120000
// http请求拦截器


axios.interceptors.response.use(data => { // 响应成功关闭loading
  if (data.data.status === 302) {
    localStorage.clear();
    router.push('/login');
    this.$store.state.loginStatus = false;
  }
  if (data.data.pup === true) {
    if (data.data.data.message && data.data.data.message !== "参数错误") {
      Vue.prototype.$pop.show({error:data.data.data.message,number:10});
    } else {
      if (data.data.data !== "参数错误") {
        Vue.prototype.$pop.show({error:data.data.data,number:10});
      }
    }
  }

  return data
}, error => {
  return Promise.reject(error)
})
export default axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>'
})
