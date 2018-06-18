<template>
  <div class="five" v-show="$store.state.loginStatus">
    <headers></headers>
    <div class="five-top">
      <div>
        <div class="five-top-left">
          <router-link to="/detail/datum" tag="p"><img :src='"@/assets/img/five/"+$store.state.image+".jpg"' alt=""></router-link>
        </div>
        <div class="five-top-right">
          <p>账号：
            <span>{{$store.state.Globalusername}}</span>
          </p>
          <p>余额：
            <span v-show=" !money ">*****</span>
            <span v-show="money" ref="money">{{ balances | keepTwoNum}}元</span>
            <button v-show="!money" @click="money = !money">显示</button>
          </p>
        </div>
        <div class="five-top-right2" v-show="money" @click="F5money">
          <img :class=" toF5money ? 'totransition' : ''" src="@/assets/img/five/ROLL.png" alt="">
        </div>
      </div>
      <ul>
        <router-link to="/payway" tag="li">
          <div class="icon-top top-1">
            <i class="fa fa-credit-card" aria-hidden="true"></i>
          </div>
          <span>我要充值</span>
        </router-link>
        <li @click="safeCenter()">
          <div class="icon-top top-2">
            <i class="fa fa-money" aria-hidden="true"></i>
          </div>
          <span>我要提现</span>
        </li>
        <router-link to="/trade" tag="li">
          <div class="icon-top top-3">
            <i class="fa fa-book" aria-hidden="true"></i>
          </div>
          <span>交易记录</span>
        </router-link>
        <router-link to="/bet" tag="li">
          <div class="icon-top top-4">
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
          <span>投注记录</span>
        </router-link>
      </ul>
    </div>
    <div class="five-content">
      <ul>
        <router-link :to="fiveNavs.paths" tag="li" v-for="(fiveNavs,index) in fiveNav" :key="index" v-if="fiveNavs.viewC">
          <div class="five-content-nav">
            <i class="fa" :class="fiveNavs.icon"></i>
            <p>{{fiveNavs.name}}</p>
          </div>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </ul>
    </div>
    <van-popup class="pop2" v-model="show2" :close-on-click-overlay="false">
      <div>
        <ul>
          <div class="title">
            <p>温馨提示！</p>
          </div>
          <div class="cont">
            <p>{{content}}</p>
          </div>
          <div class="but">
            <button class="del" @click="goToSet()">确定</button>
            <button class="nodel" @click="show2 = !show2">取消</button>
          </div>
        </ul>
      </div>
    </van-popup>

  </div>
</template>
<script>
  import headers from '../public/header';
  import VueCookie from "vue-cookie";
  import { setStore, getStore,removeStore } from '../../config/mutil'
  export default {
    data() {
      return {
        bankUserFlag:'',
        securityCoe:'',
        content:'',
        show2:false,
        balances:'',//用户余额
        image:0,//用户头像
      	money:false,
        toF5money:false,//刷新动画
        water:'',
        fiveNav: [{
          name: '个人信息',
          icon: 'fa-address-book-o',
          paths: 'detail',
          viewC:true,
        }, {
          name: '安全中心',
          icon: 'fa-lock',
          paths: 'safety',
          viewC:true,
        }, {
          name: '代理中心',
          icon: 'fa-users',
          paths: 'agency',
          viewC:false,
        }, {
          name: '今日盈亏',
          icon: 'fa-line-chart',
          paths: 'profits',
          viewC:true,
        }, {
          name: '我的消息',
          icon: 'fa-envelope-o',
          paths: 'mymsg',
          viewC:true,
        },{
          name: '充值信息',
          icon: 'fa-file-text-o',
          paths: 'rechargeserch',
          viewC:true,
        }, ]
      }
    },
    mounted(){
      this.getTopUserData();
      this.getBalance();
      this.checkType();
    },
    methods:{
      checkType(){
          if (this.$store.state.userType == 1){
            this.fiveNav[2].viewC = true;
          }
      },
      //刷新余额
      F5money(){
        this.toF5money = !this.toF5money;
        this.$refs.money.innerHTML = "元";
        setTimeout(() => {
          this.getBalance();
          this.toF5money = !this.toF5money;
          this.$refs.money.innerHTML = Number(this.balances).toFixed(2)+"元";
        }, 800);
        
      },
      //獲取安全中心狀態
      safeCenter(){
        this.$axios.get(this.$store.state.url+'api/userCenter/getSecurityCenterStatus').then((res) => {
          this.securityCoe = res.data.data.securityCoe;
          this.bankUserFlag = res.data.data.bankUserFlag;
          if(this.securityCoe == 0 && this.bankUserFlag == 0){
            this.content = "请先绑定安全密码及银行帐户，是否跳转至设定页？";
            this.show2 = !this.show2;
          } else if ( this.bankUserFlag == 0 ){
            this.content = "请先绑定银行帐户，是否跳转至设定页？";
            this.show2 = !this.show2;
          } else {
            this.waterFall();
          };
        }).catch((error) => {
            console.log("獲取安全中心狀態")
        })
      },
      waterFall(){
        this.$axios.get(this.$store.state.url+'api/proxy/getWithdrawFlag').then((res) => {
          this.water = res.data.code;
          if (res.data.code=== 1) {
            this.$router.push({path:'/cashOut'});
          }
        }).catch((error) => {
            console.log("取安全中心状态No111")
        })
      },
      goToSet(){
        if(this.securityCoe == 0 && this.bankUserFlag == 0){
            this.$router.push({path:'/setSafePwd'});
        } else if ( this.bankUserFlag == 0 ){
            this.$router.push({path:'/newCard'});
        } else {
            this.waterFall();
        };
      },
      //获取头部个人信息
      getTopUserData(){
	      this.$http.get(this.$store.state.url+'api/userCenter/getTopUserData').then((res) => {
          if(res.data.data.image === ''){
            this.image = 0;
            this.$store.state.image = this.image;
            setStore('image',this.image);
            setStore('image',this.$store.state.image);
          }else{
            this.image = res.data.data.image;
            this.$store.state.image = this.image;
            setStore('image',this.image);
            setStore('image',this.$store.state.image);
          }
	      }).catch((error) => {
	      		console.log("获取头部个人信息No")
	      })
    	},
      //获取用户余额
      getBalance(){
	      this.$http.get(this.$store.state.url+'api/userCenter/getBalance').then((res) => {
          this.balances = res.data.data.balance;
	      }).catch((error) => {
	      		console.log("获取用户余额")
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
  @import '../../assets/scss/popcorn.scss';
</style>