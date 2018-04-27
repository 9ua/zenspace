<template>
  <div class="setemail">
    <div class="setemail-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>绑定密保邮箱</p>
    </div>
    <div class="setemail-content">
      <ul>
        <li>
          <p>邮箱地址：</p>
          <input type="text" v-model="email" placeholder="请输入您要绑定的邮箱地址">
        </li>
        <li>
          <p>验证码：</p>
          <input type="text" v-model="validCode" placeholder="请输入验证码">
          <yd-sendcode v-model="start1" @click.native="sendEmailCode" second="5" init-str="发送验证码"
            run-str="{%s}秒后重新获取" reset-str="你可以重新获取验证码啦" size="large" type="primary"></yd-sendcode>
        </li>
        <li>
          <p>安全密码：</p>
          <input type="text" v-model="securityCode" placeholder="请输入您的安全码">
        </li>
      </ul>
      <div class="setemail-but">
        <el-button type="primary" @click="saveBindEmail">确定</el-button>
      </div>
    </div>
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
      start1: false,
      email:null,//邮箱
      validCode:'',//验证码
      securityCode:'',//安全码
    }
  },
  methods: {
    //取邮箱验证码
    sendEmailCode(){
      const email_yz = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      let yzemail = email_yz.test(this.email);
      if(!this.email){
        this.show = !this.show;
        this.content = '邮箱地址不能为空！'
      }else if(yzemail){
        this.start1 = true;
        let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
        let formData = new FormData();
        formData.append('email', this.email);
        this.$axios.post('api/userCenter/sendEmailCode', formData, config).then((res) => {
          console.log(res)
        }).catch((error) => {
            console.log("取验证码No")
        })
      }
    },
    //绑定邮箱
    saveBindEmail(){
      let securityCode = md5(this.securityCode);
      let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
      let formData = new FormData();
      formData.append('email', this.email);
      formData.append('validCode', this.validCode);
      formData.append('securityCode', securityCode);
      this.$axios.post('api/userCenter/saveBindEmail', formData, config).then((res) => {
        this.show = !this.show;
        this.content = res.data.data.message
        if(this.content === '绑定成功！'){
          this.$router.push({path: '/five'});
        }
      }).catch((error) => {
          console.log("取验证码No")
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/details/setemail.scss';
</style>
