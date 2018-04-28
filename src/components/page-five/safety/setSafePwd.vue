<template>
  <div class="setSafePwd">
    <div class="setSafePwd-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>设置安全密码</p>
    </div>
    <div class="setSafePwd-input">
    	<div>
    		<p>安全密码</p>
      <input type="password" v-model="newPassword" placeholder="请输入6位数密码" v-focus/> 
    	</div>
    	<div>
    		<p>确认密码</p>
      <input type="password" v-model="newPassword2" placeholder="请输入6位数密码"/> 
    	</div>
    </div>
    <div class="setSafePwd-but">
      <button @click="setSafePwd">确定</button>
    </div>
    <div class="setSafePwd-tisi">
    	安全密码用于提现、绑定银行卡等操作，可保障资金安全。
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    data() {
      return {
        newPassword:null,//安全码
        newPassword2:null,//确认安全码
      }
    },
    methods: {
      setSafePwd() {
        let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
        let pwd1 = md5(this.newPassword);
        let pwd2 = md5(this.newPassword2);
        let formData = new FormData();
        formData.append('newPassword', pwd1);
        formData.append('newPassword2', pwd2);
        if(pwd1 === pwd2){
          this.$axios.post(this.$store.state.url+'api/userCenter/setSecurityCode', formData, config).then((res) => {
            this.$router.push({path: '/safety'});
            console.log(res);
          }).catch((error) => {
              console.log("No")
          })
        }
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
  @import '../../../assets/scss/page-five/safety/setSafePwd.scss';
</style>