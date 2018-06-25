<template lang="jade">
.mymsg
  .mymsg-top
    router-link.el-icon-arrow-left(to='/five', tag='i')
    ul
      router-link(v-for='(navs,index) in nav', :to="'/mymsg/'+navs.pathurl", tag='li', :key='index') {{navs.name}}
  .mymsg-content
    router-view
</template>
<script>
export default {
  data() {
    return {
      nav: [
        {
          name: "公告",
          pathurl: "notice"
        },
        {
          name: "私信",
          pathurl: "letter"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/mymsg.scss";
</style>