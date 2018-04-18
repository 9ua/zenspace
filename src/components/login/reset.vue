<template>
  <div class="reset">
    <div class="reset-title">
      <router-link to="/login" tag="i" class="el-icon-arrow-left"></router-link>
      <p>忘记密码</p>
    </div>
    <div class="reset-content">
      <ul>
        <li>
          <span>账号</span>
          <input type="text" onfocus="this.select()" v-focus placeholder="请输入账号" /> </li>
        <li>
          <span>验证码</span>
          <input type="text" onfocus="this.select()"  placeholder="请输入验证码" />
          <img :src="captchaCodeImg" @click="getCaptchaCode"> </li>
      </ul>
    </div>
    <div class="reset-go">
      <button @click="resetGo">确定</button>
    </div>
  </div>
</template>
<script>
	export default{
		data(){
			return{}
		},
		created() {
      this.getCaptchaCode();
    },
		methods:{
			getCaptchaCode() {
        this.newDate = new Date().getTime();
        this.captchaCodeImg = "http://115.144.238.217/code.jpg?_=" + this.newDate;
      },
      resetGo(){
//    	this.$router.push('resetpwd');
      	this.$router.push('resetway');
      }
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
<style lang="scss" scoped>
  @import "../../assets/scss/login/reset.scss";
</style>