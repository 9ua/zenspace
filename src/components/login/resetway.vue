<template lang="jade">
.resetway
  .resetway-title
    router-link.el-icon-arrow-left(to='/reset', tag='i')
    p 找回密码
  .resetway-content
    ul
      router-link(to='login', tag='li')
        span 通过身份识别
        i.el-icon-arrow-right
</template>
<style lang="scss" scoped>
@import "../../assets/scss/login/resetway.scss";
</style>