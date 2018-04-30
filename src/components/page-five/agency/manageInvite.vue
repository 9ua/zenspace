<template>
  <div class="mymsg">
    <div class="mymsg-top">
      <router-link to="/agency" tag="i" class="el-icon-arrow-left"></router-link>
      <ul>
        <router-link v-for="(navs,index) in nav" :to="'/manageInvite/'+navs.pathurl" tag="li" :key="index">{{navs.name}}</router-link>
      </ul>
    </div>
    <div class="mymsg-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nav: [{
          name: '下级开户',
          pathurl: 'mInvite'
        }, {
          name: '邀请码',
          pathurl: 'mIcode'
        }],
        radio: '1',
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/mymsg.scss';
</style>