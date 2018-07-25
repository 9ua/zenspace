<template lang="jade">
.verifySafePwd
  .verifySafePwd-top
    van-icon(name='arrow-left',@click='listStyleToSafety')
    p 验证安全密码
    span
  .verifySafePwd-input
    p 原安全密码
    input(type='password', v-model='oldPassword', placeholder='请输入当前所使用的密码', v-focus='')
  router-link.zhaohui(to='/service', tag='p') 找回安全密码？
  .verifySafePwd-but
    button(@click='validSecurityCode') 确定
  .verifySafePwd-tisi  安全密码用于提现、绑定银行卡等操作，可保障资金安全。 
  van-popup(v-model='show') {{content}}
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      show: false, //弹窗
      content: "提示内容!", //弹窗内容
      oldPassword: "" //原安全码
    };
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/safety');
    },
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
              this.$router.push({ path: "/changeSafePwd" });
            }
          }, 2000);
        })
        .catch(error => {
          console.log("验证安全密码No");
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
@import "../../../assets/scss/page-five/safety/verifySafePwd.scss";
</style>