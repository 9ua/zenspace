<template lang="jade">
.detail
  .detail-top
    router-link.el-icon-arrow-left(to='/five', tag='i')
    p 个人资料
    span
  .detail-content
    router-view
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/detail.scss";
</style>