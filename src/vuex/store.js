import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import axios from 'axios';
import {
  setStore,
  getStore,
  removeStore
} from '../config/mutil'

Vue.use(Vuex)
const state = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  hostnameTest:location.hostname,
  JSESSIONICookie: '',
  loginStatus: getStore('loginSta'), //登陆状态
  Globalusername: getStore('username'), //全局账号
  Globalpassword: getStore('password'), //全局密码
  newDate: new Date().getTime(), //获取时间戳
  captchaCodeImg: {}, //验证码地址
  errorcode: 0, //输入错误次数
  balance: null, //余额
  image: getStore('image'), //用户头像
  nickname: getStore('nickname'), //用户昵称
  mobile: getStore('mobile'), //手机
  email: getStore('email'), //邮箱
  sex: getStore('sex'), //性别ID
  birthday: getStore('birthday'), //生日
  userType: getStore('userType'), //0会员，1代理
  playBonusk3: null,
  playGroupsssc: null,
  historyNum: "/one"
}
//test & prod
if (process.env.NODE_ENV === 'production') {
  if (location.hostname === 'm.edu0370.com')
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
