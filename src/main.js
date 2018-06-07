// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  'babel-polyfill';//解决ie浏览器不支持promise
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from "vue-cookie";
import Carousel from 'element-ui'
// import { Carousel, Loading } from 'element-ui'
import { Message } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import { Radio, RadioGroup } from 'vue-ydui/dist/lib.px/radio'
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
import { Picker } from 'vant';
import './assets/iconfont/iconfont.css'
import './assets/font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import {
    Tab,
    Tabs
} from 'vant';
import {
    CountDown
} from 'vue-ydui/dist/lib.px/countdown';
import {
    CountUp
} from 'vue-ydui/dist/lib.px/countup';
import {
    CheckBox,
    CheckBoxGroup
} from 'vue-ydui/dist/lib.px/checkbox';
import 'vue-ydui/dist/ydui.px.css';
import md5 from 'js-md5';
import { SendCode } from 'vue-ydui/dist/lib.px/sendcode';

Vue.use(IScrollView, IScroll);
Vue.component(SendCode.name, SendCode);
Vue.use(Collapse).use(CollapseItem)
Vue.use(Swipe).use(SwipeItem);
Vue.component(CheckBox.name, CheckBox);
Vue.component(CheckBoxGroup.name, CheckBoxGroup);
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
window.axios = axios;
Vue.component(CountUp.name, CountUp);
Vue.component(CountDown.name, CountDown);
Vue.use(VueCookie);
Vue.use(Stepper);
Vue.use(Popup);
Vue.use(Tab).use(Tabs);
Vue.use(VueAxios, axios);
Vue.use(Actionsheet);
Vue.use(NoticeBar);
Vue.use(Icon);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.use(Carousel);
Vue.use(Picker);
Vue.config.productionTip = false
/* eslint-disable no-new */

// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器


axios.interceptors.response.use(data => { // 响应成功关闭loading
    if (data.data.status === 302) {
        localStorage.clear();
        router.push('/login');
        this.$store.state.loginStatus = false;
    }
    if (data.data.pup === true) {
        if (data.data.data.message && data.data.data.message !=="参数错误"){
            Message.error({
                message: data.data.data.message
            })
        } else {
            if (data.data.data !=="参数错误"){
            Message.error({
                message: data.data.data
            })
            }
        }
    }

    return data
}, error => {
    return Promise.reject(error)
})
// export default axios
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