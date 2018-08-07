import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import axios from 'axios';
import {
  getStore
} from '../config/mutil'

Vue.use(Vuex)
const state = {
  JSESSIONICookie: '',
  loginStatus: localStorage.getItem('loginSta'), //登陆状态
  Globalname: localStorage.getItem('Globalname'), //全局账号
  Globalword: localStorage.getItem('Globalword'), //全局密码
  newDate: new Date().getTime(), //获取时间戳
  captchaCodeImg: {}, //验证码地址
  errorcode: 0, //输入错误次数
  balance: null, //余额
  userType: localStorage.getItem('userType'), //0会员，1代理
  historyNum: "/one",
  url:''
}
//test & prod
if (process.env.NODE_ENV === 'production') {
  if (location.hostname === 'm.edu0370.com' || location.hostname === 'm.50fq.com')
    state.url = 'http://' + location.hostname.replace('m.', '') + '/';
  else
    state.url = 'https://' + location.hostname.replace('m.', '') + '/';
}
//local
else {
  state.url = 'http://edu0370.com/';
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
