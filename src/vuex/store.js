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

  //游戏投注相关
  betContentTopPopFlag:false,//是否弹出投注记录
  showRight:false,//头部右侧切换彩种
  current_player:{},//当前玩法数
  playBonusId:"ssc_star5",//玩法id
  money: "", //投注金额  
  zhu:0,//注单数
  con: "", //已选号码
  betsuccess: false,//投注是否成功标识
  betGoshow: false,//投注确认标识
  betnot: true,//取消投注
  listname: "重庆",//彩种
  seasonId2: "", //当前期号  
  getPastOpens: "",//过去20期开奖
  lookAllUl:false,//是否查看过去20期开奖
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
