<template lang="jade">
.resetway
  .resetway-title
    van-icon(name='arrow-left',@click='listStyleToSafety')
    p 找回密码
  .resetway-content
    ul
      router-link(to='login', tag='li')
        span 通过身份识别
        van-icon(name="arrow")
</template>
<script>
export default {
  methods:{
    listStyleToSafety(){
      this.$router.push('/reset')
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/login/resetway.scss";
</style>