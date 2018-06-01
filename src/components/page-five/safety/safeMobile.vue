<template>
  <div class="safeMobile">
    <div class="safeMobile-top">
      <router-link to="/" tag="i" class="el-icon-arrow-left"></router-link>
      <p>验证密保手机</p>
    </div>
    <div class="safeMobile-content">
      <ul>
        <li>
          <p>手机号：</p>
          <span>{{mobile}}</span>
        </li>
        <li>
          <p>安全密码：</p>
          <input type="password" v-model="oldPassword" placeholder="请输入您的安全码">
        </li>
      </ul>
      <div class="safeMobile-but">
        <el-button type="primary" @click="validSecurityCode">确定</el-button>
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
      mobile:null,//手机号
      oldPassword:'',//验证码
    }
  },
  mounted(){
    this.getBindPhone();
  },
  methods:{
    //验证安全码
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
            this.$router.push({path: '/detail/setmobile'});
          }
        }, 2000);
      }).catch((error) => {
          console.log("验证安全码No")
      })
    },
    //取验证码
    sendMobilCode(){
      this.start1 = true;
      let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
      let formData = new FormData();
      formData.append('mobil', this.mobile);
      this.$axios.post(this.$store.state.url+'api/userCenter/sendMobilCode', formData, config).then((res) => {
        this.show = !this.show;
        this.content = res.data.data.message
      }).catch((error) => {
          console.log("取验证码No")
      })
    },
    //验证成功后
    safeMobile(){
      this.show = !this.show;
      this.content = res.data.data.message
      if(this.content === '绑定成功！'){
        this.$router.push({path: '/safety'});
      }
    },
    //获取已经绑定的手机号码
    getBindPhone(){
      this.$http.get(this.$store.state.url+'api/userCenter/getBindPhone').then((res) => {
        this.mobile = res.data.data.mobile;
      }).catch((error) => {
        console.log("获取已经绑定的手机号码No");
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/safety/safeMobile.scss';
</style>
