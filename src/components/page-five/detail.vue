<template>
  <div class="detail">
    <div class="detail-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>个人资料</p>
    </div>
    <div class="detail-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-five/detail.scss';
</style>