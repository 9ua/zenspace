<template lang="jade">
.resetWay
  .resetWay-top
    router-link.el-icon-arrow-left(to='/safety', tag='i')
    p 找回安全密码
  .resetWay-input
    router-link(to='', tag='div')
      p 通过密保问题
      i.el-icon-arrow-right
    router-link(to='', tag='div')
      p 通过密保邮箱
      i.el-icon-arrow-right
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    resetWay() {
      this.$router.push({
        path: "/safety"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/safety/resetWay.scss";
</style>