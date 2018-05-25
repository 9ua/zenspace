<template>
  <div class="login" v-show="loginStatus === false">
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
          <i class="fa fa-user"></i>
          <input type="text" v-model="newUserInfo.user" placeholder="请输入用户名" onfocus="this.select()"> </div>
        <div class="login-pwd">
          <i class="fa fa-lock"></i>
          <input :type="pwd ? 'text' : 'password'" v-model="newUserInfo.pwd" placeholder="请输入密码" onfocus="this.select()" v-focus @keyup.enter="login">
          <i class="iconfont" :class="pwd ? 'icon-guanbi' : 'icon-buxianshimima'" @click="pwd = !pwd"></i>
        </div>
        <div class="login-captchaCodeImg" v-show="errorcode">
          <i class="fa fa-lock"></i>
          <input type="text" onfocus="this.select()" v-model="newUserInfo.verification" placeholder="请输入验证码" />
          <img :src="captchaCodeImg" @click="getCaptchaCode">
        </div>
        <div class="login-rememb">
        		<yd-checkbox v-model="checked" colo="#419fd9" @click="checked = !checked">记住密码</yd-checkbox>
        </div>
        <div class="login-go">
          <button @click="login" v-show="loginReq">立即登陆</button>
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
        loginReq:true,
        checked: false,//记住密码否?
        content: '',//弹窗内容
        newDate: null,//时间戳
        errorcode:false,//判断账号密码错误次数
        loginStatus:false,//当前登陆状态
        captchaCodeImg:'',
        newUserInfo: {
          user: '',
          pwd: '',
          verification:'',
          rempwd:'',
          
        }
      }
    },
    created() {
      localStorage.clear();
      this.checkeds();
    },
    methods: {
    	getCaptchaCode() {
        this.newDate = new Date().getTime();
        this.captchaCodeImg = this.$store.state.url+ "code.jpg?_=" + this.newDate;
        console.log("獲取認證碼!!!");
      },
      login() {
        this.loginReq = false;
        const user_yz = /^[A-Za-z][A-Za-z0-9]{5,20}$/;
        const pwd_yz = /^[A-Za-z0-9]{6,120}$/;
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
          let pwd = this.newUserInfo.pwd;
          if (this.$cookie.get('password') && pwd === "PASSWORD") {
              pwd = this.$cookie.get('password');
          } else { pwd = md5(this.newUserInfo.pwd); }
          let formData = new FormData();
          formData.append('account', this.newUserInfo.user);
          formData.append('password', pwd);
          formData.append('code',this.newUserInfo.verification);
          this.$axios.post(this.$store.state.url+'api/user/login', formData, config).then((res) => {
            // if(this.checked === false){this.$cookie.delete('username');this.$cookie.delete('password');}
            this.$store.state.JSESSIONICookie = res.data.data.sessionId;
            this.$store.state.userType = res.data.data.userType;
            setStore('JSESSIONICookie',this.$store.state.JSESSIONICookie);
            setStore('userType',this.$store.state.userType);
            this.loginSta = true;
            setStore('loginSta',this.loginSta);
            this.$store.state.loginStatus = getStore('loginSta');
          	if(res.data.code === 1){
          		this.$store.state.Globalusername = res.data.data.account;
              this.$store.state.Globalpassword = this.newUserInfo.pwd;
              setStore('username',this.$store.state.Globalusername);
              setStore('password',pwd);
              if ( this.checked === true) {
                setStore('username',this.$store.state.Globalusername);
                setStore('password',pwd);
                this.$cookie.set('username', res.data.data.account , { expires: '1M' });
                this.$cookie.set('password', pwd , { expires: '1M' });
              } else {
                this.$cookie.delete('username');
                this.$cookie.delete('password');
              }
              this.$router.push({path:'/one'});
          	} else {
              this.loginReq = true;
              if (res.data.code === 0) {
                this.$cookie.delete('username');
                this.$cookie.delete('password');
              }
              if (res.data.data.errCount >= 3) {
                this.getCaptchaCode();
                setTimeout(() => {
                  this.errorcode = true;
                }, 0);
              } else {
                this.errorcode = false;
              }
              // this.$store.state.errorcode ++;
              // this.newUserInfo.user = '';
              this.newUserInfo.pwd = '';
              this.checked = false;
              removeStore('password');
          		// if(this.$store.state.errorcode > 2 ){
	          	// 	this.errorcode = !this.errorcode;
	          	// }
            }
          }).catch((error) => {
          		console.log("No")
          })
        }
      },
    	checkeds(){
        if ( this.$cookie.get('password')) {
          this.checked = true;
          this.newUserInfo.user = this.$cookie.get('username');
          this.newUserInfo.pwd = "PASSWORD";
          this.newUserInfo.rempwd = this.$cookie.get('password');
        }
    		// if(this.checked === true){
        //   // this.newUserInfo.user = getStore('username')
        //   // this.newUserInfo.pwd = getStore('password')
        //   this.newUserInfo.user = this.$cookie.get('username');
        //   this.newUserInfo.pwd = "PASSWORD";
        //   this.newUserInfo.rempwd = this.$cookie.get('password');
          
    		// }else{
        //   removeStore('username','password');
        //   this.$cookie.delete('username');
        //   this.$cookie.delete('password');
    		// 	// VueCookie.delete('username',"password");
    		// 	this.newUserInfo.user = "";
        //   this.newUserInfo.pwd = "";
        //   this.newUserInfo.rempwd = '';
    		// }
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
