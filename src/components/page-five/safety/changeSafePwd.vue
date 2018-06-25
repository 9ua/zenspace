<template lang="jade">
.setSafePwd
  .setSafePwd-top
    router-link.el-icon-arrow-left(to='/safety', tag='i')
    p 修改安全密码
  .setSafePwd-input
    div
      p 安全密码
      input(type='password', v-model='newPassword', placeholder='请输入6位数密码', v-focus='')
    div
      p 确认密码
      input(type='password', v-model='newPassword2', placeholder='请输入6位数密码')
  .setSafePwd-but
    button(@click='setSecurityCodes') 确定
  .setSafePwd-tisi
    | 安全密码用于提现、绑定银行卡等操作，可保障资金安全。
  van-popup.pop2(v-model='show', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p {{content}}
        .but
          button.nodel(@click='show = ! show') 确定
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      show: false, //弹窗
      content: "提示内容!", //弹窗内容
      newPassword: null, //安全码
      newPassword2: null //确认安全码
    };
  },
  methods: {
    setSecurityCodes() {
      const newPassword_yz = /^[0-9]{6,6}$/;
      let yzPassword = newPassword_yz.test(this.newPassword);
      if (this.newPassword === "") {
        this.content = "密码不能为空";
        this.show = true;
      } else if (yzPassword == false) {
        this.content = "安全密码：6位数字";
        this.show = true;
      } else if (this.newPassword !== this.newPassword2) {
        this.content = "两次密码输入不一致";
        this.show = true;
      } else {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let pwd1 = md5(this.newPassword);
        let pwd2 = md5(this.newPassword2);
        let formData = new FormData();
        formData.append("newPassword", pwd1);
        formData.append("newPassword2", pwd2);
        if (pwd1 === pwd2) {
          this.$axios
            .post(
              this.$store.state.url + "api/userCenter/setSecurityCode",
              formData,
              config
            )
            .then(res => {
              this.show = !this.show;
              this.content = res.data.data.message;
              setTimeout(() => {
                if (this.content === "修改成功！") {
                  this.$router.push({ path: "/safety" });
                }
              }, 1500);
            })
            .catch(error => {
              console.log("setSecurityCodesNo");
            });
        } else {
          this.show = !this.show;
          this.content = "两次密码不相同！";
        }
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
@import "../../../assets/scss/page-five/safety/setSafePwd.scss";
@import "../../../assets/scss/popcorn.scss";
</style>