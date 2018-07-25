<template lang="jade">
.setPwd
  .setPwd-top
    van-icon(name='arrow-left',@click='listStyleToSafety')
    p 设置登陆密码
    span
  .setPwd-input
    div
      p 登陆密码
      input(type='password', v-model='newPassword', placeholder='请输入登陆密码', v-focus='')
    div
      p 确认密码
      input(type='password', v-model='newPassword2', placeholder='请再次输入密码')
  .setPwd-but
    button(@click='changeLoginPassword') 确定
  van-popup(v-model='show') {{content}}
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      show: false, //弹窗
      content: "提示内容!", //弹窗内容
      newPassword: "", //新密码
      newPassword2: "" //确认新密码
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push("/safety");
    },
    //更改密码
    changeLoginPassword() {
      let newPassword = md5(this.newPassword);
      let newPassword2 = md5(this.newPassword2);
      if (newPassword === newPassword2) {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("newPassword", newPassword);
        formData.append("newPassword2", newPassword2);
        this.$axios
          .post(
            this.$store.state.url + "api/userCenter/changeLoginPassword",
            formData,
            config
          )
          .then(res => {
            this.show = !this.show;
            this.content = res.data.data.message;
            setTimeout(() => {
              if (this.content === "修改成功！") {
                this.$router.push({ path: "/one" });
                this.$store.state.loginStatus = false;
              }
            }, 2000);
          })
          .catch(error => {
            console.log("更改密码No");
          });
      } else {
        this.show = !this.show;
        this.content = "两次密码不相同！";
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/setPwd.scss";
</style>