<template lang="jade">
.resetWay
  .resetWay-top
    van-icon(name='arrow-left',@click='resetWay')
    p 找回安全密码
    span
  .resetWay-input
    router-link(to='', tag='div')
      p 通过密保问题
      van-icon(name='arrow')
    router-link(to='', tag='div')
      p 通过密保邮箱
      van-icon(name='arrow')
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    resetWay() {
      this.$router.push("/safety");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/resetWay.scss";
</style>