<template>
  <div class="verifySafePwd">
    <div class="verifySafePwd-top">
      <router-link to="/safety" tag="i" class="el-icon-arrow-left"></router-link>
      <p>验证安全密码</p>
    </div>
    <div class="verifySafePwd-input">
      <p>原安全密码</p>
      <input type="password" v-model="oldPassword" placeholder="请输入当前所使用的密码" v-focus/> </div>
    <router-link to="/service" tag="p" class="zhaohui">找回安全密码？</router-link>
    <div class="verifySafePwd-but">
      <button @click="validSecurityCode">确定</button>
    </div>
    <div class="verifySafePwd-tisi"> 安全密码用于提现、绑定银行卡等操作，可保障资金安全。 </div>
    <van-popup v-model="show">{{content}}</van-popup>
  </div>
</template>
<script>
  import md5 from 'js-md5';
  export default {
    data() {
      return {
        show:false,//弹窗
        content:'提示内容!',//弹窗内容
        oldPassword:'',//原安全码
      }
    },
    methods: {
      validSecurityCode(){
        let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
        let oldPassword = md5(this.oldPassword);
        let formData = new FormData();
        formData.append('oldPassword', oldPassword);
        this.$axios.post(this.$store.state.url+'api/userCenter/validSecurityCode', formData, config).then((res) => {
          this.show = !this.show;
          this.content = res.data.data.message
          setTimeout(() => {
            if(this.content === '验证成功！'){
              this.$router.push({path: '/changeSafePwd'});
            }
          }, 2000);
        }).catch((error) => {
            console.log("No")
        })
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
  @import '../../../assets/scss/page-five/safety/verifySafePwd.scss';
</style>