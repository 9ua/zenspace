<template>
  <div class="login" v-show="$store.state.loginStatus === false">
    <div class="login-title">
      <router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link>
      <p>用户登录</p>
    </div>
    <div class="login-conter">
      <div class="login-center-img">
        <div></div>
      </div>
      <div class="login-form">
        <div class="login-user">
          <van-icon name="contact" />
          <input type="text" v-model="newUserInfo.user" placeholder="请输入用户名" v-focus onfocus="this.select()"> </div>
        <div class="login-pwd">
          <i class="iconfont icon-mima"></i>
          <input :type="pwd ? 'text' : 'password'" v-model="newUserInfo.pwd" placeholder="请输入密码" onfocus="this.select()">
          <i class="iconfont" :class="pwd ? 'icon-guanbi' : 'icon-buxianshimima'" @click="pwd = !pwd"></i>
        </div>
        <div class="login-captchaCodeImg" v-show="errorcode">
          <i class="iconfont icon-mima"></i>
          <input type="text" onfocus="this.select()" v-model="newUserInfo.verification" placeholder="请输入验证码" />
          <img :src="captchaCodeImg" @click="getCaptchaCode">
        </div>
        <div class="login-rememb">
        		<yd-checkbox v-model="checked" colo="#419fd9">记住密码</yd-checkbox>
        </div>
        <div class="login-go">
          <button @click="login">立即登陆</button>
        </div>
        <div class="login-live">
          <router-link to="registered">立即注册</router-link>
          <router-link to="reset">忘记密码</router-link>
        </div>
      </div>
    </div>
    <div class="login-pop" v-show="pop" @click="pop = false">
      <div>
        <i class="iconfont icon-information"></i>{{content}}</div>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  import headers from '../public/header';
  import VueCookie from "vue-cookie";
  import { setStore, getStore,removeStore } from '../../config/mutil'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        pop: false,
        pwd: false,
        checked: true,//记住密码否?
        content: '',//弹窗内容
        newDate: null,//时间戳
        errorcode:false,//判断账号密码错误次数
        loginStatus:false,//当前登陆状态
        newUserInfo: {
          user: '',
          pwd: '',
          verification: ''
        }
      }
    },
    created() {
      this.getCaptchaCode();
      this.checkeds();
    },
    methods: {
    	getCaptchaCode() {
        this.newDate = new Date().getTime();
        this.captchaCodeImg = "http://115.144.238.217/code.jpg?_=" + this.newDate;
      },
      login() {
        const user_yz = /^[A-Za-z][A-Za-z1-9]{5,20}$/;
        const pwd_yz = /^[A-Za-z1-9]{6,120}$/;
        let yzuser = user_yz.test(this.newUserInfo.user);
        let yzpwd = pwd_yz.test(this.newUserInfo.pwd);
        if (this.newUserInfo.user === '') {
          this.content = '用户名不能为空';
          this.pop = true;
        } else if (this.newUserInfo.pwd === '') {
          this.content = '密码不能为空';
          this.pop = true;
        } else if (yzuser == false) {
          this.content = '用户名：字母开头，6-20位，包括大小字母、数字'
          this.pop = true
        } else if (yzpwd == false) {
          this.content = '密码：6-20位，包括大小字母、数字'
          this.pop = true
        } else if (yzuser == true && yzpwd == true) {
          let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
          let pwd = md5(this.newUserInfo.pwd)
          let formData = new FormData();
          formData.append('account', this.newUserInfo.user);
          formData.append('password', pwd);
          this.$axios.post(this.$store.state.url+'api/user/login', formData, config).then((res) => {
            this.$store.state.JSESSIONICookie = res.data.data.sessionId;
              this.loginSta = true;
              this.$store.state.loginStatus = true;
              setStore('loginSta',this.$store.state.loginStatus);
          	if(res.data.code === 1){
              this.$router.push({path:'/one'});
              setStore('username',this.newUserInfo.user);
              setStore('password',this.newUserInfo.pwd);
          		this.$store.state.Globalusername = this.newUserInfo.user;
	            this.$store.state.Globalpassword = this.newUserInfo.pwd;
              this.$store.state.balance = res.data.data.balance;
              setStore('username',this.$store.state.Globalusername);
              setStore('password',this.$store.state.Globalpassword);
              
          	}else {
              this.$store.state.errorcode ++;
              this.newUserInfo.user = '';
              this.newUserInfo.pwd = '';
              this.checked = false;
              removeStore('username','password');
          		if(this.$store.state.errorcode > 2 ){
	          		this.errorcode = !this.errorcode;
	          	}
          		this.content = '账号或密码错误'
          		this.pop = true
          	}
          }).catch((error) => {
          		console.log("No")
          })
        }
      },
    	checkeds(){
    		if(this.checked === true){
          this.newUserInfo.user = getStore('username')
          this.newUserInfo.pwd = getStore('password')
    		}else{
          removeStore('username','password');
    			// VueCookie.delete('username',"password");
    			this.newUserInfo.user = "";
    			this.newUserInfo.pwd = "";
    		}
    	},
    },
    components: {
      headers
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    }
  }
</script>
<style lang="scss" scopde>
  @import '../../assets/scss/login/login.scss';
</style>