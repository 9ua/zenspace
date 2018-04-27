<template>
  <div class="five" v-show="$store.state.loginStatus === true">
    <headers></headers>
    <div class="five-top">
      <div>
        <div class="five-top-left">

          <router-link to="/detail/datum" tag="p"><img :src='"../../assets/img/five/"+$store.state.image+".jpg"' alt=""></router-link>

        </div>
        <div class="five-top-right">
          <p>账号：
            <span>{{$store.state.Globalusername}}</span>
          </p>
          <p>余额：
            <span v-show=" !money ">*****</span>
            <span v-show=" money ">{{ balances | keepTwoNum}}</span>
            <button v-show="!money" @click="money = !money">显示</button>
          </p>
        </div>
      </div>
      <ul>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/Wallet.png" />
          <span>我要充值</span>
        </router-link>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/Box.png" />
          <span>我要提现</span>
        </router-link>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/Confirm.png" />
          <span>交易记录</span>
        </router-link>
        <router-link to="" tag="li">
          <img src="../../assets/img/five/370.png" />
          <span>投注记录</span>
        </router-link>
      </ul>
    </div>
    <div class="five-content">
      <ul>
        <router-link :to="fiveNavs.paths" tag="li" v-for="(fiveNavs,index) in fiveNav" :key="index">
          <div class="five-content-nav">
            <i class="iconfont" :class="fiveNavs.icon"></i>
            <p>{{fiveNavs.name}}</p>
          </div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import headers from '../public/header';
  import VueCookie from "vue-cookie";
  import { setStore, getStore,removeStore } from '../../config/mutil'
  export default {
    data() {
      return {
        balances:0,//用户余额
        image:0,//用户头像
      	money:false,
        fiveNav: [{
          name: '个人信息',
          icon: 'icon-wenbenicon',
          paths: 'detail'
        }, {
          name: '安全中心',
          icon: 'icon-weibiaoti1',
          paths: 'safety'
        }, {
          name: '代理中心',
          icon: 'icon-dailizizhizizhiqiyezizhi',
          paths: 'agency'
        }, {
          name: '今日盈亏',
          icon: 'icon-shuju',
          paths: 'profits'
        }, {
          name: '我的消息',
          icon: 'icon-wenben',
          paths: 'mymsg'
        }, ]
      }
    },
    mounted(){
      this.getBalance();
      this.getTopUserData();
    },
    methods:{
      //获取头部个人信息
      getTopUserData(){
	      this.$http.get('api/userCenter/getTopUserData').then((res) => {
          this.image = res.data.data.image;
          this.$store.state.image = this.image;
          setStore('image',this.image);
          setStore('image',this.$store.state.image);
	      }).catch((error) => {
	      		console.log("获取头部个人信息No")
	      })
    	},
      getBalance(){
	      this.$http.get('api/userCenter/getBalance').then((res) => {
          this.balances = res.data.data.balance;
	      }).catch((error) => {
	      		console.log("No11")
	      })
    	}
    },
    filters: {
      keepTwoNum(value) {
        value = Number(value);
        return value.toFixed(2);
      }
    },
    components: {
      headers
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/five.scss';
</style>