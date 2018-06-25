<template lang="jade">
.resetpwd
  .resetpwd-title
    router-link.el-icon-arrow-left(to='/reset', tag='i')
    p 找回密码
  .resetpwd-content
    ul
      router-link(to='verifyPwdSafe', tag='li')
        span 通过安全密码
        i.el-icon-arrow-right
      router-link(to='', tag='li')
        span 通过密保问题
        i.el-icon-arrow-right
      router-link(to='', tag='li')
        span 通过密保邮箱
        i.el-icon-arrow-right
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/login/resetpwd.scss";
</style>