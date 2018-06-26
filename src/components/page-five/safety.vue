<template lang="jade">
.safety
  .safety-top
    router-link.el-icon-arrow-left(to='/five', tag='i')
    p 安全中心
    span
  .safety-content
    .safety-content-top
      p.title ———— 您的账号安全级别为极低 ————
      div
        el-rate(v-model='value5', disabled='', show-score='', text-color='#ff9900', score-template='')
        //
          <i class="el-icon-star-on active"></i>
          <i class="el-icon-star-on active"></i>
          <i class="el-icon-star-on active"></i>
          <i class="el-icon-star-on active"></i>
          <i class="el-icon-star-on"></i>
      //
        <p class="time">上次登陆：2018-04-07  14:14:14</p>
        <p class="land"><span>香港</span> | <span>不是我登陆？</span></p>
    ul
      router-link(to='verifyPwd', tag='li')
        p 修改登陆密码
        div
          p 修改
          i.el-icon-arrow-right
      router-link(:to="securityCoe === 0 ? 'setSafePwd' : 'verifySafePwd'", tag='li')
        p {{securityCoe === 0 ? '设置安全密码' : '已设置安全密码'}}
        div
          p {{securityCoe === 0 ? '设置' : '修改'}}
          i.el-icon-arrow-right
      router-link(:to="mobile === 0 ? 'detail/setmobile' : 'safeMobile'", tag='li')
        p {{mobile === 0 ? '设置密保手机' : '已设置密保手机'}}
        div
          p {{mobile === 0 ? '设置' : '修改'}}
          i.el-icon-arrow-right
      router-link(:to="question === 0 ? 'setQuestion' : 'safeQuestion'", tag='li')
        p {{question === 0 ? '设置密保问题' : '已设置密保问题'}}
        div
          p {{question === 0 ? '设置' : '修改'}}
          i.el-icon-arrow-right
      router-link(:to="email === 0 ? 'detail/setemail' : 'safeEmail'", tag='li')
        p {{email === 0 ? '设置密保邮箱' : '已设置密保邮箱'}}
        div
          p {{email === 0 ? '设置' : '修改'}}
          i.el-icon-arrow-right
      router-link(to='getCards', tag='li')
        p 银行卡管理
        div
          p 设置
          i.el-icon-arrow-right
    .logout(@click='logout')
      p 退出登陆
      i.el-icon-arrow-right
</template>
<script>
import { setStore, getStore, removeStore } from "../../config/mutil";
export default {
  data() {
    return {
      value5: 1,
      password: 1, //密码
      securityCoe: 0, //安全码
      mobile: 0, //密保手机
      question: 0, //密保问题
      email: 0 //密保邮箱
    };
  },
  mounted() {
    this.getSecurityCenterStatus();
  },
  methods: {
    //取安全中心状态
    getSecurityCenterStatus() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getSecurityCenterStatus")
        .then(res => {
          this.password = res.data.data.password;
          this.securityCoe = res.data.data.securityCoe;
          this.mobile = res.data.data.mobile;
          this.question = res.data.data.question;
          this.email = res.data.data.email;
          if (this.securityCoe === 1) {
            this.value5 += 1;
          }
          if (this.mobile === 1) {
            this.value5 += 1;
          }
          if (this.question === 1) {
            this.value5 += 1;
          }
          if (this.email === 1) {
            this.value5 += 1;
          }
        })
        .catch(error => {
          console.log("取安全中心状态No");
        });
    },
    //退出
    logout() {
      this.$axios
        .get(this.$store.state.url + "api/user/logout")
        .then(res => {
          this.$store.state.loginStatus = false;
          this.$store.state.Globalusername = "";
          this.$store.state.Globalpassword = "";
          this.$store.state.JSESSIONICookie = "";
          localStorage.clear();
          this.$router.push("/one");
        })
        .catch(error => {
          console.log("logoutNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/safety.scss";
</style>