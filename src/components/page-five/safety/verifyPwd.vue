<template lang="jade">
.verifyPwd
  .verifyPwd-top
    router-link.el-icon-arrow-left(to='/safety', tag='i')
    p 验证原密码
  .verifyPwd-input
    p 原密码
    input(type='password', v-model='oldPassword', placeholder='请输入当前所使用的密码', v-focus='')
  .verifyPwd-but
    button(@click='validOldLoginPassword') 确定
  van-popup(v-model='show') {{content}}
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      show: false, //弹窗
      content: "提示内容!", //弹窗内容
      oldPassword: "" //原密码
    };
  },
  methods: {
    validOldLoginPassword() {
      let oldPassword = md5(this.oldPassword);
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("oldPassword", oldPassword);
      this.$axios
        .post(
          this.$store.state.url + "api/userCenter/validOldLoginPassword",
          formData,
          config
        )
        .then(res => {
          this.show = !this.show;
          this.content = res.data.data.message;
          setTimeout(() => {
            if (this.content === "验证成功！") {
              this.$router.push({ path: "/setPwd" });
            }
          }, 2000);
        })
        .catch(error => {
          console.log("绑定邮箱No");
        });
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
@import "../../../assets/scss/page-five/safety/verifyPwd.scss";
</style>