<template lang="jade">
.safeEmail
  .safeEmail-top
    router-link.el-icon-arrow-left(to='/safety', tag='i')
    p 验证密保手机
  .safeEmail-content
    ul
      li
        p 手机号：
        span {{email}}
      li
        p 安全密码：
        input(type='password', v-model='oldPassword', placeholder='请输入您的安全码')
    .safeEmail-but
      el-button(type='primary', @click='validSecurityCode') 确定
  van-popup(v-model='show') {{content}}
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      show: false, //弹窗
      content: "提示内容!", //弹窗内容
      start1: false,
      email: null, //手机号
      oldPassword: "" //验证码
    };
  },
  mounted() {
    this.getBindEmail();
  },
  methods: {
    //验证安全码
    validSecurityCode() {
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let oldPassword = md5(this.oldPassword);
      let formData = new FormData();
      formData.append("oldPassword", oldPassword);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/validSecurityCode",
          formData,
          config
        )
        .then(res => {
          this.show = !this.show;
          this.content = res.data.data.message;
          setTimeout(() => {
            if (this.content === "验证成功！") {
              this.$router.push({ path: "/detail/setemail" });
            }
          }, 2000);
        })
        .catch(error => {
          console.log("验证安全码No");
        });
    },
    //取验证码
    sendMobilCode() {
      this.start1 = true;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("mobil", this.mobile);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/sendMobilCode",
          formData,
          config
        )
        .then(res => {
          this.show = !this.show;
          this.content = res.data.data.message;
        })
        .catch(error => {
          console.log("取验证码No");
        });
    },
    //验证成功后
    safeMobile() {
      this.show = !this.show;
      this.content = res.data.data.message;
      if (this.content === "绑定成功！") {
        this.$router.push({ path: "/safety" });
      }
    },
    //获取已经绑定的手机号码
    getBindEmail() {
      this.$http
        .get(this.$store.state.url + "api/userCenter/getBindEmail")
        .then(res => {
          this.email = res.data.data.email;
        })
        .catch(error => {
          console.log("获取已经绑定的手机号码No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/safeEmail.scss";
</style>
